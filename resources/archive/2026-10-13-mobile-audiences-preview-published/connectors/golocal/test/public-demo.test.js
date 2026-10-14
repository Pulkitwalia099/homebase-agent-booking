import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { PublicDemo, mountPublicDemo, publicDemoTools } from '../src/public-demo.js';

test('public demo gives three fictional options and an approved immediate confirmation', () => {
  const demo = new PublicDemo('isolated-demo-secret', () => Date.parse('2026-10-13T15:00:00Z'));
  assert.equal(demo.scope({}).state, 'needs_answers');
  assert.equal(demo.scope({ location: 'kitchen', leak_type: 'tap_drip', photo_provided: true }).state, 'ready');
  assert.equal(demo.scope({ uncontrolled_water: true }).state, 'stop');
  const listings = demo.search('84101'); assert.equal(listings.providers.length, 3);
  assert.deepEqual(listings.providers.map(p => p.priceCents), [7900, 9500, 6900]);
  assert.ok(listings.providers.every(p => p.fictional && p.ratingsAreSample));
  assert.equal(demo.search('10001').providers.length, 0);
  for (const p of listings.providers) {
    const slot = demo.availability(p.id).slots[0], offer = demo.prepare(p.id, slot.id);
    assert.throws(() => demo.confirm(offer.quoteId, false), { code: 'APPROVAL_REQUIRED' });
    const result = demo.confirm(offer.quoteId, true);
    assert.equal(result.state, 'simulated_confirmed'); assert.equal(result.amountCharged, 0); assert.equal(result.amountDueNowCents, 0); assert.equal(result.paymentTiming, 'on_site');
    assert.equal(result.priceCents, p.priceCents); assert.equal(result.creditApplied, false);
    assert.deepEqual(demo.confirm(offer.quoteId, true), result);
    assert.deepEqual(demo.booking(result.bookingId), result);
    assert.throws(() => demo.booking(offer.quoteId), { code: 'INVALID_DEMO_TOKEN' });
    assert.ok(!JSON.stringify(result).includes('customer'));
  }
});
test('public offers resist tampering, expire, and cannot cross server keys', () => {
  let now = Date.parse('2026-10-13T15:00:00Z'); const demo = new PublicDemo('secret-one', () => now);
  const offer = demo.prepare('oak', demo.availability('oak').slots[0].id);
  const [body, sig] = offer.quoteId.split('.'); const data = JSON.parse(Buffer.from(body, 'base64url')); data.priceCents = 1;
  const tampered = `${Buffer.from(JSON.stringify(data)).toString('base64url')}.${sig}`;
  assert.throws(() => demo.confirm(tampered, true), { code: 'INVALID_DEMO_TOKEN' });
  assert.throws(() => new PublicDemo('other-secret').confirm(offer.quoteId, true), { code: 'INVALID_DEMO_TOKEN' });
  now += 900001; assert.throws(() => demo.confirm(offer.quoteId, true), { code: 'QUOTE_EXPIRED' });
});
test('public HTTP/MCP exposes only fictional tools, rejects contact data and private tool names', async t => {
  const app = express(); app.use(express.json()); mountPublicDemo(app, { encryptionKey: 'test-only-secret' });
  const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (path, body) => fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' }, body: JSON.stringify(body) });
  assert.equal((await post('/demo/api/tools/request_booking', {})).status, 404);
  assert.equal((await post('/demo/api/tools/search_providers', { zip: '84101', customer: { email: 'private@example.com' } })).status, 400);
  const r = await post('/demo/mcp', { jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} });
  assert.equal(r.status, 200); const data = await r.json();
  assert.deepEqual(data.result.tools.map(t => t.name), publicDemoTools(new PublicDemo('key')).map(t => t.name));
  assert.ok(data.result.tools.every(t => t._meta.securitySchemes[0].type === 'noauth'));
});
