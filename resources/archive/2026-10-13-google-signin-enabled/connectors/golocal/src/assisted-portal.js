import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { fromNodeHeaders } from 'better-auth/node';
import { PilotError } from './jobber.js';
import { wallTimeToISO } from './assisted.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = cents => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100);
const time = (value,zone) => new Intl.DateTimeFormat('en-US',{dateStyle:'full',timeStyle:'short',timeZone:zone}).format(new Date(value));
const safeReturn = value => value==='/assisted/supplier/new' || /^\/assisted\/(agent\/consent\/[a-f0-9]{64}|bookings\/booking_[a-f0-9-]{36}|suppliers\/supplier_[a-f0-9-]{36}\/edit)$/.test(value||'') ? value : '/assisted';
const baseShell = (title,body,footer) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(title)} · GoLocal</title><style>
body{font:16px/1.55 system-ui;color:#173e34;background:#f6f3eb;margin:0}main{max-width:1000px;margin:auto;padding:28px 22px 70px}header{display:flex;justify-content:space-between;gap:20px;align-items:center;border-bottom:1px solid #cdd7d0;padding-bottom:18px;margin-bottom:28px}header a{font-weight:650;text-decoration:none}.brand{font-size:24px}h1{line-height:1.15;font-size:36px;letter-spacing:-1px}h2{font-size:23px}.muted{color:#52695f}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:20px}.card{background:#fff;padding:22px;border:1px solid #d8e0d8;border-radius:12px;margin:16px 0;overflow-wrap:anywhere}label{display:block;margin:14px 0}input,textarea,select,button{font:inherit;box-sizing:border-box;max-width:100%}input:not([type=checkbox]),textarea,select{display:block;width:100%;padding:10px;border:1px solid #91a69a;border-radius:6px}input[type=checkbox]{margin-right:8px}button,.button{display:inline-block;padding:11px 17px;background:#174e3e;color:white;border:0;border-radius:6px;text-decoration:none;cursor:pointer;margin:6px 8px 6px 0}.secondary{background:#e6ede6;color:#173e34}a{color:#175b46}nav{display:flex;gap:16px;flex-wrap:wrap}dl{display:grid;grid-template-columns:minmax(100px,1fr) 2fr;gap:8px}dt{font-weight:600}dd{margin:0;overflow-wrap:anywhere}.state{display:inline-block;background:#edf2eb;padding:4px 10px;border-radius:5px;font-weight:600}.error{color:#8b2921}small{font-size:14px}form{margin:0}footer{margin-top:35px;color:#52695f}@media(max-width:500px){h1{font-size:28px}main{padding:20px 16px}dl{display:block}dt{margin-top:12px}}
</style></head><body><main><header><a class="brand" href="/assisted">GoLocal</a><nav><a href="/assisted">My account</a><a href="/assisted/providers">Find a plumber</a><a href="/assisted/supplier/new">For suppliers</a></nav></header><h1>${esc(title)}</h1>${body}<footer>${esc(footer)}</footer></main></body></html>`;

export function mountAssistedPortal(app, {config,store,assisted,accounts,agentOAuth,operator,operatorCsrf}) {
  const shell=(title,body)=>baseShell(title,(config.assistedTestMode?'<aside class="card"><strong>Test pilot — no actual service or payment.</strong><p>Try the booking flow and share feedback. Accepting a request confirms this test only.</p></aside>':'')+body,config.assistedTestMode?'GoLocal usability pilot. No service is dispatched, no CRM job is created and no payment is collected.':'Assisted plumbing pilot. Your time requires supplier acceptance. Payments and CRM synchronization are handled outside GoLocal.');
  const loginLimits=new Map();
  const wrap = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);
  const checksum = session => createHmac('sha256',config.accounts.secret).update(session.session.id).digest('hex');
  const signedIn = wrap(async(req,res,next) => {
    const session = await accounts.auth.api.getSession({headers:fromNodeHeaders(req.headers)});
    if (!session?.user?.emailVerified) return res.redirect(303,`/assisted/login?return_to=${encodeURIComponent(safeReturn(req.path))}`);
    await assisted.ensureUser(session.user); req.actor={userId:session.user.id};req.accountSession=session;req.assistedCsrf=checksum(session);next();
  });
  const csrf = (req,res,next) => {
    const submitted=req.body?.csrf, expected=req.assistedCsrf;
    if(req.get('origin')!==config.baseUrl || typeof submitted!=='string' || submitted.length!==expected.length || !timingSafeEqual(Buffer.from(submitted),Buffer.from(expected))) return res.status(403).send(shell('Request rejected','<p>Refresh this page and try again.</p>'));
    next();
  };
  const hidden = req => `<input type="hidden" name="csrf" value="${esc(req.assistedCsrf)}">`;
  const loginForm = returnTo => {
    const hiddenReturn=`<input type="hidden" name="return_to" value="${esc(safeReturn(returnTo))}">`;
    const emailForm=`<form method="post" action="/assisted/login" class="card">${hiddenReturn}<label>Your name<input name="name" required maxlength="100" autocomplete="name"></label><label>Email<input name="email" type="email" required maxlength="254" autocomplete="email"></label><button>Send sign-in link</button></form>`;
    return config.accounts.google?.enabled
      ? `<p>Use one account for your bookings and supplier profile.</p><form method="post" action="/assisted/login/google" class="card">${hiddenReturn}<button>Continue with Google</button><p class="muted">Choose your Google account to sign in. We only request your name, email and profile.</p></form><details><summary>Continue with email</summary><p>We’ll email a single-use sign-in link.</p>${emailForm}</details>`
      : `<p>Use one account for your bookings and supplier profile. We’ll email a single-use sign-in link.</p>${emailForm}`;
  };
  const details = r => `<p class="state">${esc(r.state.replaceAll('_',' '))}</p><dl><dt>Supplier</dt><dd>${esc(r.providerName)}</dd><dt>Diagnostic visit</dt><dd>${money(r.offer.priceCents)} · repairs quoted separately</dd><dt>Requested time</dt><dd>${esc(time(r.offer.requestedStart,r.offer.timezone))} — one hour (${esc(r.offer.timezone)})</dd><dt>Scope</dt><dd>${esc(r.offer.scope)}</dd><dt>Cancellation terms</dt><dd>${esc(r.offer.cancellationTerms)}</dd><dt>Customer</dt><dd>${esc(r.customer.name)}</dd><dt>Contact</dt><dd>${esc(r.customer.email)} · ${esc(r.customer.phone)}</dd><dt>Address</dt><dd>${esc(r.customer.street)}, ${esc(r.customer.city)}, ${esc(r.customer.zip)}</dd><dt>Notes</dt><dd>${esc(r.customer.notes)||'None'}</dd></dl>${r.reason?`<p>Supplier response: ${esc(r.reason)}</p>`:''}<p>No payment collected by GoLocal. ${r.state==='pending_supplier'?`Supplier response due ${esc(time(r.responseDeadline,r.offer.timezone))}.`:r.state==='confirmed'?(r.testOnly?'The supplier accepted this test request only. No actual service is arranged.':'The supplier accepted this exact price, scope and requested time.') : ''}</p>`;
  const rows = (bookings,label) => `<h2>${label}</h2>${bookings.length?bookings.map(r=>`<article class="card"><span class="state">${esc(r.state.replaceAll('_',' '))}</span><h3>${esc(r.providerName)}</h3><p>${esc(time(r.offer.requestedStart,r.offer.timezone))} · ${money(r.offer.priceCents)}</p><a href="/assisted/bookings/${encodeURIComponent(r.bookingId)}">View request</a></article>`).join(''):'<p>No requests yet.</p>'}`;

  app.get('/assisted/login',(req,res)=>res.send(shell('Sign in to GoLocal',`${req.query.error?'<p class="error">Sign-in did not complete. Try again or continue with email.</p>':''}${loginForm(req.query.return_to)}`)));
  app.post('/assisted/login/google',wrap(async(req,res)=>{
    if(req.get('origin')!==config.baseUrl)return res.status(403).send(shell('Request rejected','<p>Open the GoLocal sign-in page to continue.</p>'));
    if(!config.accounts.google?.enabled)return res.status(503).send(shell('Google sign-in unavailable',loginForm(req.body.return_to)));
    const now=Date.now(),key=createHmac('sha256',config.accounts.secret).update(`google:${req.ip}`).digest('hex');
    for(const [k,v]of loginLimits)if(v.until<=now)loginLimits.delete(k);
    const limit=loginLimits.get(key)||{n:0,until:now+60000};
    if(++limit.n>10||loginLimits.size>1000)return res.status(429).send(shell('Please wait','<p>Wait a minute before trying Google sign-in again.</p>'));
    loginLimits.set(key,limit);
    const returnTo=safeReturn(req.body.return_to),callbackURL=config.baseUrl+returnTo;
    try {
      const response=await accounts.auth.api.signInSocial({body:{provider:'google',callbackURL,newUserCallbackURL:callbackURL,errorCallbackURL:config.baseUrl+'/assisted/login?'+new URLSearchParams({error:'google',return_to:returnTo})},headers:fromNodeHeaders(req.headers),asResponse:true});
      const data=await response.json(),url=new URL(data.url);
      if(!response.ok||url.origin!=='https://accounts.google.com'||url.pathname!=='/o/oauth2/v2/auth')throw new Error('Google sign-in could not start.');
      const cookies=response.headers.getSetCookie();if(cookies.length)res.set('Set-Cookie',cookies);
      res.redirect(303,url.toString());
    } catch {
      res.status(503).send(shell('Google sign-in unavailable',`<p class="error">Please try again or continue with email.</p>${loginForm(returnTo)}`));
    }
  }));
  app.post('/assisted/login',wrap(async(req,res)=>{
    if(req.get('origin')!==config.baseUrl) return res.status(403).send(shell('Request rejected','<p>Open the GoLocal sign-in page to continue.</p>'));
    const email=String(req.body.email||'').trim().toLowerCase(),name=String(req.body.name||'').trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||!name||name.length>100) return res.status(400).send(shell('Check your details',loginForm(req.body.return_to)));
    const now=Date.now(),key=createHmac('sha256',config.accounts.secret).update(`${req.ip}:${email}`).digest('hex');
    for(const [k,v]of loginLimits)if(v.until<=now)loginLimits.delete(k);
    const limit=loginLimits.get(key)||{n:0,until:now+60000};
    if(++limit.n>5||loginLimits.size>1000)return res.status(429).send(shell('Please wait','<p>Wait a minute before requesting another sign-in link.</p>'));
    loginLimits.set(key,limit);
    await accounts.auth.api.signInMagicLink({body:{email,name,callbackURL:config.baseUrl+safeReturn(req.body.return_to),errorCallbackURL:config.baseUrl+'/assisted/login'},headers:fromNodeHeaders(req.headers)});
    res.send(shell('Check your email','<p>Your sign-in link is valid for 15 minutes and can be used once. You can close this page.</p>'));
  }));
  app.get('/assisted',signedIn,wrap(async(req,res)=>{
    const d=await assisted.dashboard(req.actor.userId);
    res.send(shell(`Welcome, ${d.user.name}`,`<p>Choose a participating plumber or manage your supplier requests.</p><a class="button" href="/assisted/providers">Find a plumber</a><div class="grid"><section>${rows(d.customerBookings,'Your booking requests')}</section><section><h2>Your supplier account</h2>${d.suppliers.map(p=>`<article class="card"><h3>${esc(p.name)}</h3><p class="state">${esc(p.state.replaceAll('_',' '))}</p><p>${esc(p.description)}</p><p>${money(p.price_cents)} diagnostic visit · ${esc(p.zips.join(', '))}</p>${p.state==='pending_review'?'<p>Our operator will review your business authority, terms and participation before activation.</p>':p.state==='active'?`<form method="post" action="/assisted/suppliers/${p.id}/pause">${hidden(req)}<button class="secondary">Pause new requests</button></form>`:'<p>New requests are paused. Existing requests remain accessible. Contact the operator to reactivate.</p>'}</article>`).join('')||'<p><a href="/assisted/supplier/new">Register your business</a></p>'}${rows(d.supplierBookings,'Requests for your business')}</section></div><hr><p><a href="/assisted/feedback">Share feedback on this flow</a></p><form method="post" action="/assisted/disconnect-agents">${hidden(req)}<button class="secondary">Disconnect my agents</button></form><form method="post" action="/assisted/logout">${hidden(req)}<button class="secondary">Sign out</button></form>`));
  }));
  app.post('/assisted/logout',signedIn,csrf,wrap(async(req,res)=>{
    const response=await accounts.auth.api.signOut({headers:fromNodeHeaders(req.headers),asResponse:true});
    const cookies=response.headers.getSetCookie();if(cookies.length)res.set('Set-Cookie',cookies);res.redirect(303,'/assisted/login');
  }));
  app.post('/assisted/disconnect-agents',signedIn,csrf,wrap(async(req,res)=>{await agentOAuth.revokeUser(req.actor.userId);res.send(shell('Agents disconnected','<p>Your agent grants have been revoked. Your account and bookings remain available.</p><a href="/assisted">Back to account</a>'));}));

  app.get('/assisted/supplier/new',signedIn,wrap(async(req,res)=>{
    const existing=(await assisted.dashboard(req.actor.userId)).suppliers[0];if(existing)return res.redirect(303,`/assisted/suppliers/${existing.id}/edit`);
    res.send(shell('Register your plumbing business',`<p>Start with one diagnostic service. Your business will appear in search after operator review.</p><form class="card" method="post" action="/assisted/suppliers">${hidden(req)}<label>Business name<input name="name" required maxlength="100"></label><label>What the diagnostic visit covers<textarea name="description" required maxlength="500"></textarea></label><label>Service ZIP codes<input name="zips" required placeholder="84101, 84102"></label><label>Diagnostic visit price (USD)<input type="number" name="price" step="0.01" min="0.01" max="10000" required></label><label>Business time zone<select name="timezone"><option value="America/Denver">Mountain — America/Denver</option><option value="America/Los_Angeles">Pacific — America/Los_Angeles</option><option value="America/Chicago">Central — America/Chicago</option><option value="America/New_York">Eastern — America/New_York</option></select></label><label>Cancellation terms<textarea name="cancellation_terms" required maxlength="500"></textarea></label><label>Response deadline (hours)<input type="number" name="response_hours" value="24" min="1" max="48" required></label><label>Current business software (optional)<input name="software" maxlength="100"></label><p class="muted">Software information does not connect your CRM. You will review and accept requests here.</p><label><input type="checkbox" name="terms_accepted" value="yes" required>I am authorized to represent this business. I agree to list these services and review requests under these prices and terms. ${config.assistedTestMode?'All requests in this pilot are tests; acceptance does not commit my business to an actual service visit.':'Accepting a request commits my business to its exact scope, price and time.'}</label><button>Submit for review</button></form>`));
  }));
  app.get('/assisted/suppliers/:id/edit',signedIn,wrap(async(req,res)=>{
    const p=(await assisted.dashboard(req.actor.userId)).suppliers.find(p=>p.id===req.params.id);if(!p)throw new PilotError('NOT_FOUND','Supplier not found.');
    res.send(shell('Update your supplier profile',`<p>Changes remove your listing until operator review. Existing booking requests retain their original approved terms.</p><form class="card" method="post" action="/assisted/suppliers/${p.id}/update">${hidden(req)}<label>Business name<input name="name" value="${esc(p.name)}" required maxlength="100"></label><label>What the diagnostic visit covers<textarea name="description" required maxlength="500">${esc(p.description)}</textarea></label><label>Service ZIP codes<input name="zips" value="${esc(p.zips.join(', '))}" required></label><label>Diagnostic visit price (USD)<input type="number" name="price" step="0.01" min="0.01" max="10000" value="${(p.price_cents/100).toFixed(2)}" required></label><label>Business time zone<select name="timezone">${['America/Denver','America/Los_Angeles','America/Chicago','America/New_York'].map(z=>`<option value="${z}" ${z===p.timezone?'selected':''}>${z}</option>`).join('')}</select></label><label>Cancellation terms<textarea name="cancellation_terms" required maxlength="500">${esc(p.cancellation_terms)}</textarea></label><label>Response deadline (hours)<input type="number" name="response_hours" min="1" max="48" value="${p.response_hours}" required></label><label>Business software (not connected)<input name="software" value="${esc(p.software)}" maxlength="100"></label><label><input type="checkbox" name="terms_accepted" value="yes" required>I am authorized to update this business and agree to these service and participation terms.</label><button>Submit changes for review</button></form>`));
  }));
  app.post('/assisted/suppliers/:id/update',signedIn,csrf,wrap(async(req,res)=>{
    const price=String(req.body.price||'');if(!/^\d+(\.\d{1,2})?$/.test(price))throw new PilotError('INVALID_PRICE','Enter a price with at most two decimal places.');
    const [whole,fraction='']=price.split('.');
    await assisted.updateSupplier(req.actor.userId,req.params.id,{name:req.body.name,description:req.body.description,zips:[...new Set(String(req.body.zips||'').split(/[\s,]+/).filter(Boolean))],
      price_cents:Number(whole)*100+Number(fraction.padEnd(2,'0')),timezone:req.body.timezone,cancellation_terms:req.body.cancellation_terms,response_hours:Number(req.body.response_hours),software:req.body.software||'',terms_accepted:req.body.terms_accepted==='yes'});
    res.redirect(303,'/assisted');
  }));
  app.post('/assisted/suppliers',signedIn,csrf,wrap(async(req,res)=>{
    const price=String(req.body.price||'');if(!/^\d+(\.\d{1,2})?$/.test(price))throw new PilotError('INVALID_PRICE','Enter a price with at most two decimal places.');
    const [whole,fraction='']=price.split('.');
    await assisted.onboard(req.actor.userId,{name:req.body.name,description:req.body.description,zips:[...new Set(String(req.body.zips||'').split(/[\s,]+/).filter(Boolean))],
      price_cents:Number(whole)*100+Number(fraction.padEnd(2,'0')),timezone:req.body.timezone,cancellation_terms:req.body.cancellation_terms,response_hours:Number(req.body.response_hours),software:req.body.software||'',terms_accepted:req.body.terms_accepted==='yes'});
    res.redirect(303,'/assisted');
  }));
  app.post('/assisted/suppliers/:id/pause',signedIn,csrf,wrap(async(req,res)=>{await assisted.pause(req.actor.userId,req.params.id);res.redirect(303,'/assisted');}));
  app.get('/assisted/providers',signedIn,(req,res)=>{
    const zip=String(req.query.zip||'');const providers=zip?assisted.providers(req.actor.userId,{zip,service:'plumbing_diagnostic'}).providers:[];
    res.send(shell('Find a plumber',`<p>Compare diagnostic visits from participating suppliers. Times are requests until accepted.</p><form method="get" action="/assisted/providers"><label>Service ZIP<input name="zip" inputmode="numeric" pattern="[0-9]{5}" value="${esc(zip)}" required></label><button>Find suppliers</button></form>${zip&&!providers.length?'<p>No participating suppliers are available in this ZIP yet.</p>':''}<div class="grid">${providers.map(p=>`<article class="card"><h2>${esc(p.name)}</h2><p>${esc(p.scope)}</p><p>${money(p.priceCents)} diagnostic visit. Repairs are quoted separately.</p><p>${esc(p.cancellationTerms)}</p><p>Supplier response within ${p.responseHours} hours. Time zone: ${esc(p.timezone)}.</p><form method="post" action="/assisted/offers">${hidden(req)}<input type="hidden" name="provider_id" value="${p.id}"><input type="hidden" name="zip" value="${esc(zip)}"><label>Requested date and time (${esc(p.timezone)})<input type="datetime-local" name="requested_local" required></label><button>Review offer</button></form></article>`).join('')}</div>`));
  });
  app.post('/assisted/offers',signedIn,csrf,wrap(async(req,res)=>{
    const a=assisted.state(store.state),p=a.suppliers[req.body.provider_id];if(!p)throw new PilotError('NOT_FOUND','Supplier not found.');
    const q=await assisted.offer(req.actor.userId,{provider_id:req.body.provider_id,zip:req.body.zip,requested_start:wallTimeToISO(req.body.requested_local,p.timezone)});
    res.send(shell('Review your booking request',`<article class="card"><h2>${esc(q.providerName)}</h2><p>${esc(q.scope)}</p><p><strong>${money(q.priceCents)}</strong> diagnostic visit; repairs quoted separately.</p><p>${esc(time(q.requestedStart,q.timezone))} — one hour (${esc(q.timezone)}).</p><p>Cancellation: ${esc(q.cancellationTerms)}</p><p>${esc(q.terms)}</p><p>This offer expires in 15 minutes.</p></article><form method="post" action="/assisted/requests" class="card">${hidden(req)}<input type="hidden" name="quote_id" value="${q.quoteId}"><input type="hidden" name="idempotency_key" value="${randomUUID()}"><label>Your name<input name="name" value="${esc(req.accountSession.user.name)}" required maxlength="100"></label><p>Email: ${esc(req.accountSession.user.email)}</p><label>Phone<input type="tel" name="phone" required maxlength="40" autocomplete="tel"></label><label>Service street address<input name="street" required maxlength="200" autocomplete="street-address"></label><label>City<input name="city" required maxlength="100" autocomplete="address-level2"></label><p>Service ZIP: ${esc(q.zip)}</p><label>Notes (optional)<textarea name="notes" maxlength="1000"></textarea></label><label><input type="checkbox" name="user_approved" value="yes" required>I approve this supplier, diagnostic price, scope, requested time and cancellation terms, and sharing these details with this supplier.</label><button>Request supplier acceptance</button></form>`));
  }));
  app.post('/assisted/requests',signedIn,csrf,wrap(async(req,res)=>{
    const r=await assisted.request(req.actor.userId,{quote_id:req.body.quote_id,idempotency_key:req.body.idempotency_key,user_approved:req.body.user_approved==='yes',customer:{name:req.body.name,phone:req.body.phone,street:req.body.street,city:req.body.city,notes:req.body.notes||''}});
    res.redirect(303,`/assisted/bookings/${r.bookingId}`);
  }));
  app.get('/assisted/bookings/:id',signedIn,wrap(async(req,res)=>{
    const r=await assisted.status(req.actor.userId,req.params.id),p=assisted.state(store.state).suppliers[r.providerId],owner=p.ownerId===req.actor.userId;
    res.send(shell(owner?'Review a customer request':'Your booking request',`<article class="card">${details(r)}</article>${r.state==='pending_supplier'?owner?`<form class="card" method="post" action="/assisted/bookings/${r.bookingId}/decision">${hidden(req)}<label><input type="checkbox" name="confirmed_details" value="yes" required>${r.testOnly?'I accept this test request only. This does not arrange an actual service visit.':'I accept this exact diagnostic scope, price and requested time on behalf of my business.'}</label><button name="decision" value="accept">Accept request</button></form><form class="card" method="post" action="/assisted/bookings/${r.bookingId}/decision">${hidden(req)}<label>Reason for declining<textarea name="reason" required maxlength="500"></textarea></label><button class="secondary" name="decision" value="decline">Decline request</button></form>`:`<form method="post" action="/assisted/bookings/${r.bookingId}/withdraw">${hidden(req)}<button class="secondary">Withdraw pending request</button></form>`:''}<p><a href="/assisted/bookings/${r.bookingId}">Refresh status</a> · <a href="/assisted">Back to account</a> · <a href="/assisted/feedback">Share feedback</a></p>`));
  }));
  app.post('/assisted/bookings/:id/decision',signedIn,csrf,wrap(async(req,res)=>{
    if(req.body.decision==='accept'&&req.body.confirmed_details!=='yes')throw new PilotError('APPROVAL_REQUIRED','Approve the unchanged scope, price and time before accepting.');
    await assisted.decide(req.actor.userId,req.params.id,req.body.decision,req.body.reason);res.redirect(303,`/assisted/bookings/${req.params.id}`);
  }));
  app.post('/assisted/bookings/:id/withdraw',signedIn,csrf,wrap(async(req,res)=>{await assisted.withdraw(req.actor.userId,req.params.id);res.redirect(303,`/assisted/bookings/${req.params.id}`);}));
  app.get('/assisted/agent/consent/:id',signedIn,(req,res)=>{
    const flow=agentOAuth.flow(req.params.id);if(!flow||flow.scope!==agentOAuth.scope)return res.status(404).send(shell('Connection expired','<p>Start the connection again from your agent.</p>'));
    const client=store.state.agentOAuth.clients[flow.clientId];
    res.send(shell('Connect your agent',`<p>Authorize ${esc(client.client_name||'your agent')} to search participating suppliers, prepare offers, submit booking requests after your approval, view your requests and withdraw pending requests.</p><p>Your supplier CRM credentials are never shared. Access belongs to ${esc(req.accountSession.user.email)} and can be revoked from your account.</p><form method="post" action="/assisted/agent/consent/${req.params.id}/approve">${hidden(req)}<button>Connect my account</button></form><form method="post" action="/assisted/agent/consent/${req.params.id}/deny">${hidden(req)}<button class="secondary">Deny</button></form>`));
  });
  for(const decision of ['approve','deny'])app.post(`/assisted/agent/consent/:id/${decision}`,signedIn,csrf,wrap(async(req,res)=>res.redirect(303,await agentOAuth.consent(req.params.id,decision==='approve',req.actor.userId))));
  app.get('/assisted/feedback',signedIn,(req,res)=>res.send(shell('Share your feedback',`<p>Tell us what felt easy, confusing or missing. The pilot operator can review your feedback.</p><form method="post" action="/assisted/feedback" class="card">${hidden(req)}<label>Which flow did you try?<select name="role"><option value="customer">Customer</option><option value="supplier">Supplier</option></select></label><label>How easy was it?<select name="rating"><option value="5">5 — Very easy</option><option value="4">4 — Easy</option><option value="3">3 — Okay</option><option value="2">2 — Difficult</option><option value="1">1 — Very difficult</option></select></label><label>What should we improve?<textarea name="comment" required maxlength="2000"></textarea></label><button>Send feedback</button></form>`)));
  app.post('/assisted/feedback',signedIn,csrf,wrap(async(req,res)=>{await assisted.feedback(req.actor.userId,{role:req.body.role,rating:Number(req.body.rating),comment:req.body.comment});res.send(shell('Feedback received','<p>Thanks. Your feedback is saved for the pilot review.</p><a href="/assisted">Back to your account</a>'));}));
  app.get('/operator/assisted/feedback',operator,(req,res)=>{const a=assisted.state(store.state);res.send(shell('Pilot feedback',`${(a.feedback||[]).slice().reverse().map(f=>`<article class="card"><p>${esc(a.users[f.userId]?.email)} · ${esc(f.role)} · ${f.rating}/5</p><p>${esc(f.comment)}</p></article>`).join('')||'<p>No feedback yet.</p>'}<a href="/operator/assisted">Back to pilot review</a>`));});
  app.get('/operator/assisted',operator,(req,res)=>{
    const a=assisted.state(store.state);
    res.send(shell('Review participating suppliers',`<p>Activate only after verifying the business representative, service scope, pricing and participation terms.</p><p><a href="/operator/assisted/feedback">Review participant feedback</a></p><p>${Object.keys(a.requests).length} requests · ${(a.feedback||[]).length} feedback responses · ${Object.values(a.notifications||{}).filter(n=>n.state==='pending').length} emails queued · ${Object.values(a.notifications||{}).filter(n=>n.state==='unknown').length} emails with uncertain delivery</p>${Object.values(a.suppliers).map(p=>`<article class="card"><h2>${esc(p.name)}</h2><p>Owner: ${esc(a.users[p.ownerId]?.email)}</p><p class="state">${esc(p.state)}</p><p>${esc(p.description)}</p><p>${money(p.price_cents)} · ${esc(p.zips.join(', '))} · ${esc(p.timezone)}</p><p>Cancellation terms: ${esc(p.cancellation_terms)}</p><p>Declared software: ${esc(p.software)||'None'} (not connected).</p>${['pending_review','paused'].includes(p.state)?`<form method="post" action="/operator/assisted/${p.id}/activate"><input type="hidden" name="csrf" value="${esc(req.operator.csrf)}"><label><input type="checkbox" name="reviewed" value="yes" required>I verified business authority and agreed participation and service terms.</label><button>${p.state==='paused'?'Reactivate':'Activate'} supplier</button></form>`:''}</article>`).join('')||'<p>No supplier registrations yet.</p>'}${config.accounts.devMailbox?'<p><a href="/operator/assisted/mailbox">Local development email inbox</a></p>':''}`));
  });
  app.post('/operator/assisted/:id/activate',operator,operatorCsrf,wrap(async(req,res)=>{await assisted.activate(req.params.id,req.body.reviewed==='yes');res.redirect(303,'/operator/assisted');}));
  app.get('/operator/assisted/mailbox',operator,(req,res)=>{
    if(!config.accounts.devMailbox)return res.status(404).send('Not found');
    res.send(shell('Local development email inbox',`<p>Loopback-only testing. These links are never exposed in public sign-in responses or application logs.</p>${[...accounts.devMail.values()].filter(m=>m.createdAt>Date.now()-900000).map(m=>`<p>${esc(m.email)} · <a href="${esc(m.url)}">Open single-use sign-in link</a></p>`).join('')}`));
  });
  app.use('/assisted',(err,req,res,next)=>{
    if(res.headersSent)return next(err);
    const message=err instanceof PilotError?err.message:err?.name==='ZodError'?'Check the required fields and try again.':'We could not complete this request. Try again or contact the operator.';
    res.status(err instanceof PilotError||err?.name==='ZodError'?400:500).send(shell('Request could not be completed',`<p class="error">${esc(message)}</p><a href="/assisted">Back to your account</a>`));
  });
}
