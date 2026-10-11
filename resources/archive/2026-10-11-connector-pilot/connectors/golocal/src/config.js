export function getConfig(env = process.env) {
  const baseUrl = (env.PUBLIC_BASE_URL || 'http://localhost:8787').replace(/\/$/, '');
  const parsed = new URL(baseUrl);
  if (parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== '/') throw new Error('PUBLIC_BASE_URL must be an origin URL.');
  if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(parsed.hostname))) throw new Error('Public endpoints require HTTPS.');
  for (const name of ['MCP_BEARER_TOKEN', 'ADMIN_TOKEN']) {
    if ((env[name] || '').length < 32) throw new Error(`${name} must be at least 32 characters. Run npm run setup.`);
  }
  if (env.MCP_BEARER_TOKEN === env.ADMIN_TOKEN) throw new Error('Agent and operator tokens must be different.');
  const backend = env.BACKEND || 'demo';
  if (!['demo', 'jobber'].includes(backend)) throw new Error('BACKEND must be demo or jobber.');
  const writes = env.ENABLE_JOBBER_TEST_WRITES === 'true';
  if (writes && (backend !== 'jobber' || !env.JOBBER_TEST_ACCOUNT_ID)) throw new Error('Test writes require Jobber mode and an explicit test account ID.');
  return { port: Number(env.PORT || 8787), host: env.HOST || '127.0.0.1', baseUrl, backend,
    mcpToken: env.MCP_BEARER_TOKEN, adminToken: env.ADMIN_TOKEN, encryptionKey: env.DATA_ENCRYPTION_KEY,
    dataDir: env.DATA_DIR || '.data', allowedOrigins: (env.ALLOWED_ORIGINS || '').split(',').filter(Boolean),
    allowedHosts: new Set([parsed.host, `localhost:${env.PORT || 8787}`, `127.0.0.1:${env.PORT || 8787}`]),
    jobber: { clientId: env.JOBBER_CLIENT_ID || '', clientSecret: env.JOBBER_CLIENT_SECRET || '', accountId: env.JOBBER_TEST_ACCOUNT_ID || '',
      version: env.JOBBER_GRAPHQL_VERSION || '2026-09-25', callbackUrl: `${baseUrl}/oauth/jobber/callback`, writes }
  };
}
