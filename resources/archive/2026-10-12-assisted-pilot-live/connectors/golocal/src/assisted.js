import { randomUUID, createHash } from 'node:crypto';
import { z } from 'zod/v4';
import { PilotError } from './jobber.js';

const text = (max) => z.string().trim().min(1).max(max);
export const assistedSchemas = {
  supplier: z.object({ name: text(100), description: text(500), zips: z.array(z.string().regex(/^\d{5}$/)).min(1).max(100),
    price_cents: z.number().int().min(1).max(1000000), timezone: text(60), cancellation_terms: text(500),
    response_hours: z.number().int().min(1).max(48), software: z.string().trim().max(100).default(''), terms_accepted: z.literal(true) }).strict(),
  search: z.object({ zip: z.string().regex(/^\d{5}$/), service: z.literal('plumbing_diagnostic') }).strict(),
  offer: z.object({ provider_id: text(100), zip: z.string().regex(/^\d{5}$/), requested_start: z.iso.datetime({ offset: true }) }).strict(),
  request: z.object({ quote_id: text(100), idempotency_key: z.string().regex(/^[a-zA-Z0-9_-]{8,80}$/), user_approved: z.literal(true),
    customer: z.object({ name: text(100), phone: text(40), street: text(200), city: text(100), notes: z.string().trim().max(1000).default('') }).strict() }).strict(),
};

