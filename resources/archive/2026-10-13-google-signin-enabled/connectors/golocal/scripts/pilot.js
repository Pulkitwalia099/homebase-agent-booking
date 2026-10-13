import { readFile,writeFile,open,rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn,execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { getConfig } from '../src/config.js';

const directory=fileURLToPath(new URL('../',import.meta.url));
process.loadEnvFile(join(directory,'.env.assisted-pilot'));
const config=getConfig(),filename=join(config.dataDir,'pilot-processes.json'),command=process.argv[2]||'status';
const health=async()=>{try{const r=await fetch(`http://127.0.0.1:${config.port}/health`,{signal:AbortSignal.timeout(1500)});return r.ok&&(await r.json()).backend==='assisted';}catch{return false;}};
const save=state=>writeFile(filename,JSON.stringify(state),{mode:0o600});
const launched=async(binary,args,name)=>{const log=await open(join(config.dataDir,name+'.log'),'a',0o600);const child=spawn(binary,args,{cwd:directory,detached:true,stdio:['ignore',log.fd,log.fd],env:process.env});await new Promise((resolve,reject)=>{child.once('spawn',resolve);child.once('error',reject);});child.unref();await log.close();return {pid:child.pid,binary,args};};
let state;try{state=JSON.parse(await readFile(filename,'utf8'));}catch{state={};}
async function owned(processRecord){
  if(!processRecord?.pid)return false;
  try{const {stdout}=await promisify(execFile)('/bin/ps',['-p',String(processRecord.pid),'-o','command=']);return stdout.includes(processRecord.binary)&&processRecord.args.every(arg=>stdout.includes(arg));}catch{return false;}
}
if(command==='start'){
  if(!await health()){
    if(await owned(state.server))throw new Error('Existing pilot process is not healthy. Inspect its private log before restarting.');
    state.server=await launched(process.execPath,['--env-file=.env.assisted-pilot','src/server.js'],'server');await save(state);
  }
  for(let i=0;i<30&&!await health();i++)await new Promise(resolve=>setTimeout(resolve,200));
  if(!await health())throw new Error('Pilot did not start. Inspect .data-assisted-pilot/server.log.');
  if(!await owned(state.tunnel)){state.tunnel=await launched('/opt/homebrew/bin/ngrok',['http',String(config.port),'--url',config.baseUrl,'--inspect=false'],'tunnel');await save(state);}
  if(!await owned(state.awake)){state.awake=await launched('/usr/bin/caffeinate',['-i','-s'],'awake');await save(state);}
  console.log(`Pilot started. Customer: ${config.baseUrl}/assisted · Supplier: ${config.baseUrl}/assisted/supplier/new · Operator: ${config.baseUrl}/operator`);
  console.log('Machine, network and these processes must remain running. No cloud backend was created.');
}else if(command==='stop'){
  for(const name of ['tunnel','server','awake'])if(await owned(state[name]))process.kill(state[name].pid,'SIGTERM');
  await rm(filename,{force:true});console.log('Owned pilot processes stopped. Saved accounts and requests remain on disk.');
}else if(command==='status'){
  console.log(JSON.stringify({localServer:await health(),tunnelProcess:await owned(state.tunnel),keepAwake:await owned(state.awake),customerUrl:config.baseUrl+'/assisted'}));
}else throw new Error('Use start, status or stop.');
