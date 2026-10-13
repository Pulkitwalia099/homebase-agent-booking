import test from 'node:test';
import assert from 'node:assert/strict';
import { Housecall } from '../src/housecall.js';
import { getConfig } from '../src/config.js';
import { makeTools } from '../src/tools.js';
const config = { apiKey: 'private-test-key', companyId: 'test-company' };
const response = value => new Response(JSON.stringify(value), { status: 200 });

test('Housecall reads bind company, use Token auth and omit customer/contact data', async () => {
  const calls = [];
  const adapter = new Housecall(config, async (url, options) => {
    calls.push([url, options]);
    return response(url.endsWith('/company') ? { id: config.companyId, name: 'GoLocal Test', time_zone: 'America/Denver', phone_number: 'private-phone' } : {
      page: 1, total_pages: 1, jobs: [{ id: 'job-1', invoice_number: '42', work_status: 'scheduled', company_id: config.companyId, customer: { email: 'private-customer' }, notes: ['private-note'] }]
    });
  });
  const jobs = await adapter.jobs();
  assert.equal(calls.length, 2);
  assert(calls.every(([,o]) => o.method === 'GET' && o.headers.Authorization === 'Token private-test-key' && o.redirect === 'error'));
  assert.equal(jobs.jobs[0].id, 'job-1'); assert.equal(jobs.availabilityInferred, false);
  assert(!JSON.stringify(jobs).includes('private-'));
  assert.deepEqual(await adapter.company(), { id: config.companyId, name: 'GoLocal Test', timeZone: 'America/Denver' });
});
test('Housecall wrong company stops before requesting jobs', async () => {
  let calls = 0;
  const adapter = new Housecall(config, async () => { calls++; return response({ id: 'wrong-company' }); });
  await assert.rejects(adapter.jobs(), { code: 'WRONG_ACCOUNT' }); assert.equal(calls, 1);
});
test('Housecall rejects multi-company jobs and oversized responses', async () => {
  for (const jobs of [[{ company_id: 'other-company' }], Array.from({ length: 11 }, () => ({ company_id: config.companyId }))]) {
    const adapter = new Housecall(config, async url => response(url.endsWith('/company') ? { id: config.companyId } : { jobs }));
    await assert.rejects(adapter.jobs(), { code: jobs.length > 10 ? 'INVALID_RESPONSE' : 'WRONG_ACCOUNT' });
  }
});
test('Housecall errors omit vendor bodies and never retry', async () => {
  for (const [status, code] of [[401,'ACCESS_DENIED'],[403,'ACCESS_DENIED'],[429,'THROTTLED'],[500,'VENDOR_UNAVAILABLE']]) {
    let calls = 0;
    const adapter = new Housecall(config, async () => { calls++; return new Response('private vendor detail', { status }); });
    await assert.rejects(adapter.company(), e => e.code === code && !e.message.includes('private')); assert.equal(calls, 1);
  }
  await assert.rejects(new Housecall(config, async () => { throw Error('private-key'); }).company(), { code: 'VENDOR_UNAVAILABLE' });
  await assert.rejects(new Housecall({}).company(), { code: 'SETUP_REQUIRED' });
  await assert.rejects(new Housecall(config).read('/customers'), { code: 'INVALID_ENDPOINT' });
});
test('Housecall tool discovery excludes every demo/vendor mutation', () => {
  const cfg = getConfig({ BACKEND: 'housecall', MCP_BEARER_TOKEN: 'm'.repeat(64), ADMIN_TOKEN: 'a'.repeat(64) });
  const tools = makeTools({ config: cfg, store: { state: {} }, housecall: new Housecall(cfg.housecall) });
  assert.deepEqual(tools.map(t => t.name), ['connector_status','housecall_company','housecall_list_jobs']);
  assert(tools.every(t => t.annotations.readOnlyHint));
});
