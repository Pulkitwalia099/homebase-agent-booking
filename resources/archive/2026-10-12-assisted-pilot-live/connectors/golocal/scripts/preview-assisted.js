import { randomBytes } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Store } from '../src/store.js';
import { Assisted } from '../src/assisted.js';
import { createAccounts } from '../src/accounts.js';
import { createApp } from '../src/app.js';
import { getConfig } from '../src/config.js';

// Isolated, disposable preview. No existing .env, supplier API key or email service is read.
const port=Number(process.env.ASSISTED_PREVIEW_PORT||8791),base=`http://127.0.0.1:${port}`;
const dir=await mkdtemp(join(tmpdir(),'golocal-assisted-preview-'));
const secret=()=>randomBytes(32).toString('hex');
const config=getConfig({BACKEND:'assisted',PORT:String(port),HOST:'127.0.0.1',PUBLIC_BASE_URL:base,DATA_DIR:dir,
  DATA_ENCRYPTION_KEY:secret(),MCP_BEARER_TOKEN:secret(),ADMIN_TOKEN:secret(),ACCOUNT_AUTH_SECRET:secret(),ASSISTED_DEV_MAILBOX:'true'});
const store=await new Store(dir,config.encryptionKey).init(),assisted=new Assisted(store,config),accounts=await createAccounts(config);
const app=createApp({config,store,assisted,accounts});
const profiles={customer:{email:'customer@preview.example.test',name:'Preview Customer'},supplierA:{email:'supplier-a@preview.example.test',name:'Supplier A'},supplierB:{email:'supplier-b@preview.example.test',name:'Supplier B'}};
app.get('/preview', (req,res)=>res.send(`<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>GoLocal assisted MVP preview</title><style>body{font:18px/1.6 system-ui;max-width:700px;margin:60px auto;padding:20px;color:#173e34;background:#f6f3eb}a{display:block;color:#175b46;margin:20px 0}</style><h1>GoLocal assisted MVP</h1><p>Isolated synthetic accounts and suppliers. No service, email, payment or CRM operation occurs.</p><a href="/preview/customer">Customer account — find a plumber and request a booking</a><a href="/preview/supplierA">Supplier A — accept or decline requests</a><a href="/preview/supplierB">Supplier B — separate business account</a></html>`));
app.get('/preview/:role',async(req,res,next)=>{
  try {
    const profile=profiles[req.params.role];if(!profile)return res.status(404).send('Not found');
    await accounts.auth.api.signInMagicLink({body:{...profile,callbackURL:base+'/assisted'},headers:new Headers({origin:base})});
    const token=new URL(accounts.devMail.get(profile.email).url).searchParams.get('token');
    const response=await accounts.auth.api.magicLinkVerify({query:{token,callbackURL:base+'/assisted'},headers:new Headers({origin:base}),asResponse:true});
    res.set('Set-Cookie',response.headers.getSetCookie());res.redirect(303,'/assisted');
  } catch(e){next(e);}
});
const server=app.listen(port,'127.0.0.1');await new Promise((resolve,reject)=>{server.once('listening',resolve);server.once('error',reject);});
async function seed(profile) {
  await accounts.auth.api.signInMagicLink({body:{...profile,callbackURL:base+'/assisted'},headers:new Headers({origin:base})});
  const response=await fetch(accounts.devMail.get(profile.email).url,{redirect:'manual'});
  const cookies=response.headers.getSetCookie().map(c=>c.split(';')[0]).join('; ');
  const session=await accounts.auth.api.getSession({headers:new Headers({cookie:cookies})});
  await assisted.ensureUser(session.user);return session.user.id;
}
const ownerA=await seed(profiles.supplierA),ownerB=await seed(profiles.supplierB),customer=await seed(profiles.customer);
const profile=(name,price)=>({name,description:'Synthetic preview supplier. One-hour plumbing diagnostic; repairs quoted separately. No actual service.',zips:['84101','84102'],price_cents:price,timezone:'America/Denver',cancellation_terms:'Withdraw while pending at no charge. Coordinate accepted-booking changes with the supplier.',response_hours:24,software:'Housecall Pro (not connected)',terms_accepted:true});
const a=await assisted.onboard(ownerA,profile('Pilot Test Plumbing',9500)),b=await assisted.onboard(ownerB,profile('Second Test Plumbing',12000));await assisted.activate(a.id,true);await assisted.activate(b.id,true);
const offer=await assisted.offer(customer,{provider_id:a.id,zip:'84101',requested_start:new Date(Date.now()+3*86400000).toISOString()});
await assisted.request(customer,{quote_id:offer.quoteId,idempotency_key:'preview-request-001',user_approved:true,customer:{name:'Preview Customer',phone:'555-0100',street:'Synthetic Test Street',city:'Salt Lake City',notes:'Synthetic request for UI review only.'}});
console.log(`Assisted MVP synthetic preview: ${base}/preview`);
let stopping=false;async function stop(){if(stopping)return;stopping=true;server.closeIdleConnections();await new Promise(resolve=>server.close(resolve));accounts.close();await store.close();await rm(dir,{recursive:true,force:true});process.exit(0);}
process.on('SIGINT',stop);process.on('SIGTERM',stop);
