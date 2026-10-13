// Operator-only recovery: verifies an existing record, never repeats a vendor write.
import {getConfig} from '../src/config.js';
import {Store} from '../src/store.js';
import {Housecall} from '../src/housecall.js';
import {HousecallTest} from '../src/housecall-test.js';
const [jobId,operationKey,quoteId]=process.argv.slice(2);
const config=getConfig(),store=await new Store(config.dataDir,config.encryptionKey).init();
try {
 const h=new HousecallTest(new Housecall(config.housecall),store,config.housecall);await h.guard();
 const operation=`job:${config.housecall.companyId}:${operationKey}`,pending=store.state.housecallOperations?.[operation];
 if(pending?.state!=='pending') throw Error('Expected pending operation.');
 const q=store.state.housecallQuotes?.[quoteId],f=store.state.housecallOperations?.[`fixture:${config.housecall.companyId}`]?.result;
 if(!q||q.key!==operationKey||!f) throw Error('Quote/fixture binding missing.');
 h.checkCustomer(await h.request('GET',`/customers/${f.customerId}`));
 const job=await h.request('GET',`/jobs/${h.validId(jobId)}`);h.checkJob(job,f);
 if(job.work_status!=='scheduled'||Date.parse(job.schedule?.scheduled_start)!==Date.parse(q.start)||Date.parse(job.schedule?.scheduled_end)!==Date.parse(q.end)||!job.notes?.some(n=>n.content?.includes(`Quote ${quoteId}.`))) throw Error('Existing record does not match pending operation.');
 await store.transaction(s=>{s.housecallOperations[operation]={state:'done',companyId:config.housecall.companyId,result:{jobId,quoteId,fixture:f},operatorReconciled:true};});
 console.log(JSON.stringify({reconciled:true,...h.project(job)}));
} finally {await store.close();}
