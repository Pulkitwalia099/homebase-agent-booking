import { randomBytes, createHash } from 'node:crypto';
import { InvalidClientMetadataError, InvalidGrantError, InvalidScopeError, InvalidTargetError, InvalidTokenError } from '@modelcontextprotocol/sdk/server/auth/errors.js';

export const DEMO_SCOPE = 'golocal:demo';
const nonce = () => randomBytes(32).toString('hex');
const hash = value => createHash('sha256').update(value).digest('hex');

// Private single-operator prototype, with OAuth grants restricted to simulated data.
// Tokens are opaque; server-side records bind issuer, resource, scope and expiry.
export class AgentOAuth {
  constructor(store, config, now = () => Date.now()) {
    this.store = store; this.config = config; this.now = now;
    this.skipLocalPkceValidation = true; // PKCE is verified atomically with one-time code consumption below.
    this.clientsStore = {
      getClient: async id => this.store.state.agentOAuth?.clients[id],
      registerClient: async client => {
        if (!client.redirect_uris?.length || client.redirect_uris.length > 3 || client.redirect_uris.some(uri => !this.allowedCallback(uri))) throw new InvalidClientMetadataError('Only exact ChatGPT HTTPS callbacks are supported.');
        if (!['none', 'client_secret_post'].includes(client.token_endpoint_auth_method || 'client_secret_post')) throw new InvalidClientMetadataError('Unsupported client authentication method.');
        if (client.grant_types?.some(g => !['authorization_code', 'refresh_token'].includes(g))) throw new InvalidClientMetadataError('Unsupported grant type.');
        return this.store.transaction(s => {
          const auth = this.state(s);
          if (Object.keys(auth.clients).length >= 100) throw new InvalidClientMetadataError('Private test client limit reached.');
          auth.clients[client.client_id] = client; return client;
        });
      }
    };
  }
  get resource() { return `${this.config.baseUrl}/mcp`; }
  get issuer() { return new URL(this.config.baseUrl).href; }
  allowedCallback(uri) {
    try {
      const u = new URL(uri);
      return u.origin === 'https://chatgpt.com' && !u.username && !u.password && !u.search && !u.hash &&
        (u.pathname === '/connector_platform_oauth_redirect' || /^\/connector\/oauth\/[a-zA-Z0-9_-]+$/.test(u.pathname));
    } catch { return false; }
  }
  state(s) {
    s.agentOAuth ??= { clients: {}, flows: {}, codes: {}, access: {}, refresh: {} };
    const a = s.agentOAuth;
    for (const map of [a.flows,a.codes,a.access,a.refresh]) for (const [id,item] of Object.entries(map)) if (item.expiresAt < this.now()) delete map[id];
    return a;
  }
  target(resource) { if (resource?.href !== this.resource) throw new InvalidTargetError('Resource must match the GoLocal MCP URL.'); }
  scopes(scopes) { if (scopes?.some(scope => scope !== DEMO_SCOPE)) throw new InvalidScopeError('Only simulated booking access is available.'); return [DEMO_SCOPE]; }
  enabled() { if (!this.config.dotsOAuth || this.config.backend !== 'demo') throw new InvalidScopeError('Dots OAuth is enabled only for demo mode. Supplier access requires a separate implementation and grant.'); }
  async authorize(client, params, res) {
    this.enabled(); this.target(params.resource); this.scopes(params.scopes);
    if (!this.allowedCallback(params.redirectUri) || !client.redirect_uris.includes(params.redirectUri) || !/^[A-Za-z0-9_-]{43}$/.test(params.codeChallenge)) throw new InvalidGrantError('Invalid callback or S256 challenge.');
    const id = nonce();
    await this.store.transaction(s => {
      const a = this.state(s);
      if (Object.keys(a.flows).length >= 100) throw new InvalidGrantError('Private authorization request limit reached.');
      a.flows[id] = { clientId: client.client_id, redirectUri: params.redirectUri, state: params.state,
        challenge: params.codeChallenge, resource: this.resource, expiresAt: this.now() + 600000 };
    });
    res.redirect(303, `/operator/agent/consent/${id}`);
  }
  flow(id) { const flow = this.store.state.agentOAuth?.flows[id]; return flow?.expiresAt > this.now() ? flow : null; }
  async consent(id, approved) {
    this.enabled();
    return this.store.transaction(s => {
      const a = this.state(s); const flow = a.flows[id];
      if (!flow) throw new InvalidGrantError('Authorization expired or already used.');
      delete a.flows[id];
      const redirect = new URL(flow.redirectUri);
      if (flow.state) redirect.searchParams.set('state',flow.state);
      // No RFC 9207 advertisement: SDK error redirects omit iss. Stable/callback-ID paths still allowed.
      if (!approved) redirect.searchParams.set('error','access_denied');
      else {
        const code = nonce(); a.codes[hash(code)] = { ...flow, expiresAt: this.now() + 120000 };
        redirect.searchParams.set('code',code);
      }
      return redirect.href;
    });
  }
  async challengeForAuthorizationCode(client, code) {
    const item = this.store.state.agentOAuth?.codes[hash(code)];
    if (!item || item.clientId !== client.client_id || item.expiresAt <= this.now()) throw new InvalidGrantError('Code invalid or expired.');
    return item.challenge;
  }
  mint(a, clientId, family, grantExpiresAt = this.now() + 86400000) {
    const access = nonce(), refresh = nonce();
    const binding = { clientId, family, issuer: this.issuer, resource: this.resource, scopes: [DEMO_SCOPE], grantExpiresAt };
    const accessExpiresAt = Math.min(this.now()+3600000,grantExpiresAt);
    a.access[hash(access)] = { ...binding, expiresAt: accessExpiresAt };
    a.refresh[hash(refresh)] = { ...binding, expiresAt: grantExpiresAt, used: false };
    return { access_token: access, token_type: 'Bearer', expires_in: Math.floor((accessExpiresAt-this.now())/1000), refresh_token: refresh, scope: DEMO_SCOPE };
  }
  async exchangeAuthorizationCode(client, code, verifier, redirectUri, resource) {
    this.enabled(); this.target(resource);
    return this.store.transaction(s => {
      const a = this.state(s), item = a.codes[hash(code)];
      if (!item || item.clientId !== client.client_id || item.redirectUri !== redirectUri || item.resource !== this.resource ||
        typeof verifier !== 'string' || !/^[A-Za-z0-9._~-]{43,128}$/.test(verifier) || createHash('sha256').update(verifier).digest('base64url') !== item.challenge) throw new InvalidGrantError('Invalid code, callback or PKCE verifier.');
      delete a.codes[hash(code)]; return this.mint(a,client.client_id,nonce());
    });
  }
  revokeFamily(a, family) {
    for (const map of [a.access,a.refresh]) for (const [id,item] of Object.entries(map)) if (item.family === family) delete map[id];
  }
  async exchangeRefreshToken(client, token, scopes, resource) {
    this.enabled(); this.target(resource); this.scopes(scopes);
    const result = await this.store.transaction(s => {
      const a = this.state(s), item = a.refresh[hash(token)];
      if (!item || item.clientId !== client.client_id || item.resource !== this.resource || item.issuer !== this.issuer) return null;
      if (item.used) { this.revokeFamily(a,item.family); return null; }
      item.used = true; return this.mint(a,client.client_id,item.family,item.grantExpiresAt);
    });
    if (!result) throw new InvalidGrantError('Refresh token expired, reused or invalid. Reconnect.');
    return result;
  }
  async verifyAccessToken(token) {
    this.enabled();
    const item = this.store.state.agentOAuth?.access[hash(token)];
    if (!item || item.expiresAt <= this.now() || item.resource !== this.resource || item.issuer !== this.issuer || !item.scopes.includes(DEMO_SCOPE)) throw new InvalidTokenError('Access token invalid or expired.');
    return { token, clientId: item.clientId, scopes: item.scopes, expiresAt: Math.floor(item.expiresAt/1000), resource: new URL(item.resource) };
  }
  async revokeToken(client, request) {
    await this.store.transaction(s => {
      const a = this.state(s), item = a.access[hash(request.token)] || a.refresh[hash(request.token)];
      if (item?.clientId === client.client_id) this.revokeFamily(a,item.family);
    });
  }
  async revokeAll() { await this.store.transaction(s => { const a = this.state(s); a.flows={}; a.codes={}; a.access={}; a.refresh={}; }); }
}
