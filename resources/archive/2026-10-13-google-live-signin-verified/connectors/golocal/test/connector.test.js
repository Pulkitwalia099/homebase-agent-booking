import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request } from 'node:http';
import { Store } from '../src/store.js';
import { Demo } from '../src/demo.js';
import { Jobber } from '../src/jobber.js';
import { getConfig } from '../src/config.js';
import { makeTools } from '../src/tools.js';
import { createApp } from '../src/app.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'golocal-test-'));
  const store = await new Store(dir, 'a'.repeat(64)).init();
  t.after(async () => { await store.close(); await rm(dir, { recursive: true, force: true }); });
  let now = Date.parse('2026-10-11T12:00:00Z');
  const demo = new Demo(store, () => now);
  const config = getConfig({ DATA_DIR: dir, DATA_ENCRYPTION_KEY: 'a'.repeat(64), MCP_BEARER_TOKEN: 'm'.repeat(64), ADMIN_TOKEN: 'o'.repeat(64) });
  config.jobber = { clientId: 'test-id', clientSecret: 'secret', version: '2026-09-25', accountId: 'test-account', callbackUrl: 'http://localhost:8787/oauth/jobber/callback', writes: true };
  await store.transaction(s => { s.jobber = { account: { id: 'test-account', name: 'Test' }, active: true, accessToken: 'access-secret', refreshToken: 'refresh-secret', expiresAt: Date.now() + 3600000 }; });
  return { store, demo, config, dir, advance: ms => { now += ms; } };
}
const response = data => new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });

