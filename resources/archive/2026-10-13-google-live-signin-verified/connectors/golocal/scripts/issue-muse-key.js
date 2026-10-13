import {randomBytes} from 'node:crypto';
import {readFile,writeFile,chmod,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {getConfig} from '../src/config.js';
if(!process.argv.includes('--approved-private-muse-test')) throw Error('Explicit approval for private Muse test access required.');
const config=getConfig();
if(config.backend!=='housecall'||!config.housecall.companyId||!config.housecall.writes||!config.baseUrl.startsWith('https://')) throw Error('Requires the existing bound Housecall test backend over HTTPS.');
if(config.museAccess && config.museAccess.expiresAt>Date.now()) throw Error('Active Muse test key already exists. Do not expand or rotate silently.');
const token=randomBytes(32).toString('hex');
const expiresAt=new Date(Date.now()+86400000).toISOString();
let envText=await readFile('.env','utf8');
for(const [name,value] of Object.entries({MUSE_TEST_BEARER_TOKEN:token,MUSE_TEST_COMPANY_ID:config.housecall.companyId,MUSE_TEST_PUBLIC_BASE_URL:config.baseUrl,MUSE_TEST_TOKEN_EXPIRES_AT:expiresAt})) {
  const pattern=new RegExp(`^${name}=.*$`,'m');
  envText=pattern.test(envText)?envText.replace(pattern,`${name}=${value}`):`${envText.trimEnd()}\n${name}=${value}\n`;
}
await writeFile('.env',envText,{mode:0o600});await chmod('.env',0o600);
await mkdir(config.dataDir,{recursive:true,mode:0o700});
await writeFile(join(config.dataDir,'muse-housecall-key.txt'),token+'\n',{mode:0o600});
console.log(`Private company-bound Muse test key saved. Expiry: ${expiresAt}. Restart server; enter only into Muse secure credentials. No vendor write performed.`);
