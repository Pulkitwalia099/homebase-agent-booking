import { createDecipheriv } from 'node:crypto';
import { mkdir, readFile, open, rename, stat } from 'node:fs/promises';
import { join } from 'node:path';

// Called only under the Linux service flock. Never silently start with fresh write history.
function validate(payload, config) {
  try {
    const envelope=JSON.parse(payload);
    if (!/^[a-f0-9]{24}$/.test(envelope.iv) || !/^[a-f0-9]{32}$/.test(envelope.tag) || !/^[a-f0-9]+$/.test(envelope.data) || envelope.data.length>2*1024*1024) throw new Error();
    const decipher=createDecipheriv('aes-256-gcm',Buffer.from(config.encryptionKey,'hex'),Buffer.from(envelope.iv,'hex'));
    decipher.setAuthTag(Buffer.from(envelope.tag,'hex'));
    const state=JSON.parse(Buffer.concat([decipher.update(Buffer.from(envelope.data,'hex')),decipher.final()]).toString());
    const prefix=`job:${config.housecall.companyId}:`;
    const operations=Object.entries(state.housecallOperations || {}).filter(([key])=>key.startsWith(prefix));
    if (config.backend!=='housecall' || operations.length!==3 || operations.some(([,op])=>op.companyId!==config.housecall.companyId || !['done','pending'].includes(op.state))) throw new Error();
  } catch { throw new Error('Hosted state invalid or missing the three protected Housecall operations. Restore the approved encrypted migration; do not reset history.'); }
}

export async function bootstrapHostedState(config, env=process.env) {
  if (!config.hosted) return;
  await mkdir(config.dataDir,{recursive:true,mode:0o700});
  const target=join(config.dataDir,'state.enc.json');
  if(config.backend==='assisted') {
    try {
      const envelope=JSON.parse(await readFile(target,'utf8'));
      const decipher=createDecipheriv('aes-256-gcm',Buffer.from(config.encryptionKey,'hex'),Buffer.from(envelope.iv,'hex'));
      decipher.setAuthTag(Buffer.from(envelope.tag,'hex'));
      const state=JSON.parse(Buffer.concat([decipher.update(Buffer.from(envelope.data,'hex')),decipher.final()]).toString());
      if(state.assisted?.version!==1 || !state.assisted.users || !state.assisted.requests) throw new Error('Not an assisted dataset');
      if(Object.keys(state.assisted.users).length) await stat(join(config.dataDir,'assisted-accounts.sqlite'));
      return;
    } catch(error) {
      if(error.code!=='ENOENT')throw new Error('Assisted hosted history is invalid. Restore its encrypted store and account database together; do not replace test history.');
      // A missing account database after users exist is never a fresh initialization.
      try { await stat(target); throw new Error('Assisted account database missing. Restore the matching backup.'); } catch(e) { if(e.code!=='ENOENT')throw e; }
    }
    if(env.ASSISTED_INITIALIZE_HOSTED!=='true')throw new Error('New assisted hosted storage requires explicit ASSISTED_INITIALIZE_HOSTED=true once on a separate empty disk.');
    try { const marker=await open(join(config.dataDir,'assisted-initialized'),'wx',0o600);await marker.writeFile('assisted-v1\n');await marker.sync();await marker.close(); }
    catch { throw new Error('Assisted disk was initialized before. Missing history must be restored, not reset.'); }
    return;
  }
  try { validate(await readFile(target,'utf8'),config); return; }
  catch (error) { if(error.code!=='ENOENT') throw error; }
  const seed=env.GOLOCAL_BOOTSTRAP_STATE_BASE64;
  if (typeof seed!=='string' || seed.length>3*1024*1024 || !/^[A-Za-z0-9+/]+={0,2}$/.test(seed)) throw new Error('Hosted data is missing. Supply the approved encrypted migration once; empty-state startup is blocked.');
  const payload=Buffer.from(seed,'base64').toString('utf8');
  validate(payload,config);
  const temporary=join(config.dataDir,'bootstrap.tmp');
  const file=await open(temporary,'w',0o600);
  try { await file.writeFile(payload); await file.sync(); } finally { await file.close(); }
  await rename(temporary,target);
  const directory=await open(config.dataDir,'r');await directory.sync();await directory.close();
  // No seed or secrets are logged. The env seed should be removed after independent verification.
}
