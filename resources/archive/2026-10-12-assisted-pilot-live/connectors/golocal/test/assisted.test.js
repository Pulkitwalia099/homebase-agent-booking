import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Store } from '../src/store.js';
import { Assisted, wallTimeToISO } from '../src/assisted.js';
import { getConfig } from '../src/config.js';

const supplier = name => ({name,description:'One-hour diagnostic visit; repairs quoted separately.',zips:['84101'],price_cents:9500,
  timezone:'America/Denver',cancellation_terms:'Cancel before acceptance at no charge.',response_hours:24,software:'Housecall Pro',terms_accepted:true});
async function fixture(t) {
  const dir=await mkdtemp(join(tmpdir(),'golocal-assisted-')),store=await new Store(dir,'f'.repeat(64)).init();
  t.after(async()=>{await store.close();await rm(dir,{recursive:true,force:true});});
  let now=Date.parse('2026-10-12T12:00:00Z');
  const service=new Assisted(store,{baseUrl:'http://localhost:8787'},()=>now);
  for(const id of ['customer-a','customer-b','supplier-a','supplier-b'])await service.ensureUser({id,email:`${id}@example.test`,name:id,emailVerified:true});
  const a=await service.onboard('supplier-a',supplier('A Plumbing')),b=await service.onboard('supplier-b',supplier('B Plumbing'));
  const offer=(actor,provider)=>service.offer(actor,{provider_id:provider.id,zip:'84101',requested_start:'2026-10-14T16:00:00Z'});
  const request=(actor,q,key='request-retry-001')=>service.request(actor,{quote_id:q.quoteId,idempotency_key:key,user_approved:true,
    customer:{name:actor,phone:'555-0100',street:'Synthetic Test Street',city:'Salt Lake City',notes:'Test only'}});
  return {dir,store,service,a,b,offer,request,advance:ms=>{now+=ms;}};
}
test('supplier onboarding requires verified account, participation and operator review',async t=>{
  const f=await fixture(t);
  assert.equal(f.service.providers('customer-a',{zip:'84101',service:'plumbing_diagnostic'}).providers.length,0);
  await assert.rejects(f.service.ensureUser({id:'unverified',email:'u@example.test',emailVerified:false}),{code:'ACCOUNT_REQUIRED'});
  await assert.rejects(f.service.activate(f.a.id,false),{code:'REVIEW_REQUIRED'});
  await f.service.activate(f.a.id,true);const result=f.service.providers('customer-a',{zip:'84101',service:'plumbing_diagnostic'});
  assert.equal(result.providers.length,1);assert.equal(result.providers[0].liveAvailability,false);assert(!JSON.stringify(result).includes('supplier-a@example.test'));
});
test('two suppliers and two customers route independently, even with the same retry key',async t=>{
  const f=await fixture(t);await f.service.activate(f.a.id,true);await f.service.activate(f.b.id,true);
  const qa=await f.offer('customer-a',f.a),qb=await f.offer('customer-b',f.b);
  const [ra,rb]=await Promise.all([f.request('customer-a',qa),f.request('customer-b',qb)]);
  assert.notEqual(ra.bookingId,rb.bookingId);assert.equal(ra.state,'pending_supplier');
  assert.equal((await f.service.dashboard('supplier-a')).supplierBookings.length,1);
  assert.equal((await f.service.dashboard('supplier-b')).supplierBookings[0].bookingId,rb.bookingId);
  await assert.rejects(f.service.status('customer-b',ra.bookingId),{code:'NOT_FOUND'});
  await assert.rejects(f.service.decide('supplier-b',ra.bookingId,'accept'),{code:'NOT_FOUND'});
  await assert.rejects(f.service.decide('customer-a',ra.bookingId,'accept'),{code:'NOT_FOUND'});
  const accepted=await f.service.decide('supplier-a',ra.bookingId,'accept');assert.equal(accepted.state,'confirmed');
  assert.equal(accepted.confirmationSource,'supplier_portal_acceptance');assert.equal(accepted.offer.priceCents,9500);assert.equal(accepted.vendorSync,'not_connected');
  assert.equal((await f.service.decide('supplier-a',ra.bookingId,'accept')).bookingId,ra.bookingId);
  assert.equal((await f.service.decide('supplier-b',rb.bookingId,'decline','No capacity')).state,'declined');
  await assert.rejects(f.service.decide('supplier-b',rb.bookingId,'accept'),{code:'DECISION_CONFLICT'});
});
test('parallel duplicate requests create one record; changed inputs and reused offers reject',async t=>{
  const f=await fixture(t);await f.service.activate(f.a.id,true);const q=await f.offer('customer-a',f.a);
  const outcomes=await Promise.all([f.request('customer-a',q),f.request('customer-a',q)]);assert.equal(outcomes[0].bookingId,outcomes[1].bookingId);
  assert.equal(Object.keys(f.store.state.assisted.requests).length,1);
  await assert.rejects(f.service.request('customer-a',{quote_id:q.quoteId,idempotency_key:'request-retry-001',user_approved:true,customer:{name:'Changed',phone:'555',street:'Other',city:'SLC',notes:''}}),{code:'IDEMPOTENCY_CONFLICT'});
  await assert.rejects(f.request('customer-a',q,'other-retry-key'),{code:'OFFER_USED'});
  await assert.rejects(f.request('customer-b',q),{code:'NOT_FOUND'});
});
test('expiry, supplier pause and changed terms prevent stale booking approvals',async t=>{
  const f=await fixture(t);await f.service.activate(f.a.id,true);let q=await f.offer('customer-a',f.a);f.advance(900001);
  await assert.rejects(f.request('customer-a',q),{code:'QUOTE_EXPIRED'});
  q=await f.offer('customer-a',f.a);
  await assert.rejects(f.service.updateSupplier('supplier-b',f.a.id,supplier('Changed')),{code:'NOT_FOUND'});
  await f.service.updateSupplier('supplier-a',f.a.id,{...supplier('A Plumbing'),price_cents:11000});
  await assert.rejects(f.request('customer-a',q),{code:'SUPPLIER_UNAVAILABLE'});
  assert.equal(f.service.providers('customer-a',{zip:'84101',service:'plumbing_diagnostic'}).providers.length,0);
  await f.service.activate(f.a.id,true);
  q=await f.offer('customer-a',f.a);const r=await f.request('customer-a',q);await f.service.pause('supplier-a',f.a.id);
  assert.equal(f.service.providers('customer-a',{zip:'84101',service:'plumbing_diagnostic'}).providers.length,0);
  // Pause blocks new work but does not silently remove a supplier's existing commitments.
  assert.equal((await f.service.status('supplier-a',r.bookingId)).state,'pending_supplier');
  f.advance(24*3600000);assert.equal((await f.service.status('customer-a',r.bookingId)).state,'expired');
  await assert.rejects(f.service.decide('supplier-a',r.bookingId,'accept'),{code:'DECISION_CONFLICT'});
  await f.service.activate(f.a.id,true);assert.equal(f.service.providers('customer-a',{zip:'84101',service:'plumbing_diagnostic'}).providers.length,1);
});
test('accept-versus-withdraw race produces one terminal outcome and persists across restart',async t=>{
  const f=await fixture(t);await f.service.activate(f.a.id,true);const r=await f.request('customer-a',await f.offer('customer-a',f.a));
  const outcomes=await Promise.allSettled([f.service.decide('supplier-a',r.bookingId,'accept'),f.service.withdraw('customer-a',r.bookingId)]);
  assert.equal(outcomes.filter(o=>o.status==='fulfilled').length,1);
  const before=await f.service.status('customer-a',r.bookingId),disk=await readFile(join(f.dir,'state.enc.json'),'utf8');
  assert(!disk.includes('Synthetic Test Street'));assert(!disk.includes('customer-a@example.test'));
  await f.store.close();const reopened=await new Store(f.dir,'f'.repeat(64)).init();
  assert.equal((await new Assisted(reopened,{baseUrl:'http://localhost:8787'}).status('customer-a',r.bookingId)).state,before.state);await reopened.close();
});
test('wall-time conversion preserves business time zone and rejects DST gaps/ambiguity',()=>{
  assert.equal(wallTimeToISO('2026-10-14T10:00','America/Denver'),'2026-10-14T16:00:00.000Z');
  assert.throws(()=>wallTimeToISO('2026-03-08T02:30','America/Denver'),{code:'INVALID_TIME'});
  assert.throws(()=>wallTimeToISO('2026-11-01T01:30','America/Denver'),{code:'INVALID_TIME'});
});
test('assisted startup requires private independent auth and rejects a public development mailbox',()=>{
  const base={BACKEND:'assisted',MCP_BEARER_TOKEN:'m'.repeat(64),ADMIN_TOKEN:'a'.repeat(64),DATA_ENCRYPTION_KEY:'f'.repeat(64)};
  assert.throws(()=>getConfig(base),/ACCOUNT_AUTH_SECRET/);
  assert.throws(()=>getConfig({...base,ACCOUNT_AUTH_SECRET:'z'.repeat(64)}),/email delivery/);
  assert.throws(()=>getConfig({...base,ACCOUNT_AUTH_SECRET:'z'.repeat(64),ASSISTED_DEV_MAILBOX:'true',PUBLIC_BASE_URL:'https://example.test'}),/loopback/);
});
