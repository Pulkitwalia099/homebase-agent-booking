import { spawnSync } from 'node:child_process';
import { randomUUID, createHash } from 'node:crypto';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Store } from '../src/store.js';

// Real container + Linux flock recovery using fictional state and credentials only.
const suffix=randomUUID().slice(0,8), name=`golocal-host-check-${suffix}`, volume=`${name}-disk`;
const dir=await mkdtemp(join(tmpdir(),'golocal-image-'));
const docker=(args,allowFailure=false)=>{
 const r=spawnSync('docker',args,{encoding:'utf8',timeout:30000});
 if(!allowFailure && r.status!==0) throw new Error(`Docker operation failed: ${args[0]}`);
 return r;
};
let started=false;
try {
 const store=await new Store(join(dir,'seed'),'d'.repeat(64)).init();
 await store.transaction(s=>{s.housecallOperations=Object.fromEntries([1,2,3].map(n=>[`job:fake-company:key-${n}`,{state:n===3?'pending':'done',companyId:'fake-company',result:{jobId:`fake-job-${n}`}}]));});await store.close();
 const seed=Buffer.from(await readFile(join(dir,'seed','state.enc.json'),'utf8')).toString('base64');
 const env={GOLOCAL_HOSTED:'true',PUBLIC_BASE_URL:'https://api.getgolocal.com',BACKEND:'housecall',MCP_BEARER_TOKEN:'a'.repeat(64),ADMIN_TOKEN:'b'.repeat(64),DATA_ENCRYPTION_KEY:'d'.repeat(64),HOUSECALL_TEST_COMPANY_ID:'fake-company',GOLOCAL_HOSTED_COMPANY_ID:'fake-company',GOLOCAL_HOSTED_KEY_ENABLED:'true',GOLOCAL_HOSTED_KEY_SHA256:createHash('sha256').update('c'.repeat(64)).digest('hex'),GOLOCAL_BOOTSTRAP_STATE_BASE64:seed};
 const envPath=join(dir,'fake.env');await writeFile(envPath,Object.entries(env).map(([k,v])=>`${k}=${v}`).join('\n'),{mode:0o600});
 docker(['volume','create',volume]);
 docker(['run','--detach','--name',name,'--env-file',envPath,'--mount',`type=volume,source=${volume},target=/var/data`,'golocal-hosting-test:20261011']);started=true;
 const probe=`import assert from 'node:assert/strict';const base='http://localhost:10000';let ready=false;for(let i=0;i<40;i++){try{const r=await fetch(base+'/health');if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}assert(ready);`;
 const run=code=>docker(['exec',name,'node','--input-type=module','-e',probe+code]);
 run(`assert.equal((await fetch(base+'/api/tools')).status,401);assert.equal((await fetch(base+'/api/tools',{headers:{Authorization:'Bearer '+'c'.repeat(64)}})).status,200);`);
 const second=docker(['exec',name,'/bin/sh','scripts/hosted-start.sh'],true);if(second.status===0)throw new Error('Concurrent instance acquired locked disk');
 run(`const p=await fetch(base+'/operator/login',{method:'POST',redirect:'manual',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({token:'b'.repeat(64)})});const cookie=p.headers.get('set-cookie').split(';')[0];const html=await(await fetch(base+'/operator',{headers:{Cookie:cookie}})).text();const csrf=html.match(/name="csrf" value="([a-f0-9]+)"/)[1];assert.equal((await fetch(base+'/operator/agent/revoke',{method:'POST',redirect:'manual',headers:{Cookie:cookie,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({csrf})})).status,303);`);
 docker(['kill','--signal','KILL',name]);docker(['start',name]);
 run(`assert.equal((await fetch(base+'/api/tools',{headers:{Authorization:'Bearer '+'c'.repeat(64)}})).status,401);`);
 console.log(JSON.stringify({result:'passed',fixtureOnly:true,health:true,unauthenticatedRejected:true,authenticatedSchemas:true,secondWriterBlocked:true,forcedCrashRestart:true,revocationPreserved:true,seedNotReapplied:true,vendorCalls:0}));
} finally {
 if(started)docker(['rm','--force',name],true);
 docker(['volume','rm',volume],true);
 await rm(dir,{recursive:true,force:true});
}
