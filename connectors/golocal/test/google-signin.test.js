import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { generateKeyPair, exportJWK, SignJWT } from 'jose';
import Database from 'better-sqlite3';
import { Store } from '../src/store.js';
import { Assisted } from '../src/assisted.js';
import { createAccounts } from '../src/accounts.js';
import { createApp } from '../src/app.js';
import { getConfig } from '../src/config.js';

const clientId='1234-golocal-test.apps.googleusercontent.com',clientSecret='GOCSPX-test-only-secret';
const env={BACKEND:'assisted',DATA_ENCRYPTION_KEY:'f'.repeat(64),MCP_BEARER_TOKEN:'m'.repeat(64),ADMIN_TOKEN:'a'.repeat(64),ACCOUNT_AUTH_SECRET:'z'.repeat(64),ASSISTED_DEV_MAILBOX:'true'};
const cookies=response=>response.headers.getSetCookie().map(c=>c.split(';')[0]).join('; ');
test('Google configuration is optional and requires complete independent credentials',()=>{
  assert.equal(getConfig(env).accounts.google.enabled,false);
  assert.throws(()=>getConfig({...env,GOOGLE_CLIENT_ID:clientId}),/both/);
  assert.throws(()=>getConfig({...env,GOOGLE_CLIENT_ID:'invalid',GOOGLE_CLIENT_SECRET:clientSecret}),/Web OAuth/);
  assert.throws(()=>getConfig({...env,GOOGLE_CLIENT_ID:clientId,GOOGLE_CLIENT_SECRET:env.ACCOUNT_AUTH_SECRET}),/independent/);
});

