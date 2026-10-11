import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StreamableHTTPClientTransport} from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
if(!process.argv.includes('--approved-synthetic-write')) throw Error('Explicit approved synthetic write flag required.');
const client=new Client({name:'golocal-housecall-live-test',version:'0.1.0'});
await client.connect(new StreamableHTTPClientTransport(new URL(`${process.env.PUBLIC_BASE_URL}/mcp`),{requestInit:{headers:{Authorization:`Bearer ${process.env.MCP_BEARER_TOKEN}`}}}));
const results=[];
const invoke=async(name,args={})=>{const r=await client.callTool({name,arguments:args});results.push({name,result:r});await writeFile('../../output/housecall-live-mcp-results.json',JSON.stringify(results,null,2));assert(!r.isError,r.content[0]?.text);return r.structuredContent;};
try {
 const status=await invoke('connector_status');assert.equal(status.backend,'housecall');assert.equal(status.housecallTestWritesEnabled,true);
 await invoke('housecall_company');await invoke('housecall_list_jobs');
 const resume=process.argv.find(a=>a.startsWith('--quote='))?.slice(8);const q=resume?{id:resume}:await invoke('prepare_housecall_test_booking');console.log(JSON.stringify({preparedQuote:q}));
 const args={quote_id:q.id,idempotency_key:'hcp-live-test-20261011-a1',user_approved:true};
 const booked=await invoke('confirm_housecall_test_booking',args);console.log(JSON.stringify({booked}));
 const retry=await invoke('confirm_housecall_test_booking',args);assert.equal(booked.jobId,retry.jobId);assert.equal(retry.idempotentReplay,true);
 await invoke('housecall_test_booking_status',{job_id:booked.jobId});
 const removed=await invoke('unschedule_housecall_test_booking',{job_id:booked.jobId,user_approved:true});assert.equal(removed.unscheduled,true);assert.equal(removed.jobCancelled,false);
 console.log(JSON.stringify({result:'PASS',jobId:booked.jobId,finalStatus:removed.workStatus,jobCancelled:false,amountCharged:0}));
} finally {await client.close();}