test('simulated booking lifecycle is explicitly labeled and persistent', async t => {
  const f = await fixture(t);
  const quote = await f.demo.quote('demo-plumber', f.demo.slots()[0].id);
  const booking = await f.demo.book(quote.id, 'test-key-1', true);
  assert.equal(booking.simulated, true); assert.equal(booking.amountCharged, 0);
  assert.equal((await f.demo.book(quote.id, 'test-key-1', true)).id, booking.id);
  assert.equal((await f.demo.cancel(booking.id, true)).state, 'cancelled');
  await f.store.close(); const reopened = await new Store(f.dir, 'a'.repeat(64)).init();
  assert.equal(reopened.state.bookings[booking.id].state, 'cancelled'); await reopened.close();
});
test('failed approval and expired quote create no booking', async t => {
  const f = await fixture(t); const quote = await f.demo.quote('demo-plumber', f.demo.slots()[0].id);
  await assert.rejects(f.demo.book(quote.id, 'test-key-1', false), { code: 'APPROVAL_REQUIRED' });
  f.advance(600001); await assert.rejects(f.demo.book(quote.id, 'test-key-1', true), { code: 'QUOTE_EXPIRED' });
  assert.equal(Object.keys(f.store.state.bookings).length, 0);
});
test('parallel bookings cannot take the same simulated slot', async t => {
  const f = await fixture(t); const slot = f.demo.slots()[0].id;
  const q1 = await f.demo.quote('demo-plumber', slot); const q2 = await f.demo.quote('demo-plumber', slot);
  const outcomes = await Promise.allSettled([f.demo.book(q1.id, 'test-key-1', true), f.demo.book(q2.id, 'test-key-2', true)]);
  assert.equal(outcomes.filter(o => o.status === 'fulfilled').length, 1);
  assert.equal(Object.keys(f.store.state.bookings).length, 1);
});
test('idempotency keys cannot be reused for different approved details', async t => {
  const f = await fixture(t); const q1 = await f.demo.quote('demo-plumber', f.demo.slots()[0].id);
  const q2 = await f.demo.quote('demo-plumber', f.demo.slots()[1].id);
  await f.demo.book(q1.id, 'test-key-1', true);
  await assert.rejects(f.demo.book(q2.id, 'test-key-1', true), { code: 'IDEMPOTENCY_CONFLICT' });
});
test('encrypted state contains no plaintext access or refresh credentials', async t => {
  const f = await fixture(t); const disk = await readFile(join(f.dir, 'state.enc.json'), 'utf8');
  assert(!disk.includes('access-secret')); assert(!disk.includes('refresh-secret')); assert(!disk.includes('test-account'));
});
test('store rejects a second process sharing the same directory', async t => {
  const f = await fixture(t); await assert.rejects(new Store(f.dir, 'a'.repeat(64)).init(), /locked/);
});
test('OAuth validates state, PKCE and account binding', async t => {
  const f = await fixture(t); const seen = [];
  const jobber = new Jobber(f.store, f.config.jobber, async (url, options) => {
    seen.push([url, options]);
    return url.endsWith('/token') ? response({ access_token: 'new-access', refresh_token: 'new-refresh', expires_in: 3600 }) : response({ data: { account: { id: 'test-account', name: 'Test' } } });
  });
  const url = new URL(await jobber.begin()); assert.equal(url.searchParams.get('code_challenge_method'), 'S256');
  await assert.rejects(jobber.callback('code', 'wrong-state'), { code: 'INVALID_STATE' }); assert.equal(seen.length, 0);
  await jobber.callback('code', url.searchParams.get('state')); assert(seen[0][1].body.get('code_verifier'));
  assert.equal(f.store.state.jobber.accessToken, 'new-access');
  await assert.rejects(jobber.callback('code', url.searchParams.get('state')), { code: 'INVALID_STATE' });
});
test('OAuth refuses tokens from the wrong business account', async t => {
  const f = await fixture(t); await f.store.transaction(s => { s.jobber = null; });
  const jobber = new Jobber(f.store, f.config.jobber, async url => url.endsWith('/token') ? response({ access_token: 'new-access', refresh_token: 'new-refresh', expires_in: 3600 }) : response({ data: { account: { id: 'wrong-account', name: 'Wrong' } } }));
  const url = new URL(await jobber.begin()); await assert.rejects(jobber.callback('code', url.searchParams.get('state')), { code: 'WRONG_ACCOUNT' });
  assert.equal(f.store.state.jobber, null);
});
test('parallel reads refresh a rotating token only once', async t => {
  const f = await fixture(t); await f.store.transaction(s => { s.jobber.expiresAt = 0; }); let refreshes = 0;
  const jobber = new Jobber(f.store, f.config.jobber, async url => {
    if (url.endsWith('/token')) { refreshes++; return response({ access_token: 'rotated', refresh_token: 'rotated-refresh', expires_in: 3600 }); }
    return response({ data: { account: { id: 'test-account', name: 'Test' } } });
  });
  await Promise.all([jobber.account(), jobber.account()]); assert.equal(refreshes, 1);
  assert.equal(f.store.state.jobber.refreshToken, 'rotated-refresh');
});
test('uncertain token refresh deactivates connection without replay', async t => {
  const f = await fixture(t); await f.store.transaction(s => { s.jobber.expiresAt = 0; }); let calls = 0;
  const jobber = new Jobber(f.store, f.config.jobber, async () => { calls++; throw new Error('timeout'); });
  await assert.rejects(jobber.account(), { code: 'OAUTH_UNCERTAIN' });
  await assert.rejects(jobber.account(), { code: 'NOT_CONNECTED' }); assert.equal(calls, 1);
});
test('duplicate Jobber test-client calls execute one mutation', async t => {
  const f = await fixture(t); let mutations = 0;
  const jobber = new Jobber(f.store, f.config.jobber, async () => { mutations++; return response({ data: { clientCreate: { client: { id: 'client-1', firstName: 'GoLocal', lastName: 'Connector Test' }, userErrors: [] } } }); });
  const results = await Promise.all([jobber.createTestClient('test-key-1', true), jobber.createTestClient('test-key-1', true)]);
  assert.equal(mutations, 1); assert(results.some(r => r.state === 'test_client_created'));
});
test('uncertain Jobber write is durable and never blindly retried', async t => {
  const f = await fixture(t); let mutations = 0;
  const jobber = new Jobber(f.store, f.config.jobber, async () => { mutations++; throw new Error('timeout after vendor commit'); });
  await assert.rejects(jobber.createTestClient('test-key-1', true), { code: 'VENDOR_UNCERTAIN' });
  const retry = await jobber.createTestClient('test-key-1', true); assert.equal(retry.state, 'unknown'); assert.equal(mutations, 1);
});
test('Jobber mode never exposes simulated booking or arbitrary GraphQL tools', async t => {
  const f = await fixture(t); f.config.backend = 'jobber';
  const names = makeTools({ ...f, jobber: new Jobber(f.store, f.config.jobber) }).map(t => t.name);
  assert(!names.includes('confirm_booking')); assert(!names.includes('search_providers')); assert(!names.includes('query'));
});
test('agent cannot approve its own Jobber test-client write', async t => {
  const f = await fixture(t); f.config.backend = 'jobber';
  const jobber = new Jobber(f.store, f.config.jobber, async () => response({ data: { account: { id: 'test-account', name: 'Test' } } }));
  const tools = makeTools({ ...f, jobber });
  const approval = await tools.find(t => t.name === 'prepare_jobber_test_client').fn({ idempotency_key: 'test-key-1' });
  await assert.rejects(tools.find(t => t.name === 'commit_jobber_test_client').fn({ approval_id: approval.approvalId }), { code: 'APPROVAL_REQUIRED' });
});
test('HTTP and real MCP client enforce auth, origins, inputs and tool invocation', async t => {
  const f = await fixture(t); const app = createApp({ ...f, jobber: new Jobber(f.store, f.config.jobber) });
  const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`; f.config.baseUrl = base; f.config.allowedHosts.add(new URL(base).host);
  t.after(() => new Promise(resolve => { server.closeIdleConnections(); server.close(resolve); }));
  const headers = { Authorization: `Bearer ${f.config.mcpToken}`, 'Content-Type': 'application/json' };
  assert.equal((await fetch(`${base}/api/tools`)).status, 401);
  assert.equal((await fetch(`${base}/api/tools`, { headers: { ...headers, Origin: 'https://evil.example' } })).status, 403);
  const rejectedHost = await new Promise((resolve, reject) => {
    const req = request(`${base}/api/tools`, { headers: { ...headers, Host: 'evil.example' } }, res => { res.resume(); resolve(res.statusCode); }); req.on('error', reject); req.end();
  });
  assert.equal(rejectedHost, 403);
  assert.equal((await fetch(`${base}/api/tools/confirm_booking`, { method: 'POST', headers, body: JSON.stringify({ quote_id: 'made-up', idempotency_key: 'too-short' }) })).status, 400);
  const client = new Client({ name: 'test', version: '1' });
  await client.connect(new StreamableHTTPClientTransport(new URL(`${base}/mcp`), { requestInit: { headers } }));
  const list = await client.listTools(); assert(list.tools.some(t => t.name === 'confirm_booking' && t.annotations.destructiveHint));
  const result = await client.callTool({ name: 'search_providers', arguments: { zip: '84101', service: 'plumbing_diagnostic' } });
  assert.equal(result.structuredContent.simulated, true);
  const failure = await client.callTool({ name: 'get_booking_status', arguments: { booking_id: 'missing' } }); assert.equal(failure.isError, true);
  assert.equal(JSON.parse(failure.content[0].text).code, 'NOT_FOUND');
  await client.close();
});
test('unsafe configuration fails at startup', () => {
  assert.throws(() => getConfig({}), /MCP_BEARER_TOKEN/);
  assert.throws(() => getConfig({ MCP_BEARER_TOKEN: 'a'.repeat(64), ADMIN_TOKEN: 'a'.repeat(64) }), /different/);
  assert.throws(() => getConfig({ PUBLIC_BASE_URL: 'http://public.example' }), /HTTPS/);
});
