import { randomUUID } from 'node:crypto';

export async function sendPilotEmail(config,input,fetchFn=fetch) {
  const response=await fetchFn(config.accounts.emailRelay,{method:'POST',redirect:'error',signal:AbortSignal.timeout(18000),
    headers:{Authorization:`Bearer ${config.accounts.emailRelayToken}`,'Content-Type':'application/json'},body:JSON.stringify({id:input.id||randomUUID(),...input})});
  if(!response.ok)throw new Error('Pilot email delivery failed or outcome unknown.');
  const result=await response.json();if(!result.sent||typeof result.id!=='string')throw new Error('Pilot email delivery outcome unknown.');return result.id;
}

// Notifications are durable before dispatch. Sending/failed outcomes are not blindly replayed.
export class PilotNotifications {
  constructor(store,config,send=sendPilotEmail){this.store=store;this.config=config;this.send=send;this.busy=false;}
  async recover(){await this.store.transaction(s=>{for(const item of Object.values(s.assisted?.notifications||{}))if(item.state==='sending')item.state='unknown';});}
  async tick(){
    if(this.busy||!Object.values(this.store.state.assisted?.notifications||{}).some(n=>n.state==='pending'))return;this.busy=true;
    try {
      const job=await this.store.transaction(s=>{const item=Object.values(s.assisted?.notifications||{}).find(n=>n.state==='pending');if(!item)return null;item.state='sending';return item;});
      if(!job)return;
      try {const providerId=await this.send(this.config,job.message);await this.store.transaction(s=>Object.assign(s.assisted.notifications[job.id],{state:'sent',sentAt:Date.now(),providerId}));}
      catch {await this.store.transaction(s=>Object.assign(s.assisted.notifications[job.id],{state:'unknown',failedAt:Date.now()}));}
    }finally{this.busy=false;}
  }
}
