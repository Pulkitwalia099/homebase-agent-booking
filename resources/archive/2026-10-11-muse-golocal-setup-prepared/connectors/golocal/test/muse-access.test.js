import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {getConfig} from '../src/config.js';
import {createApp} from '../src/app.js';
import {Store} from '../src/store.js';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StreamableHTTPClientTransport} from '@modelcontextprotocol/sdk/client/streamableHttp.js';
const env=()=>({MCP_BEARER_TOKEN:'a'.repeat(64),ADMIN_TOKEN:'b'.repeat(64),MUSE_TEST_BEARER_TOKEN:'c'.repeat(64),MUSE_TEST_COMPANY_ID:'company-1',MUSE_TEST_PUBLIC_BASE_URL:'https://test.example',MUSE_TEST_TOKEN_EXPIRES_AT:new Date(Date.now()+60000).toISOString(),BACKEND:'housecall',HOUSECALL_TEST_COMPANY_ID:'company-1'});
test('Muse configuration requires independent bounded credentials and exact HTTPS origin',()=>{
 assert.equal(getConfig(env()).museAccess.companyId,'company-1');
 for(const overrides of [{MUSE_TEST_BEARER_TOKEN:'a'.repeat(64)},{MUSE_TEST_COMPANY_ID:''},{MUSE_TEST_PUBLIC_BASE_URL:'https://test.example/path'},{MUSE_TEST_TOKEN_EXPIRES_AT:'invalid'},{MUSE_TEST_TOKEN_EXPIRES_AT:new Date(Date.now()+172800000).toISOString()}]) assert.throws(()=>getConfig({...env(),...overrides}));
});
test('Muse REST/MCP credential expires and cannot follow backend, company or origin changes; operator access remains separate',async t=>{
 const dir=await mkdtemp(join(tmpdir(),'muse-access-'));const store=await new Store(dir,'d'.repeat(64)).init();
 t.after(async()=>{await store.close();await rm(dir,{recursive:true,force:true});});
 const config=getConfig({...env(),DATA_DIR:dir,DATA_ENCRYPTION_KEY:'d'.repeat(64)});
 const app=createApp({config,store,housecall:{company:async()=>({id:'company-1',name:'GoLocal Connector Test',timeZone:'America/New_York'})}});
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
 t.after(()=>new Promise(r=>{server.closeIdleConnections();server.close(r);}));
 const base=`http://127.0.0.1:${server.address().port}`;config.baseUrl=base;config.museAccess.baseUrl=base;config.allowedHosts.add(new URL(base).host);
 const headers={Authorization:`Bearer ${config.museAccess.token}`,'Content-Type':'application/json'};
 assert.equal((await fetch(`${base}/api/tools`,{headers})).status,200);
 const company=await fetch(`${base}/api/tools/housecall_company`,{method:'POST',headers,body:'{}'});assert.equal((await company.json()).id,'company-1');
 const c=new Client({name:'muse-access-test',version:'1'});await c.connect(new StreamableHTTPClientTransport(new URL(`${base}/mcp`),{requestInit:{headers}}));
 const r=await c.callTool({name:'connector_status',arguments:{}});assert.equal(r.structuredContent.backend,'housecall');await c.close();
 for(const change of [()=>{config.backend='demo';},()=>{config.housecall.companyId='another-company';},()=>{config.baseUrl='https://different.example';},()=>{config.museAccess.expiresAt=0;}]) {
   change();assert.equal((await fetch(`${base}/api/tools`,{headers})).status,401);
   config.backend='housecall';config.housecall.companyId='company-1';config.baseUrl=base;config.museAccess.expiresAt=Date.now()+60000;
 }
 config.museAccess.expiresAt=0;
 assert.equal((await fetch(`${base}/api/tools`,{headers:{Authorization:`Bearer ${config.mcpToken}`}})).status,200);
 assert.equal((await fetch(`${base}/api/tools`,{headers:{Authorization:`Bearer ${config.adminToken}`}})).status,401);
});
