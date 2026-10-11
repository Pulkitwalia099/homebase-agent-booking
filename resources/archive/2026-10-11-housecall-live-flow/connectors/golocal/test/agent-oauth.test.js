import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { Store } from '../src/store.js';
import { AgentOAuth, DEMO_SCOPE } from '../src/agent-oauth.js';
import { getConfig } from '../src/config.js';
import { createApp } from '../src/app.js';
import { Demo } from '../src/demo.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
const callback = 'https://chatgpt.com/connector/oauth/test_callback';
const verifier = 'v'.repeat(64), challenge = createHash('sha256').update(verifier).digest('base64url');

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(),'golocal-oauth-'));
  const store = await new Store(dir,'e'.repeat(64)).init();
  t.after(async() => { await store.close(); await rm(dir,{recursive:true,force:true}); });
  const config = getConfig({ ENABLE_DOTS_OAUTH:'true', MCP_BEARER_TOKEN:'m'.repeat(64), ADMIN_TOKEN:'a'.repeat(64) });
  let now=Date.now(); const oauth = new AgentOAuth(store,config,() => now);
  const client=await oauth.clientsStore.registerClient({ client_id:'client-1', client_name:'Test ChatGPT', redirect_uris:[callback], token_endpoint_auth_method:'none', grant_types:['authorization_code','refresh_token'] });
  const begin=async(params={}) => {
    let location; await oauth.authorize(client,{ redirectUri:callback, codeChallenge:challenge, resource:new URL(oauth.resource), state:'state-1',...params },{redirect:(status,url)=>{location=url;}});
    return location.split('/').at(-1);
  };
  const grant=async()=>{const id=await begin();const url=await oauth.consent(id,true);return oauth.exchangeAuthorizationCode(client,new URL(url).searchParams.get('code'),verifier,callback,new URL(oauth.resource));};
  return {dir,store,config,oauth,client,begin,grant,advance:ms=>{now+=ms;}};
}
test('OAuth refuses foreign callbacks, resources, scopes and supplier mode',async t=>{
  const f=await fixture(t);
  await assert.rejects(f.oauth.clientsStore.registerClient({...f.client,client_id:'foreign',redirect_uris:['https://evil.example/callback']}));
  await assert.rejects(f.begin({resource:new URL('https://evil.example/mcp')}));
  await assert.rejects(f.begin({scopes:['supplier:write']}));
  f.config.backend='housecall';await assert.rejects(f.grant());
});
test('OAuth code requires consent, exact PKCE/callback/client and is one-time',async t=>{
  const f=await fixture(t), id=await f.begin();
  assert.equal(Object.keys(f.store.state.agentOAuth.codes).length,0);
  const redirect=new URL(await f.oauth.consent(id,true));assert.equal(redirect.searchParams.get('state'),'state-1');
  const code=redirect.searchParams.get('code');
  await assert.rejects(f.oauth.exchangeAuthorizationCode(f.client,code,'x'.repeat(64),callback,new URL(f.oauth.resource)));
  await assert.rejects(f.oauth.exchangeAuthorizationCode({...f.client,client_id:'other'},code,verifier,callback,new URL(f.oauth.resource)));
  await assert.rejects(f.oauth.exchangeAuthorizationCode(f.client,code,verifier,callback+'bad',new URL(f.oauth.resource)));
  const tokens=await f.oauth.exchangeAuthorizationCode(f.client,code,verifier,callback,new URL(f.oauth.resource));
  assert.equal((await f.oauth.verifyAccessToken(tokens.access_token)).scopes[0],DEMO_SCOPE);
  await assert.rejects(f.oauth.exchangeAuthorizationCode(f.client,code,verifier,callback,new URL(f.oauth.resource)));
  await assert.rejects(f.oauth.consent(id,true));
  const disk=await readFile(join(f.dir,'state.enc.json'),'utf8');assert(!disk.includes(tokens.access_token));assert(!disk.includes(tokens.refresh_token));
});
test('OAuth denied and expired consent cannot mint tokens; switching backend invalidates access',async t=>{
  const f=await fixture(t),id=await f.begin();
  assert.equal(new URL(await f.oauth.consent(id,false)).searchParams.get('error'),'access_denied');
  assert.equal(Object.keys(f.store.state.agentOAuth.codes).length,0);
  const expired=await f.begin();f.advance(600001);await assert.rejects(f.oauth.consent(expired,true));
  const tokens=await f.grant();f.config.backend='jobber';await assert.rejects(f.oauth.verifyAccessToken(tokens.access_token));
});
test('OAuth refresh rotates, replay revokes family and grants expire after one day',async t=>{
  const f=await fixture(t),tokens=await f.grant();
  const rotated=await f.oauth.exchangeRefreshToken(f.client,tokens.refresh_token,undefined,new URL(f.oauth.resource));
  assert.notEqual(tokens.refresh_token,rotated.refresh_token);
  await assert.rejects(f.oauth.exchangeRefreshToken(f.client,tokens.refresh_token,undefined,new URL(f.oauth.resource)));
  await assert.rejects(f.oauth.verifyAccessToken(rotated.access_token));
  const next=await f.grant();f.advance(86300000);
  const short=await f.oauth.exchangeRefreshToken(f.client,next.refresh_token,undefined,new URL(f.oauth.resource));assert(short.expires_in<=100);
  f.advance(100001);await assert.rejects(f.oauth.verifyAccessToken(short.access_token));
  await assert.rejects(f.oauth.exchangeRefreshToken(f.client,short.refresh_token,undefined,new URL(f.oauth.resource)));
});
test('OAuth revocation is bound to the client and operator revoke removes all grants',async t=>{
  const f=await fixture(t),tokens=await f.grant();
  await f.oauth.revokeToken({...f.client,client_id:'other'},{token:tokens.access_token});await f.oauth.verifyAccessToken(tokens.access_token);
  await f.oauth.revokeToken(f.client,{token:tokens.refresh_token});await assert.rejects(f.oauth.verifyAccessToken(tokens.access_token));
  const next=await f.grant();await f.oauth.revokeAll();await assert.rejects(f.oauth.verifyAccessToken(next.access_token));
});
test('HTTP OAuth discovery → registration → operator consent → PKCE → real MCP booking lifecycle',async t=>{
  const f=await fixture(t),server=createServer();server.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
  t.after(()=>new Promise(resolve=>{server.closeIdleConnections();server.close(resolve);}));
  const base=`http://127.0.0.1:${server.address().port}`;f.config.baseUrl=base;f.config.allowedHosts.add(new URL(base).host);
  server.on('request',createApp({config:f.config,store:f.store,demo:new Demo(f.store)}));
  const post=(path,body,headers={})=>fetch(base+path,{method:'POST',redirect:'manual',headers:{'Content-Type':'application/x-www-form-urlencoded',...headers},body:new URLSearchParams(body)});
  const denied=await fetch(base+'/api/tools');assert.equal(denied.status,401);assert(denied.headers.get('www-authenticate').includes('resource_metadata'));
  const meta=await(await fetch(base+'/.well-known/oauth-protected-resource/mcp')).json();assert.equal(meta.resource,base+'/mcp');
  const as=await(await fetch(base+'/.well-known/oauth-authorization-server')).json();assert(as.code_challenge_methods_supported.includes('S256'));
  const reg=await fetch(base+'/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({redirect_uris:[callback],token_endpoint_auth_method:'none',grant_types:['authorization_code','refresh_token'],client_name:'E2E test'})});
  assert.equal(reg.status,201);const client=await reg.json();
  const request=await fetch(base+'/authorize?'+new URLSearchParams({client_id:client.client_id,redirect_uri:callback,response_type:'code',code_challenge:challenge,code_challenge_method:'S256',resource:base+'/mcp',scope:DEMO_SCOPE,state:'e2e-state'}),{redirect:'manual'});
  assert.equal(request.status,303);const consentPath=request.headers.get('location');
  const signIn=await fetch(base+consentPath);assert.equal(signIn.status,401);assert.equal(signIn.headers.get('referrer-policy'),'same-origin');
  assert.equal((await post('/operator/login',{token:f.config.adminToken,returnTo:consentPath},{Origin:'null'})).status,403);
  assert.equal((await post('/operator/login',{token:f.config.adminToken,returnTo:consentPath},{Origin:'https://evil.example'})).status,403);
  const login=await post('/operator/login',{token:f.config.adminToken,returnTo:consentPath},{Origin:base});assert.equal(login.headers.get('location'),consentPath);
  const cookie=login.headers.get('set-cookie').split(';')[0];
  const page=await(await fetch(base+consentPath,{headers:{Cookie:cookie}})).text();const csrf=page.match(/name="csrf" value="([a-f0-9]+)"/)[1];
  assert.equal((await post(consentPath+'/approve',{csrf:'wrong'},{Cookie:cookie,Origin:base})).status,403);
  const approved=await post(consentPath+'/approve',{csrf},{Cookie:cookie,Origin:base});const callbackUrl=new URL(approved.headers.get('location'));assert.equal(callbackUrl.searchParams.get('state'),'e2e-state');
  const grant={grant_type:'authorization_code',client_id:client.client_id,code:callbackUrl.searchParams.get('code'),code_verifier:verifier,redirect_uri:callback,resource:base+'/mcp'};
  const tokenResult=await post('/token',grant);assert.equal(tokenResult.status,200);const tokens=await tokenResult.json();assert.equal((await post('/token',grant)).status,400);
  const mcp=new Client({name:'oauth-e2e',version:'1'});await mcp.connect(new StreamableHTTPClientTransport(new URL(base+'/mcp'),{requestInit:{headers:{Authorization:`Bearer ${tokens.access_token}`}}}));
  try {
    const invoke=async(name,args={})=>{const r=await mcp.callTool({name,arguments:args});assert(!r.isError);return r.structuredContent;};
    assert((await mcp.listTools()).tools.some(tool=>tool.name==='confirm_booking'));
    const provider=(await invoke('search_providers',{zip:'84101',service:'plumbing_diagnostic'})).providers[0];
    const slot=(await invoke('get_availability',{provider_id:provider.id})).slots[0];
    const quote=await invoke('prepare_booking',{provider_id:provider.id,slot_id:slot.id});
    const args={quote_id:quote.id,idempotency_key:'oauth-e2e-test',user_approved:true};
    const booking=await invoke('confirm_booking',args);assert.equal(booking.simulated,true);assert.equal((await invoke('confirm_booking',args)).id,booking.id);
    assert.equal((await invoke('get_booking_status',{booking_id:booking.id})).state,'simulated_confirmed');
    assert.equal((await invoke('cancel_booking',{booking_id:booking.id,user_approved:true})).state,'cancelled');
  } finally {await mcp.close();}
});

test('Housecall grant binds scope and company; old demo grant and changed account cannot expand access',async t=>{
 const f=await fixture(t);const demo=await f.grant();
 f.config.backend='housecall';f.config.housecall={writes:true,companyId:'bound-company'};
 await assert.rejects(f.oauth.verifyAccessToken(demo.access_token));
 await assert.rejects(f.oauth.exchangeRefreshToken(f.client,demo.refresh_token,undefined,new URL(f.oauth.resource)));
 await assert.rejects(f.begin({scopes:[DEMO_SCOPE]}));
 const live=await f.grant();assert.equal(live.scope,'golocal:housecall-test');await f.oauth.verifyAccessToken(live.access_token);
 f.config.housecall.companyId='other-company';await assert.rejects(f.oauth.verifyAccessToken(live.access_token));
 await assert.rejects(f.oauth.exchangeRefreshToken(f.client,live.refresh_token,undefined,new URL(f.oauth.resource)));
});
test('OAuth backend or company change between consent and code exchange cannot mint broader access',async t=>{
 const f=await fixture(t);let id=await f.begin();
 f.config.backend='housecall';f.config.housecall={writes:true,companyId:'bound-company'};
 await assert.rejects(f.oauth.consent(id,true));
 id=await f.begin();const code=new URL(await f.oauth.consent(id,true)).searchParams.get('code');
 f.config.housecall.companyId='other-company';
 await assert.rejects(f.oauth.exchangeAuthorizationCode(f.client,code,verifier,callback,new URL(f.oauth.resource)));
});