// Assisted requests have no vendor side effects. All decisions and retry keys are durable
// and serialized by the existing single-process encrypted Store.
export class Assisted {
  constructor(store, config, now = Date.now) { this.store = store; this.config = config; this.now = now; }
  state(s) {
    s.assisted ??= { version: 1, users: {}, suppliers: {}, connections: {}, quotes: {}, requests: {}, operations: {}, audit: [] };
    return s.assisted;
  }
  actor(a, id) {
    const user = a.users[id];
    if (!user?.verified || user.disabled) throw new PilotError('ACCOUNT_REQUIRED', 'Sign in to your verified GoLocal account.');
    return user;
  }
  async ensureUser(user) {
    if (!user?.id || !user.emailVerified) throw new PilotError('ACCOUNT_REQUIRED', 'Verify your email to continue.');
    return this.store.transaction(s => {
      const a = this.state(s), old = a.users[user.id];
      if (old && old.email !== user.email.toLowerCase()) throw new PilotError('ACCOUNT_CHANGED', 'Account email changed; contact the operator.');
      return a.users[user.id] = { ...old, id: user.id, email: user.email.toLowerCase(), name: user.name, verified: true, createdAt: old?.createdAt || this.now() };
    });
  }
  audit(a, actor, action, recordId) { a.audit.push({ id: randomUUID(), at: this.now(), actor, action, recordId }); }
  notify(a,r,recipient,type){
    if(!this.config.accounts?.notifications)return;
    const email=a.users[recipient]?.email;if(!email)return;
    a.notifications??={};const id=randomUUID();
    a.notifications[id]={id,state:'pending',createdAt:this.now(),requestId:r.id,message:{id,type,email,url:`${this.config.baseUrl}/assisted/bookings/${r.id}`,supplier:r.offer.providerName,state:r.state}};
  }
  async feedback(actorId,input){
    const data=z.object({role:z.enum(['customer','supplier']),rating:z.number().int().min(1).max(5),comment:text(2000)}).strict().parse(input);
    return this.store.transaction(s=>{const a=this.state(s);this.actor(a,actorId);if(data.role==='supplier'&&!Object.values(a.suppliers).some(p=>p.ownerId===actorId))throw new PilotError('ACCOUNT_REQUIRED','Register your supplier profile first.');a.feedback??=[];const item={id:randomUUID(),userId:actorId,createdAt:this.now(),...data};a.feedback.push(item);return item;});
  }
  async onboard(actorId, input) {
    const data = assistedSchemas.supplier.parse(input);
    try { new Intl.DateTimeFormat('en', { timeZone: data.timezone }).format(); }
    catch { throw new PilotError('INVALID_TIMEZONE', 'Choose a valid business time zone.'); }
    return this.store.transaction(s => {
      const a = this.state(s); this.actor(a, actorId);
      if (Object.values(a.suppliers).some(p => p.ownerId === actorId)) throw new PilotError('ALREADY_REGISTERED', 'Your supplier profile already exists.');
      const id = `supplier_${randomUUID()}`, connectionId = `connection_${randomUUID()}`;
      const supplier = { id, ownerId: actorId, connectionId, revision: 1, state: 'pending_review', ...data,
        service: 'plumbing_diagnostic', currency: 'USD', createdAt: this.now(), termsVersion: 'assisted-pilot-2026-10-12' };
      a.suppliers[id] = supplier;
      a.connections[connectionId] = { id: connectionId, supplierId: id, route: 'assisted', status: 'pending_review',
        capabilities: { requestAcceptance: true, liveAvailability: false, automaticBooking: false, payments: false } };
      this.audit(a, actorId, 'supplier_registered', id); return supplier;
    });
  }
  async activate(id, verified) {
    if (verified !== true) throw new PilotError('REVIEW_REQUIRED', 'Review business authority, service terms and participation before activation.');
    return this.store.transaction(s => {
      const a = this.state(s), p = a.suppliers[id];
      if (!p || !['pending_review','paused'].includes(p.state)) throw new PilotError('NOT_FOUND', 'Supplier is not awaiting review or reactivation.');
      p.state = 'active'; p.reviewedAt = this.now(); a.connections[p.connectionId].status = 'ready';
      this.audit(a, 'operator', 'supplier_activated', id); return p;
    });
  }
  async updateSupplier(actorId, id, input) {
    const data = assistedSchemas.supplier.parse(input);
    try { new Intl.DateTimeFormat('en',{timeZone:data.timezone}).format(); } catch { throw new PilotError('INVALID_TIMEZONE','Choose a valid business time zone.'); }
    return this.store.transaction(s => {
      const a=this.state(s);this.actor(a,actorId);const p=a.suppliers[id];
      if(!p||p.ownerId!==actorId)throw new PilotError('NOT_FOUND','Supplier not found.');
      Object.assign(p,data,{revision:p.revision+1,state:'pending_review'});a.connections[p.connectionId].status='pending_review';
      this.audit(a,actorId,'supplier_updated',id);return p;
    });
  }
  async pause(actorId, id) {
    return this.store.transaction(s => {
      const a = this.state(s); this.actor(a, actorId); const p = a.suppliers[id];
      if (!p || p.ownerId !== actorId) throw new PilotError('NOT_FOUND', 'Supplier not found.');
      if (p.state !== 'active') throw new PilotError('INVALID_STATE', 'Only an active supplier can be paused.');
      p.state = 'paused'; a.connections[p.connectionId].status = 'paused';
      this.audit(a, actorId, 'supplier_paused', id); return p;
    });
  }
  providers(actorId, input) {
    const {zip, service} = assistedSchemas.search.parse(input), a = this.state(this.store.state); this.actor(a, actorId);
    return { testOnly:Boolean(this.config.assistedTestMode),providers: Object.values(a.suppliers).filter(p => p.state === 'active' && p.service === service && p.zips.includes(zip) && a.connections[p.connectionId]?.status === 'ready').map(p => ({
      id: p.id, name: p.name, service: p.service, scope: p.description, priceCents: p.price_cents, currency: p.currency,
      timezone: p.timezone, cancellationTerms: p.cancellation_terms, responseHours: p.response_hours,
      bookingMode: 'supplier_acceptance', liveAvailability: false, paymentCollection: 'supplier' })) };
  }
  offerView(q) { return { quoteId: q.id, providerId: q.supplierId, providerName: q.supplierName, service: q.service, scope: q.scope,
    zip: q.zip, requestedStart: q.start, requestedEnd: q.end, timezone: q.timezone, priceCents: q.priceCents, currency: 'USD',
    cancellationTerms: q.cancellationTerms, expiresAt: q.expiresAt, responseHours: q.responseHours,
    bookingMode: 'supplier_acceptance', availabilityVerified: false, paymentCollection: 'supplier',
    testOnly:Boolean(q.testOnly),terms: q.testOnly?'Test request only. Prices and times are examples for this usability pilot. Acceptance does not arrange an actual service or collect payment.':'Request a one-hour diagnostic visit. Repairs are quoted separately. Your requested time requires supplier acceptance. No payment is collected by GoLocal.' }; }
  async offer(actorId, input) {
    const data = assistedSchemas.offer.parse(input), start = Date.parse(data.requested_start);
    if (start <= this.now() + 3600000 || start > this.now() + 90 * 86400000) throw new PilotError('INVALID_TIME', 'Request a time at least one hour ahead and within 90 days.');
    return this.store.transaction(s => {
      const a = this.state(s); this.actor(a, actorId); const p = a.suppliers[data.provider_id];
      if (!p || p.state !== 'active' || !p.zips.includes(data.zip) || a.connections[p.connectionId]?.status !== 'ready') throw new PilotError('SUPPLIER_UNAVAILABLE', 'This supplier is not accepting requests in that ZIP.');
      const q = { id: `quote_${randomUUID()}`,testOnly:Boolean(this.config.assistedTestMode),customerId: actorId, supplierId: p.id, connectionId: p.connectionId, revision: p.revision,
        supplierName: p.name, service: p.service, scope: p.description, zip: data.zip, start: new Date(start).toISOString(),
        end: new Date(start + 3600000).toISOString(), timezone: p.timezone, priceCents: p.price_cents,
        cancellationTerms: p.cancellation_terms, responseHours: p.response_hours, expiresAt: this.now() + 900000 };
      a.quotes[q.id] = q; return this.offerView(q);
    });
  }
  expire(a) {
    for (const r of Object.values(a.requests)) if (r.state === 'pending_supplier' && r.responseDeadline <= this.now()) {
      r.state = 'expired'; r.updatedAt = this.now(); this.audit(a, 'system', 'request_expired', r.id);
      this.notify(a,r,r.customerId,'booking_decided');
    }
  }
  requestView(r) { return { bookingId: r.id, providerId: r.supplierId, providerName: r.offer.providerName, state: r.state,
    offer: r.offer, customer: r.customer, responseDeadline: r.responseDeadline, createdAt: r.createdAt, updatedAt: r.updatedAt,
    reason: r.reason || null, confirmedAt: r.confirmedAt || null, confirmationSource: r.state === 'confirmed' ? 'supplier_portal_acceptance' : null,
    testOnly:Boolean(r.offer.testOnly),vendorSync: 'not_connected', amountCharged: 0, statusUrl: `${this.config.baseUrl}/assisted/bookings/${r.id}` }; }
  async request(actorId, input) {
    const data = assistedSchemas.request.parse(input), fingerprint = createHash('sha256').update(JSON.stringify(data)).digest('hex');
    return this.store.transaction(s => {
      const a = this.state(s), user = this.actor(a, actorId); this.expire(a);
      const opKey = `${actorId}:request:${data.idempotency_key}`, old = a.operations[opKey];
      if (old) {
        if (old.fingerprint !== fingerprint) throw new PilotError('IDEMPOTENCY_CONFLICT', 'This retry key belongs to different booking details.');
        return this.requestView(a.requests[old.requestId]);
      }
      const q = a.quotes[data.quote_id];
      if (!q || q.customerId !== actorId) throw new PilotError('NOT_FOUND', 'Offer not found.');
      const prior = Object.values(a.requests).find(r => r.quoteId === q.id);
      if (prior) throw new PilotError('OFFER_USED', 'This offer already has a booking request. Use its original retry key or obtain a new offer.');
      if (q.expiresAt <= this.now()) throw new PilotError('QUOTE_EXPIRED', 'Review a fresh offer before requesting a booking.');
      const p = a.suppliers[q.supplierId], connection = a.connections[q.connectionId];
      if (!p || p.state !== 'active' || p.revision !== q.revision || connection?.status !== 'ready' || connection.supplierId !== p.id) throw new PilotError('SUPPLIER_UNAVAILABLE', 'Supplier availability or terms changed. Review a fresh offer.');
      const deadline = Math.min(Date.parse(q.start), this.now() + q.responseHours * 3600000);
      if (deadline <= this.now()) throw new PilotError('INVALID_TIME', 'Requested time has passed.');
      const r = { id: `booking_${randomUUID()}`, customerId: actorId, supplierId: p.id, connectionId: q.connectionId,
        quoteId: q.id, state: 'pending_supplier', offer: this.offerView(q), customer: { ...data.customer, email: user.email, zip: q.zip },
        approval: { approvedAt: this.now(), customerId: actorId, quoteId: q.id, revision: q.revision },
        responseDeadline: deadline, createdAt: this.now(), updatedAt: this.now() };
      a.requests[r.id] = r; a.operations[opKey] = { fingerprint, requestId: r.id };
      this.notify(a,r,p.ownerId,'booking_pending');
      this.audit(a, actorId, 'booking_requested', r.id); return this.requestView(r);
    });
  }
  async status(actorId, id) {
    return this.store.transaction(s => {
      const a = this.state(s); this.actor(a, actorId); this.expire(a); const r = a.requests[id];
      if (!r || (r.customerId !== actorId && a.suppliers[r.supplierId]?.ownerId !== actorId)) throw new PilotError('NOT_FOUND', 'Booking request not found.');
      return this.requestView(r);
    });
  }
  async dashboard(actorId) {
    return this.store.transaction(s => {
      const a = this.state(s), user = this.actor(a, actorId); this.expire(a);
      const suppliers = Object.values(a.suppliers).filter(p => p.ownerId === actorId);
      return { user, suppliers, customerBookings: Object.values(a.requests).filter(r => r.customerId === actorId).map(r => this.requestView(r)),
        supplierBookings: Object.values(a.requests).filter(r => suppliers.some(p => p.id === r.supplierId)).map(r => this.requestView(r)) };
    });
  }
  async decide(actorId, id, decision, reason = '') {
    if (!['accept','decline'].includes(decision)) throw new PilotError('INVALID_DECISION', 'Choose accept or decline.');
    if (decision === 'decline') reason = text(500).parse(reason);
    return this.store.transaction(s => {
      const a = this.state(s); this.actor(a, actorId); this.expire(a); const r = a.requests[id];
      if (!r || a.suppliers[r.supplierId]?.ownerId !== actorId) throw new PilotError('NOT_FOUND', 'Booking request not found.');
      const target = decision === 'accept' ? 'confirmed' : 'declined';
      if (r.state === target) return this.requestView(r);
      if (r.state !== 'pending_supplier') throw new PilotError('DECISION_CONFLICT', 'This request has already been decided, withdrawn or expired.');
      r.state = target; r.updatedAt = this.now();
      if (decision === 'accept') r.confirmedAt = this.now(); else r.reason = reason;
      this.notify(a,r,r.customerId,'booking_decided');
      this.audit(a, actorId, `supplier_${decision}`, r.id); return this.requestView(r);
    });
  }
  async withdraw(actorId, id) {
    return this.store.transaction(s => {
      const a = this.state(s); this.actor(a, actorId); this.expire(a); const r = a.requests[id];
      if (!r || r.customerId !== actorId) throw new PilotError('NOT_FOUND', 'Booking request not found.');
      if (r.state === 'withdrawn') return this.requestView(r);
      if (r.state !== 'pending_supplier') throw new PilotError('INVALID_STATE', 'Only a pending request can be withdrawn. Contact the supplier for a confirmed booking change.');
      r.state = 'withdrawn'; r.updatedAt = this.now(); this.audit(a, actorId, 'request_withdrawn', r.id); this.notify(a,r,a.suppliers[r.supplierId].ownerId,'booking_decided'); return this.requestView(r);
    });
  }
}

// Reject ambiguous/nonexistent wall times rather than guessing at daylight-saving changes.
export function wallTimeToISO(value, timezone) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value || '')) throw new PilotError('INVALID_TIME', 'Choose a date and time.');
  const guess = Date.parse(value + ':00Z'), format = new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23' });
  const wall = time => { const parts = Object.fromEntries(format.formatToParts(time).map(p => [p.type,p.value])); return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`; };
  const offsets = new Set([-86400000,0,86400000].map(delta => Date.parse(wall(guess + delta) + ':00Z') - (guess + delta)));
  const matches = [...offsets].map(offset => guess - offset).filter(time => wall(time) === value);
  if (matches.length !== 1) throw new PilotError('INVALID_TIME', 'Choose an unambiguous time outside the daylight-saving clock change.');
  return new Date(matches[0]).toISOString();
}
