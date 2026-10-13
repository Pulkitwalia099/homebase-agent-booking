import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod/v4';
import { PilotError } from './jobber.js';

// Public fixtures only. This service deliberately receives no account or CRM store.
const suppliers = [
  { id: 'oak', name: 'Oak Plumbing', initials: 'OP', rating: 4.9, reviewCount: 128, priceCents: 7900, distance: '2.1 mi', badge: 'Our demo pick', description: 'Kitchen taps, everyday leaks and careful diagnostics.', color: 'sage' },
  { id: 'canyon', name: 'Canyon Plumbing', initials: 'CP', rating: 4.8, reviewCount: 214, priceCents: 9500, distance: '3.4 mi', badge: 'Most sample reviews', description: 'A friendly neighborhood team for home plumbing.', color: 'clay' },
  { id: 'jordan', name: 'Jordan Home Plumbing', initials: 'JH', rating: 4.7, reviewCount: 89, priceCents: 6900, distance: '4.2 mi', badge: 'Lowest visit price', description: 'Straightforward help for taps, sinks and small leaks.', color: 'blue' },
];
const disclosure = { simulated: true, testOnly: true, amountCharged: 0, currency: 'USD', source: 'Fictional demo companies, sample ratings, example prices and appointment times. No service, charge, dispatch or supplier notification.' };
const provider = id => { const result = suppliers.find(p => p.id === id); if (!result) throw new PilotError('NOT_FOUND', 'Choose one of the demo plumbers.'); return result; };
export class PublicDemo {
  constructor(secret, now = () => Date.now()) { this.secret = secret; this.now = now; }
  seal(kind, data) {
    const body = Buffer.from(JSON.stringify({ kind, ...data })).toString('base64url');
    return `${body}.${createHmac('sha256', this.secret).update(body).digest('base64url')}`;
  }
  open(value, kind) {
    if (typeof value !== 'string' || value.length > 4000) throw new PilotError('INVALID_DEMO_TOKEN', 'Restart the demo to get a fresh offer.');
    const [body, sig, extra] = value.split('.');
    const expected = createHmac('sha256', this.secret).update(body || '').digest('base64url');
    if (extra || !sig || sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) throw new PilotError('INVALID_DEMO_TOKEN', 'This demo offer could not be verified.');
    let data; try { data = JSON.parse(Buffer.from(body, 'base64url').toString()); } catch { throw new PilotError('INVALID_DEMO_TOKEN', 'Invalid demo offer.'); }
    if (data.kind !== kind) throw new PilotError('INVALID_DEMO_TOKEN', 'Wrong demo token type.');
    return data;
  }
  status() { return { ...disclosure, backend: 'public_demo', authentication: 'none', liveBookingsSupported: false, accountDataAccessible: false, imageAnalysisSupported: false, service: 'one-hour plumbing diagnostic', zip: '84101' }; }
  scope(args) {
    if (args.uncontrolled_water) return { ...disclosure, state: 'stop', message: 'Stop the demo booking. For an active uncontrolled leak, seek urgent local help; shut off water only if safe.' };
    if (!args.location || !args.leak_type) return { ...disclosure, state: 'needs_answers', questions: ['Is it the kitchen or bathroom tap?', 'Is the tap dripping when turned off, or is water leaking underneath?'], examplePhotoUrl: 'https://getgolocal.com/demo/dripping-kitchen-tap.png', photoGuidance: 'A photo is optional. Your agent can use it as context; this demo server does not analyze images. Do not send contact details.' };
    return { ...disclosure, state: 'ready', summary: `${args.location} tap: ${args.leak_type === 'tap_drip' ? 'drips when turned off' : 'leak underneath'}. ${args.photo_provided ? 'Photo supplied to your agent.' : 'No photo supplied.'}`, service: 'plumbing_diagnostic', scope: 'One-hour diagnostic visit. Repairs, parts and repair prices require a separate quote.', nextAction: 'search_providers' };
  }
  search(zip) { return { ...disclosure, zip, providers: zip === '84101' ? suppliers.map(p => ({ ...p, fictional: true, currency: 'USD', priceLabel: 'One-hour diagnostic visit; repairs extra', ratingsAreSample: true })) : [], message: zip === '84101' ? 'Compare the demo plumbers, then choose a sample appointment.' : 'This demo covers ZIP 84101. Use that ZIP to try the example.' }; }
  availability(id) {
    provider(id);
    // Fixed local hours, independent of the visitor's time zone. These are examples.
    const day = new Date(this.now() + 86400000).toISOString().slice(0, 10);
    return { ...disclosure, providerId: id, timezone: 'America/Denver', slots: [{ id: `${day}-09`, label: '9–10 a.m.', date: day }, { id: `${day}-11`, label: '11 a.m.–noon', date: day }, { id: `${day}-14`, label: '2–3 p.m.', date: day }] };
  }
  prepare(id, slotId) {
    const p = provider(id), slot = this.availability(id).slots.find(s => s.id === slotId);
    if (!slot) throw new PilotError('SLOT_UNAVAILABLE', 'Choose a fresh demo appointment.');
    const data = { id: `demo_quote_${randomUUID()}`, providerId: id, slot, priceCents: p.priceCents, expiresAt: this.now() + 900000 };
    return { ...disclosure, ...data, quoteId: this.seal('quote', data), providerName: p.name, timezone: 'America/Denver', terms: 'One-hour diagnostic visit at the displayed example price. Repairs and parts quoted separately. Demo only; no charge.', cancellation: 'No real appointment is created. You can restart at any time.' };
  }
  confirm(token, approved) {
    if (!approved) throw new PilotError('APPROVAL_REQUIRED', 'Ask the customer to approve the named demo plumber, example price and appointment before confirming.');
    const data = this.open(token, 'quote');
    if (data.expiresAt <= this.now()) throw new PilotError('QUOTE_EXPIRED', 'The example offer expired. Get a new one.');
    // A quote always yields the same signed demo confirmation, including on retries.
    return this.booking(this.seal('booking', { ...data, id: data.id.replace('demo_quote_', 'demo_booking_'), kind: 'booking' }));
  }
  booking(token) {
    const data = this.open(token, 'booking'), p = provider(data.providerId);
    return { ...disclosure, bookingId: token, reference: data.id, state: 'simulated_confirmed', providerName: p.name, slot: data.slot, timezone: 'America/Denver', priceCents: data.priceCents, creditApplied: false, message: 'Your demo appointment is confirmed immediately. This is a simulation; no provider was contacted.' };
  }
}
export function publicDemoTools(demo) {
  const tools = [
    ['connector_status', 'Check the public GoLocal demo. Only fictional data; no account, real service or payment access.', {}, () => demo.status()],
    ['scope_request', 'Use first to scope a demo tap leak. Ask two short questions; a photo is optional and is not analyzed by this server. Stop for uncontrolled water.', { location: z.enum(['kitchen', 'bathroom']).optional(), leak_type: z.enum(['tap_drip', 'under_sink']).optional(), photo_provided: z.boolean().optional(), uncontrolled_water: z.boolean().optional() }, a => demo.scope(a)],
    ['search_providers', 'Compare three fictional plumbers with sample ratings and example diagnostic visit prices in demo ZIP 84101.', { zip: z.string().regex(/^\d{5}$/) }, a => demo.search(a.zip)],
    ['get_availability', 'Get immediate sample appointment windows for a fictional plumber. No real crew availability.', { provider_id: z.enum(['oak', 'canyon', 'jordan']) }, a => demo.availability(a.provider_id)],
    ['prepare_booking', 'Prepare the exact fictional plumber, appointment, example diagnostic price and terms for customer approval. No personal details required.', { provider_id: z.enum(['oak', 'canyon', 'jordan']), slot_id: z.string().min(1).max(50) }, a => demo.prepare(a.provider_id, a.slot_id)],
    ['confirm_booking', 'After the customer approves the exact demo offer, confirm immediately. The signed confirmation is stable on retries. No service, supplier message, payment or credit redemption.', { quote_id: z.string().max(4000), user_approved: z.boolean() }, a => demo.confirm(a.quote_id, a.user_approved)],
    ['get_booking_status', 'Verify a signed demo confirmation. Does not read any real customer booking or account history.', { booking_id: z.string().max(4000) }, a => demo.booking(a.booking_id)],
  ];
  return tools.map(([name, description, schema, fn]) => ({ name, description, schema, fn }));
}
export function makePublicDemoServer(demo) {
  const server = new McpServer({ name: 'GoLocal Demo', version: '0.2.0' }, { instructions: 'GoLocal is a PUBLIC SIMULATION. All companies, ratings, prices and times are fictional examples. No sign-in or personal details required. Scope a tap leak with two short questions; photos optional. Compare providers, get availability, prepare an exact offer, ask approval, then confirm_booking and verify get_booking_status. Confirmations are immediate simulations. Never claim a real service, payment, credit redemption or supplier acceptance. The real account-based pilot is separate.' });
  for (const t of publicDemoTools(demo)) server.registerTool(t.name, { description: t.description, inputSchema: t.schema, annotations: { readOnlyHint: !['prepare_booking', 'confirm_booking'].includes(t.name), destructiveHint: false, idempotentHint: t.name !== 'prepare_booking', openWorldHint: false }, _meta: { securitySchemes: [{ type: 'noauth' }] } }, async args => {
    try { const result = await t.fn(args); return { content: [{ type: 'text', text: JSON.stringify(result) }], structuredContent: result }; }
    catch (error) { return { isError: true, content: [{ type: 'text', text: JSON.stringify({ code: error instanceof PilotError ? error.code : 'DEMO_ERROR', message: error instanceof PilotError ? error.message : 'Demo temporarily unavailable.' }) }] }; }
  });
  return server;
}
export function mountPublicDemo(app, config) {
  const demo = new PublicDemo(config.encryptionKey);
  app.post('/demo/mcp', async (req, res, next) => {
    const server = makePublicDemoServer(demo), transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    res.on('close', () => { void transport.close(); void server.close(); });
    try { await server.connect(transport); await transport.handleRequest(req, res, req.body); } catch (error) { next(error); }
  });
  app.all('/demo/mcp', (req, res) => res.status(405).set('Allow', 'POST').json({ error: 'Use Streamable HTTP POST.' }));
  app.post('/demo/api/tools/:name', async (req, res, next) => {
    const tool = publicDemoTools(demo).find(t => t.name === req.params.name);
    if (!tool) return res.status(404).json({ code: 'NOT_FOUND', message: 'Unknown demo tool.' });
    const args = z.object(tool.schema).strict().safeParse(req.body);
    if (!args.success) return res.status(400).json({ code: 'INVALID_INPUT', message: 'Invalid demo input. Do not send personal details.' });
    try { res.json(await tool.fn(args.data)); } catch (error) { next(error); }
  });
}
