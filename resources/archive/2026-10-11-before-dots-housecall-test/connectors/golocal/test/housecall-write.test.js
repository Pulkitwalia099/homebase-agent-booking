import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Store} from '../src/store.js';
import {Housecall} from '../src/housecall.js';
import {HousecallTest} from '../src/housecall-test.js';
async function fixture(t) {
 const dir=await mkdtemp(join(tmpdir(),'hcp-write-'));const store=await new Store(dir,'e'.repeat(64)).init();
 t.after(async()=>{await store.close();await rm(dir,{recursive:true,force:true});});
 const config={apiKey:'secret',companyId:'test-company',writes:true};
 const calls=[];let customer,job;let fail=false;
 const fetcher=async(url,o)=>{
  const path=new URL(url).pathname;calls.push({path,method:o.method,body:o.body?JSON.parse(o.body):null});
  let result;
  if(path==='/company') result={id:config.companyId,name:'GoLocal Connector Test',time_zone:'America/New_York'};
  else if(path==='/customers'&&o.method==='POST') {const b=JSON.parse(o.body);customer={...b,id:'cust-1',company_id:config.companyId,addresses:[{...b.addresses[0],id:'addr-1'}]};result=customer;}
  else if(path==='/customers/cust-1') result=customer;
  else if(path==='/jobs'&&o.method==='POST') {if(fail) throw Error('lost response');const b=JSON.parse(o.body);job={id:'job-1',company_id:config.companyId,customer:{id:customer.id,notifications_enabled:false},address:{id:'addr-1'},total_amount:0,outstanding_balance:0,assigned_employees:[],work_status:'scheduled',schedule:b.schedule};result=job;}
  else if(path==='/jobs/job-1/schedule'&&o.method==='DELETE') {job.schedule={};job.work_status='needs scheduling';result={deleted:true};}
  else if(path==='/jobs/job-1') result=job;
  else throw Error('unexpected request');
  return new Response(JSON.stringify(result),{status:200});
 };
 const adapter=new Housecall(config,fetcher),pilot=new HousecallTest(adapter,store,config);
 return {pilot,store,config,calls,fail:()=>{fail=true;},customer:()=>customer,job:()=>job};
}
test('Housecall synthetic booking, concurrent retries and unscheduling use one vendor job with no notifications',async t=>{
 const f=await fixture(t),q=await f.pilot.prepare();
 const [a,b]=await Promise.all([f.pilot.confirm(q.id,'operation-1',true),f.pilot.confirm(q.id,'operation-1',true)]);
 assert.equal(a.jobId,b.jobId);assert.equal(f.calls.filter(c=>c.path==='/jobs'&&c.method==='POST').length,1);
 assert.equal(f.customer().notifications_enabled,false);assert(!f.customer().email);assert(!f.customer().mobile_number);
 const payload=f.calls.find(c=>c.path==='/jobs'&&c.method==='POST').body;assert.deepEqual(payload.assigned_employee_ids,[]);assert.equal(payload.line_items[0].unit_price,0);
 await assert.rejects(f.pilot.confirm(q.id,'different-key',true),{code:'IDEMPOTENCY_CONFLICT'});
 const removed=await f.pilot.unschedule(a.jobId,true);assert.equal(removed.jobCancelled,false);assert.equal(removed.workStatus,'needs scheduling');
 await f.pilot.unschedule(a.jobId,true);assert.equal(f.calls.filter(c=>c.method==='DELETE').length,1);
 const replay=await f.pilot.confirm(q.id,'operation-1',true);assert.equal(replay.workStatus,'needs scheduling');assert.equal(replay.scheduledStart,null);
});
test('Housecall approval, expiration, wrong account and arbitrary record access stop before writes',async t=>{
 const f=await fixture(t),q=await f.pilot.prepare();
 await assert.rejects(f.pilot.confirm(q.id,'key-1',false),{code:'APPROVAL_REQUIRED'});
 await assert.rejects(f.pilot.status('unknown'),{code:'NOT_FOUND'});
 await f.store.transaction(s=>{s.housecallQuotes[q.id].expiresAt=0;});
 await assert.rejects(f.pilot.confirm(q.id,'key-1',true),{code:'QUOTE_EXPIRED'});
 f.config.writes=false;await assert.rejects(f.pilot.prepare(),{code:'WRITES_DISABLED'});
 assert(!f.calls.some(c=>c.method!=='GET'));
});
test('Housecall uncertain writes survive persistence and cannot be retried with same or different keys',async t=>{
 const f=await fixture(t),q=await f.pilot.prepare();f.fail();
 await assert.rejects(f.pilot.confirm(q.id,'lost-response',true),{code:'UNKNOWN_OUTCOME'});
 await assert.rejects(f.pilot.confirm(q.id,'lost-response',true),{code:'UNKNOWN_OUTCOME'});
 await assert.rejects(f.pilot.confirm(q.id,'new-key',true),{code:'IDEMPOTENCY_CONFLICT'});
 assert.equal(f.calls.filter(c=>c.path==='/jobs'&&c.method==='POST').length,1);
});
test('Housecall changed notifications and nonzero job value block scheduling changes',async t=>{
 const f=await fixture(t),q=await f.pilot.prepare();const job=await f.pilot.confirm(q.id,'safe-job',true);
 f.customer().notifications_enabled=true;
 await assert.rejects(f.pilot.unschedule(job.jobId,true),{code:'UNSAFE_CUSTOMER'});
 f.customer().notifications_enabled=false;f.job().total_amount=10;
 await assert.rejects(f.pilot.unschedule(job.jobId,true),{code:'WRONG_RECORD'});
 assert(!f.calls.some(c=>c.method==='DELETE'));
});

test('Housecall permits only the explicitly bound owner and rejects another employee or started work',async t=>{
 const f=await fixture(t),q=await f.pilot.prepare();await f.pilot.confirm(q.id,'owner-test',true);
 f.config.ownerId='bound-owner';f.job().assigned_employees=[{id:'bound-owner',company_id:f.config.companyId}];
 await f.pilot.status('job-1');
 f.job().assigned_employees=[{id:'another-person',company_id:f.config.companyId}];await assert.rejects(f.pilot.status('job-1'),{code:'WRONG_RECORD'});
 f.job().assigned_employees=[];f.job().work_timestamps={started_at:'2026-10-12T16:00:00Z'};await assert.rejects(f.pilot.unschedule('job-1',true),{code:'WRONG_RECORD'});
});
