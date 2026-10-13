import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, rm, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getConfig } from '../src/config.js';
import { Store } from '../src/store.js';
import { bootstrapHostedState } from '../src/hosted-state.js';
import { createApp } from '../src/app.js';

const token='c'.repeat(64), encryptionKey='d'.repeat(64);
const env=()=>({GOLOCAL_HOSTED:'true',HOST:'0.0.0.0',DATA_DIR:'/var/data/golocal',PUBLIC_BASE_URL:'https://api.getgolocal.com',MCP_BEARER_TOKEN:'a'.repeat(64),ADMIN_TOKEN:'b'.repeat(64),DATA_ENCRYPTION_KEY:encryptionKey,BACKEND:'housecall',HOUSECALL_TEST_COMPANY_ID:'company-1',GOLOCAL_HOSTED_COMPANY_ID:'company-1',GOLOCAL_HOSTED_KEY_ENABLED:'true',GOLOCAL_HOSTED_KEY_SHA256:createHash('sha256').update(token).digest('hex')});

test('durable access requires hosted mode, disk, HTTPS, explicit independent key and matching company',()=>{
 const c=getConfig(env());assert.equal(c.oauthGrantDays,90);assert.equal(c.hostedAccess.companyId,'company-1');
 for(const override of [{GOLOCAL_HOSTED:'false'},{DATA_DIR:'.data'},{PUBLIC_BASE_URL:'http://localhost:8787'},{HOST:'127.0.0.1'},{GOLOCAL_HOSTED_KEY_ENABLED:'false'},{GOLOCAL_HOSTED_COMPANY_ID:'company-2'},{BACKEND:'demo'},{GOLOCAL_HOSTED_KEY_SHA256:createHash('sha256').update('a'.repeat(64)).digest('hex')}]) assert.throws(()=>getConfig({...env(),...override}));
 assert.equal(getConfig({MCP_BEARER_TOKEN:'a'.repeat(64),ADMIN_TOKEN:'b'.repeat(64)}).oauthGrantDays,1);
});

async function seed(t) {
 const dir=await mkdtemp(join(tmpdir(),'hosted-seed-'));t.after(()=>rm(dir,{recursive:true,force:true}));
 const store=await new Store(dir,encryptionKey).init();
 await store.transaction(s=>{s.housecallOperations=Object.fromEntries([1,2,3].map(n=>[`job:company-1:key-${n}`,{state:n===3?'pending':'done',companyId:'company-1',result:{jobId:`job-${n}`}}]));});await store.close();
 return Buffer.from(await readFile(join(dir,'state.enc.json'),'utf8')).toString('base64');
}

test('first hosted boot preserves all three operations including uncertain writes; restart never replaces state',async t=>{
 const migration=await seed(t),dir=await mkdtemp(join(tmpdir(),'hosted-disk-'));t.after(()=>rm(dir,{recursive:true,force:true}));
 const c={...getConfig(env()),dataDir:dir};
 await bootstrapHostedState(c,{GOLOCAL_BOOTSTRAP_STATE_BASE64:migration});
 const store=await new Store(dir,encryptionKey).init();assert.equal(Object.keys(store.state.housecallOperations).length,3);assert.equal(store.state.housecallOperations['job:company-1:key-3'].state,'pending');
 await store.transaction(s=>{s.hostedCredentialRevoked=true;});await store.close();
 await bootstrapHostedState(c,{GOLOCAL_BOOTSTRAP_STATE_BASE64:migration});
 const reopened=await new Store(dir,encryptionKey).init();assert.equal(reopened.state.hostedCredentialRevoked,true);await reopened.close();
});

test('missing, corrupt, wrong-key and wrong-company hosted history fail closed',async t=>{
 const migration=await seed(t),dir=await mkdtemp(join(tmpdir(),'hosted-invalid-'));t.after(()=>rm(dir,{recursive:true,force:true}));
 const c={...getConfig(env()),dataDir:dir};
 await assert.rejects(bootstrapHostedState(c,{}));
 await assert.rejects(bootstrapHostedState({...c,encryptionKey:'e'.repeat(64)},{GOLOCAL_BOOTSTRAP_STATE_BASE64:migration}));
 await assert.rejects(bootstrapHostedState({...c,housecall:{companyId:'other'}},{GOLOCAL_BOOTSTRAP_STATE_BASE64:migration}));
 await writeFile(join(dir,'state.enc.json'),'corrupt');
 await assert.rejects(bootstrapHostedState(c,{GOLOCAL_BOOTSTRAP_STATE_BASE64:migration}));
 assert.equal(await readFile(join(dir,'state.enc.json'),'utf8'),'corrupt');
});

test('hosted key remains bound, wrong/admin credentials reject, and operator revocation persists',async t=>{
 const dir=await mkdtemp(join(tmpdir(),'hosted-auth-'));
 const store=await new Store(dir,encryptionKey).init();
 const config={...getConfig(env()),dataDir:dir};
 const app=createApp({config,store,housecall:{company:async()=>({id:'company-1'})}});
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
 t.after(async()=>{server.closeAllConnections();await new Promise(r=>server.close(r));await store.close();await rm(dir,{recursive:true,force:true});});
 const base=`http://127.0.0.1:${server.address().port}`;config.allowedHosts.add(new URL(base).host);
 const headers={Authorization:`Bearer ${token}`};assert.equal((await fetch(base+'/api/tools',{headers})).status,200);
 assert.equal((await fetch(base+'/api/tools',{headers:{Authorization:`Bearer ${config.adminToken}`}})).status,401);
 assert.equal((await fetch(base+'/api/tools',{headers:{Authorization:`Bearer ${'f'.repeat(64)}`}})).status,401);
 config.housecall.companyId='other';assert.equal((await fetch(base+'/api/tools',{headers})).status,401);config.housecall.companyId='company-1';
 config.baseUrl='https://other.example';assert.equal((await fetch(base+'/api/tools',{headers})).status,401);config.baseUrl='https://api.getgolocal.com';
 const post=(path,body,extra={})=>fetch(base+path,{method:'POST',redirect:'manual',headers:{'Content-Type':'application/x-www-form-urlencoded',...extra},body:new URLSearchParams(body)});
 const login=await post('/operator/login',{token:config.adminToken});const cookie=login.headers.get('set-cookie').split(';')[0];
 const page=await(await fetch(base+'/operator',{headers:{Cookie:cookie}})).text();const csrf=page.match(/name="csrf" value="([a-f0-9]+)"/)[1];
 assert.equal((await post('/operator/agent/revoke',{csrf:'wrong'},{Cookie:cookie})).status,403);
 assert.equal((await post('/operator/agent/revoke',{csrf},{Cookie:cookie})).status,303);
 assert.equal((await fetch(base+'/api/tools',{headers})).status,401);assert.equal(store.state.hostedCredentialRevoked,true);
});
