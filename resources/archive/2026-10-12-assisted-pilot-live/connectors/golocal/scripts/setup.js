import { randomBytes } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
const template = await readFile(new URL('../.env.example', import.meta.url), 'utf8');
const config = template
  .replace('MCP_BEARER_TOKEN=\n', `MCP_BEARER_TOKEN=${randomBytes(32).toString('hex')}\n`)
  .replace('ADMIN_TOKEN=\n', `ADMIN_TOKEN=${randomBytes(32).toString('hex')}\n`)
  .replace('DATA_ENCRYPTION_KEY=\n', `DATA_ENCRYPTION_KEY=${randomBytes(32).toString('hex')}\n`)
  .replace('ACCOUNT_AUTH_SECRET=\n', `ACCOUNT_AUTH_SECRET=${randomBytes(32).toString('hex')}\n`);
await writeFile(new URL('../.env', import.meta.url), config, { flag: 'wx', mode: 0o600 });
console.log('Created private .env with independent agent, admin, encryption and account-auth secrets. Existing files are never overwritten.');
