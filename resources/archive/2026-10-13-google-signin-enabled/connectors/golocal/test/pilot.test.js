import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Store } from '../src/store.js';
import { Assisted } from '../src/assisted.js';
import { PilotNotifications } from '../src/pilot-email.js';

test('test requests freeze test-only terms, send owner/customer alerts once and retain feedback',async t=>{
 const dir=await mkdtemp(join(tmpdir(),'golocal-pilot-'));const store=await new Store(dir,'f'.repeat(64)).init();t.after(async()=>{await store.close();await rm(dir,{recursive:true,force:true});});
 const config={baseUrl:'https://camryn-mechanomorphic-ellis.ngrok-free.dev',assistedTestMode:true,accounts:{notifications:true}},model=new Assisted(store,config);
 for(const id of ['owner','customer'])await model.ensureUser({id,name:id,email:id+'@example.test',emailVerified:true});
 const supplier=await model.onboard('owner',{name:'Pilot Plumbing',description:'Test diagnostic',zips:['84101'],price_cents:9500,timezone:'America/Denver',cancellation_terms:'Test only',response_hours:24,terms_accepted:true});await model.activate(supplier.id,true);
 const q=await model.offer('customer',{provider_id:supplier.id,zip:'84101',requested_start:new Date(Date.now()+86400000).toISOString()});assert.equal(q.testOnly,true);assert.match(q.terms,/Test request only/);
 const input={quote_id:q.quoteId,idempotency_key:'test-request-001',user_approved:true,customer:{name:'Test Customer',phone:'555-0100',street:'Synthetic Test Street',city:'Salt Lake City'}};
 const r=await model.request('customer',input);await model.request('customer',input);assert.equal(Object.keys(store.state.assisted.notifications).length,1);
 const emails=[],worker=new PilotNotifications(store,config,async(_config,message)=>{emails.push(message);return 'email-'+emails.length;});await worker.tick();await worker.tick();assert.equal(emails.length,1);assert.equal(emails[0].email,'owner@example.test');
 await model.decide('owner',r.bookingId,'accept');await model.decide('owner',r.bookingId,'accept');await worker.tick();assert.equal(emails.length,2);assert.equal(emails[1].email,'customer@example.test');assert.equal(emails[1].state,'confirmed');
 await model.feedback('customer',{role:'customer',rating:4,comment:'Status was easy to find.'});assert.equal(store.state.assisted.feedback.length,1);
 await assert.rejects(model.feedback('customer',{role:'supplier',rating:5,comment:'Invalid role'}));
});
test('uncertain pilot email outcome persists and is not automatically replayed',async t=>{
 const dir=await mkdtemp(join(tmpdir(),'golocal-pilot-mail-'));const store=await new Store(dir,'f'.repeat(64)).init();t.after(async()=>{await store.close();await rm(dir,{recursive:true,force:true});});
 await store.transaction(s=>{s.assisted={notifications:{one:{id:'one',state:'pending',message:{id:'one'}},two:{id:'two',state:'sending',message:{id:'two'}}}};});
 let sends=0;const worker=new PilotNotifications(store,{},async()=>{sends++;throw new Error('timeout');});await worker.recover();await worker.tick();await worker.tick();assert.equal(sends,1);assert.equal(store.state.assisted.notifications.one.state,'unknown');assert.equal(store.state.assisted.notifications.two.state,'unknown');
});
