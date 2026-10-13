import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Store } from '../src/store.js';
import { Assisted } from '../src/assisted.js';
import { bootstrapHostedState } from '../src/hosted-state.js';
import { createAccounts } from '../src/accounts.js';

test('hosted assisted initialization is explicit; lost state cannot silently reset',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'golocal-assisted-hosted-'));t.after(()=>rm(dir,{recursive:true,force:true}));
  const config={backend:'assisted',hosted:true,dataDir:dir,encryptionKey:'f'.repeat(64)};
  await assert.rejects(bootstrapHostedState(config,{}),/explicit/);
  await bootstrapHostedState(config,{ASSISTED_INITIALIZE_HOSTED:'true'});
  const store=await new Store(dir,config.encryptionKey).init();await store.transaction(s=>new Assisted(store,config).state(s));await store.close();
  await bootstrapHostedState(config,{});
  await rm(join(dir,'state.enc.json'));await assert.rejects(bootstrapHostedState(config,{ASSISTED_INITIALIZE_HOSTED:'true'}),/initialized before/);
});
test('assisted startup rejects a different account database and preserves existing business state',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'golocal-assisted-backup-'));t.after(()=>rm(dir,{recursive:true,force:true}));
  const config={baseUrl:'http://localhost:8787',dataDir:dir,accounts:{secret:'z'.repeat(64),devMailbox:true}};
  await assert.rejects(createAccounts(config,undefined,{missing:{id:'missing',email:'existing@example.test'}}),/matching backup/);
});
