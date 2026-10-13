import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
if (!process.env.MCP_BEARER_TOKEN) throw new Error('Run setup first.');
const dir = process.env.DATA_DIR || '.data';
await mkdir(dir, { recursive: true, mode: 0o700 });
await writeFile(join(dir, 'muse-key.txt'), process.env.MCP_BEARER_TOKEN + '\n', { mode: 0o600 });
console.log('Agent-only test key saved to .data/muse-key.txt. Enter it only into Muse’s secure credential prompt. Never share .env or the operator token.');