test('Google HTTP OAuth preserves accounts and connector consent; rejects unverified and invalid identities',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'golocal-google-')),store=await new Store(dir,'f'.repeat(64)).init(),server=createServer();let accounts;
  const originalFetch=globalThis.fetch,{privateKey,publicKey}=await generateKeyPair('RS256'),otherKey=await generateKeyPair('RS256');
  const jwk={...await exportJWK(publicKey),kid:'golocal-test-key',alg:'RS256',use:'sig'},codes=new Map(),exchanges=[];
  globalThis.fetch=async(input,options)=>{
    const url=String(input instanceof Request?input.url:input);
    if(url==='https://www.googleapis.com/oauth2/v3/certs')return Response.json({keys:[jwk]});
    if(url==='https://oauth2.googleapis.com/token'){
      const body=new URLSearchParams(options.body),record=codes.get(body.get('code'));
      assert.equal(body.get('client_id'),clientId);assert.equal(body.get('client_secret'),clientSecret);
      if(!record)return Response.json({error:'invalid_grant'},{status:400});
      codes.delete(body.get('code'));
      assert.equal(createHash('sha256').update(body.get('code_verifier')).digest('base64url'),record.auth.searchParams.get('code_challenge'));
      assert.equal(body.get('redirect_uri'),record.auth.searchParams.get('redirect_uri'));exchanges.push(body);
      const idToken=await new SignJWT({sub:record.subject||record.email,email:record.email,email_verified:record.verified!==false,name:'Google Test Customer'})
        .setProtectedHeader({alg:'RS256',kid:jwk.kid}).setIssuer(record.badIssuer?'https://untrusted.example':'https://accounts.google.com')
        .setAudience(record.badAudience?'another-client':clientId).setIssuedAt().setExpirationTime(record.expired?'-1m':'5m').sign(record.badSignature?otherKey.privateKey:privateKey);
      return Response.json({access_token:'test-google-access-token',token_type:'Bearer',expires_in:3600,id_token:idToken,scope:'openid email profile'});
    }
    // Tests must never call a real provider, even when an endpoint changes.
    if(!url.startsWith(base+'/'))throw new Error('Unexpected external request in Google test');
    return originalFetch(input,options);
  };
  t.after(async()=>{globalThis.fetch=originalFetch;if(server.listening){server.closeIdleConnections();await new Promise(resolve=>server.close(resolve));}accounts?.close();await store.close();await rm(dir,{recursive:true,force:true});});
  server.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
  const base=`http://127.0.0.1:${server.address().port}`,config=getConfig({...env,PUBLIC_BASE_URL:base,DATA_DIR:dir,GOOGLE_CLIENT_ID:clientId,GOOGLE_CLIENT_SECRET:clientSecret}),mail=new Map();
  accounts=await createAccounts(config,async({email,url})=>mail.set(email,url));const assisted=new Assisted(store,config);
  server.on('request',createApp({config,store,accounts,assisted}));
  const post=(path,body,cookie='',origin=base)=>fetch(base+path,{method:'POST',redirect:'manual',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:cookie},body:new URLSearchParams(body)});
  const page=(path,cookie='')=>fetch(base+path,{redirect:'manual',headers:{Cookie:cookie}});
  const start=async(returnTo='/assisted')=>{
    const response=await post('/assisted/login/google',{return_to:returnTo,provider:'other',scopes:'gmail.readonly'});assert.equal(response.status,303);
    const auth=new URL(response.headers.get('location'));assert.equal(auth.origin,'https://accounts.google.com');
    assert.equal(auth.searchParams.get('redirect_uri'),base+'/account/callback/google');
    assert.deepEqual(auth.searchParams.get('scope').split(' ').sort(),['email','openid','profile']);
    assert.equal(auth.searchParams.get('code_challenge_method'),'S256');assert(auth.searchParams.get('state'));
    assert.equal(auth.searchParams.get('access_type'),'online');assert.equal(auth.searchParams.get('prompt'),'select_account');assert.equal(auth.searchParams.has('include_granted_scopes'),false);
    assert(cookies(response));return {auth,cookie:cookies(response)};
  };
  const finish=async(flow,record,omitCookie=false)=>{
    const code='code-'+codes.size+'-'+Math.random();codes.set(code,{...record,auth:flow.auth});
    return page('/account/callback/google?'+new URLSearchParams({state:flow.auth.searchParams.get('state'),code}),omitCookie?'':flow.cookie);
  };
  const loginHTML=await(await page('/assisted/login')).text();assert.match(loginHTML,/Continue with Google/);assert.match(loginHTML,/Continue with email/);
  assert.equal((await post('/assisted/login/google',{},'','https://evil.example')).status,403);
  assert.equal((await originalFetch(base+'/assisted/login/google',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:''})).status,403);
  // Verify an existing email account, then link Google without changing its ID or supplier history.
  await post('/assisted/login',{email:'customer@example.test',name:'Email Customer'});
  const emailLogin=await fetch(mail.get('customer@example.test'),{redirect:'manual'}),emailCookie=cookies(emailLogin);
  await page('/assisted',emailCookie);const existing=Object.values(store.state.assisted.users)[0];
  const supplier=await assisted.onboard(existing.id,{name:'History Test Plumbing',description:'Synthetic diagnostic',zips:['84101'],price_cents:9500,timezone:'America/Denver',cancellation_terms:'Test terms',response_hours:24,software:'',terms_accepted:true});
  const flow=await start('/assisted/supplier/new'),response=await finish(flow,{email:existing.email,subject:'google-existing'});
  assert.equal(response.status,302);assert.equal(response.headers.get('location'),base+'/assisted/supplier/new');
  const googleCookie=cookies(response),session=await accounts.auth.api.getSession({headers:new Headers({Cookie:googleCookie})});
  assert.equal(session.user.id,existing.id);assert.equal(session.user.emailVerified,true);
  assert.equal((await assisted.dashboard(session.user.id)).suppliers[0].id,supplier.id);
  assert.equal((await page('/assisted',googleCookie)).status,200);
  const raw=new Database(join(dir,'assisted-accounts.sqlite'),{readonly:true});
  const googleAccount=raw.prepare("SELECT * FROM account WHERE providerId='google'").get();
  assert.notEqual(googleAccount.accessToken,'test-google-access-token');assert.equal(googleAccount.userId,existing.id);raw.close();
  const replay=await page('/account/callback/google?'+new URLSearchParams({state:flow.auth.searchParams.get('state'),code:'replayed'}),flow.cookie);
  assert(!cookies(replay).includes('session_token='));
  // A new Google customer resumes the original MCP consent, which still needs a separate approval.
  const callback='https://chatgpt.com/connector/oauth/google_e2e',verifier='v'.repeat(64);
  const registered=await originalFetch(base+'/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({redirect_uris:[callback],token_endpoint_auth_method:'none',grant_types:['authorization_code','refresh_token'],client_name:'Google test agent'})});
  const client=await registered.json(),authorization=await page('/authorize?'+new URLSearchParams({client_id:client.client_id,redirect_uri:callback,response_type:'code',code_challenge:createHash('sha256').update(verifier).digest('base64url'),code_challenge_method:'S256',resource:base+'/mcp',scope:'golocal:assisted',state:'outer-agent-state'}));
  const consentPath=authorization.headers.get('location');assert.match(consentPath,/^\/assisted\/agent\/consent\//);
  const agentFlow=await start(consentPath),agentLogin=await finish(agentFlow,{email:'new-customer@example.test'});
  assert.equal(agentLogin.headers.get('location'),base+consentPath);const newCookie=cookies(agentLogin),consentHTML=await(await page(consentPath,newCookie)).text();
  assert.match(consentHTML,/name="csrf"/);const csrf=consentHTML.match(/name="csrf" value="([^"]+)"/)[1];
  const approved=await post(consentPath+'/approve',{csrf},newCookie);assert.equal(new URL(approved.headers.get('location')).searchParams.get('state'),'outer-agent-state');
  const code=new URL(approved.headers.get('location')).searchParams.get('code');
  const token=await post('/token',{grant_type:'authorization_code',client_id:client.client_id,code,code_verifier:verifier,redirect_uri:callback,resource:base+'/mcp'});assert.equal(token.status,200);assert.equal((await token.json()).scope,'golocal:assisted');
  assert.equal((await assisted.dashboard(existing.id)).suppliers.length,1);assert.equal((await page('/assisted',newCookie)).status,200);
  // Untrusted destinations, missing browser state and invalid signed claims never grant access.
  const unsafe=await start('https://evil.example/');assert.equal((await finish(unsafe,{email:'safe@example.test'})).headers.get('location'),base+'/assisted');
  const missing=await start(),before=exchanges.length,missingResult=await finish(missing,{email:'missing@example.test'},true);assert.equal(exchanges.length,before);assert(!cookies(missingResult).includes('session_token='));
  for(const flag of ['badAudience','badIssuer','badSignature','expired']){
    const invalid=await finish(await start(),{email:flag+'@example.test',[flag]:true});assert(!cookies(invalid).includes('session_token='));assert.match(invalid.headers.get('location'),/error=/);
  }
  const unverified=await finish(await start(),{email:'unverified@example.test',verified:false}),unverifiedCookie=cookies(unverified);
  assert.equal((await page('/assisted',unverifiedCookie)).status,303);assert(!Object.values(store.state.assisted.users).some(u=>u.email==='unverified@example.test'));
});
