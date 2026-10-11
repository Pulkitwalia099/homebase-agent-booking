import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const W=ROOT+'/tmp/pitch-v27-2026-10-10';
const p=await PresentationFile.importPptx(await FileBlob.load('/Users/pulkitwalia/Downloads/golocal-pitch-v26.pptx'));
const C={ink:'#193C32',green:'#236C4E',muted:'#65746C',bg:'#FBF9F4',pale:'#E4EFE6',line:'#CDD5CE',red:'#A95145',rose:'#F4E8E2'};
let k=0;
function tx(s,str,x,y,w,h,size=26,color=C.ink,bold=false,align='left'){
 const sh=s.shapes.add({geometry:'textbox',name:'v27-text-'+k++,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});
 sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',alignment:align,wrap:'square'};return sh;
}
function head(s,kicker,title,sub){tx(s,kicker,52,27,1176,25,17,C.muted,true);tx(s,title,52,65,1176,63,44,C.ink,true);if(sub)tx(s,sub,52,141,1176,46,27,C.muted);}
function foot(s,n,str=''){if(str)tx(s,str,52,687,1095,29,14,C.muted);tx(s,`${n} / 7`,1160,695,70,21,17,C.muted);}
async function clear(i){const r=(await p.inspect({select:`$.slides[${i}].elements[*]`,include:['id']})).records;p.delete(r.map(x=>x.id));return p.slides.items[i];}
async function repl(i,old,next){const r=(await p.inspect({select:`$.slides[${i}].elements[*]`,include:['id','text']})).records.filter(x=>x.text?.includes(old));if(r.length!==1)throw Error('Target '+old+' found '+r.length);const sh=p.resolve(r[0].id);sh.text.replace(old,next);return sh;}
function arrow(s,a,b,from='right',to='left'){return s.shapes.connect(a,b,{kind:'straight',fromSide:from,toSide:to,line:{fill:C.green,width:2,style:'solid'},tail:{type:'arrow',width:'sm',length:'sm'}});}
// Opportunity: editable native matrix with a consistent row rhythm.
let s=await clear(1);
head(s,'MARKET OPPORTUNITY','≈$1.2T in U.S. local-services spending','Discovery keeps improving. Booking still spans websites, forms and calls.');
const vals=[
['','Pre-2000','2000–2010','2010–2020','2020–2025','2026+'],
['Technology','Telephones','Internet','Mobile + GPS','LLMs','AI + tools'],
['Platform','Yellow Pages','Google /\nCraigslist','Google Maps','AI chatbots','Personal AI\nagents'],
['Find a business','✓','✓','✓','✓','✓'],['Compare options','–','✓','✓','✓','✓'],['Location & reviews','–','–','✓','✓','✓'],['Conversational request','–','–','–','✓','✓'],['Delegate the task','–','–','–','–','✓'],
['Scope & quote','–','–','–','–','Calls / forms'],['Live availability','–','–','–','–','Calls / portals'],['Book & pay','–','–','–','–','Separate checkout']];
const table=s.tables.add({rows:11,columns:6,left:52,top:194,width:1176,height:397,columnWidths:[250,185.2,185.2,185.2,185.2,185.2],values:vals});
table.styleOptions={headerRow:false,firstColumn:false,bandedRows:false};
table.borders.assign({fill:C.bg,width:2,style:'solid'});
const heights=[28,32,55,34,34,34,34,34,36,36,36];
for(let r=0;r<11;r++){
 table.rows[r].height=heights[r];
 for(let c=0;c<6;c++){
  const cell=table.getCell(r,c);
  cell.fill=c===0||r<3?C.bg:r<8?(c>=r-2?C.pale:'#F0F0EB'):C.rose;
  let color=r===0?C.muted:r>=8?C.red:C.ink;
  let bold=c===0||r===2;let size=r===0?18:r===1?19:r===2?21:c===0?19:c===5&&r>=8?17.5:24;
  if(r>=3&&r<8&&c===r-2){cell.fill=C.green;color='#FFFFFF';bold=true;}
  if(r===2&&c===5){cell.fill=C.green;color='#FFFFFF';}
  cell.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,alignment:c===0?'left':'center',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
  table.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:c===0?0:6,right:6,top:1,bottom:1},borders:{top:{width:r===8?6:2,color:C.bg},bottom:{width:2,color:C.bg},left:{width:2,color:C.bg},right:{width:2,color:C.bg}}});
 }
}
tx(s,'Uber, DoorDash and Booking.com show the value of organized supply.',52,620,1176,30,25,C.ink,true);
tx(s,'GoLocal brings a shared booking layer to fragmented local services.',52,653,1176,30,25,C.green);
foot(s,2,'~$1.2T: selected U.S. categories, mixed 2023–25 sources, including materials/DIY. Not fee revenue. Illustrative eras.');
s.speakerNotes.text=`Personal agents create additional starting points for local-service requests. Websites, forms and calls still fragment many service-booking workflows. The matrix illustrates cumulative consumer capabilities, not invention dates or a claim that earlier platforms had no booking capability. Specialized platforms and existing booking products already support transactions in selected categories. Uber, DoorDash and Booking.com illustrate organized supply and a transaction layer, not confirmed GoLocal integrations.\nMarket context: approximately $1.19T, rounded to $1.2T, across home improvement/repair (~$600B, including materials and DIY), motor vehicle maintenance and repair ($283.802B), personal care and clothing services ($239.558B) and child day care ($65.547B). Mixed years and measures; this is not GoLocal's serviceable booking volume or fee revenue. Sources: https://www.jchs.harvard.edu/sites/default/files/reports/files/Harvard_JCHS_Improving_Americas_Housing_2025.pdf ; https://fred.stlouisfed.org/release/tables?eid=44183&rid=53 ; https://fred.stlouisfed.org/series/AIES6244RCT00US . Supporting calculation supplied in resources/local-services-tam-2026-10-10.md. Structured transaction examples: https://developer.doordash.com/en-US/mcp/ ; https://developers.booking.com/demand/docs/getting-started/overview .`;
// Architecture retains supplied images, vendor examples and original editable connections.
await repl(2,'GoLocal connects personal agents to local businesses','One booking layer for agents and local businesses');
await repl(2,'The data agents need already lives across businesses’ different software systems.','We connect participating businesses through the software they already use.');
await repl(2,'$2B+ raised','$2B+ raised*');
await repl(2,'One data & booking API','Data and booking API');
await repl(2,'We onboard businesses and connect their existing software.','Agents reach local supply through one connection.');
await repl(2,'One connection for agents. One integration for participating businesses.','Businesses reach connected agents through one integration.');
await repl(2,'*100+ listed plumbing products, Software Advice. Segment examples overlap. Merchant authorization required.','*Selected-startup funding. 100+ plumbing products listed by Software Advice. Examples, not live integrations.');
p.slides.items[2].speakerNotes.text=`GoLocal's intended product combines participating provider supply with structured booking execution. The diagram describes the proposed architecture, not currently deployed integrations. Software segments overlap and each category has a different mix. Merchant authorization, vendor permissions and supported operations are required. Agents and frameworks shown are ecosystem examples, not signed distribution partners.\n100+ plumbing software products: conservative directory count supplied in resources/plumbing-vendor-depth-evidence-2026-10-10.json. https://www.softwareadvice.com/field-service/plumbing-software-comparison/ . This is not a count of production booking APIs. Official examples: https://buildops.com/industries/plumbing ; https://www.simprogroup.com/industries/plumbing-software ; https://www.servicefusion.com/plumbing-software ; https://www.joblogic.com/industries/plumbing-software/ ; https://www.kickserv.com/industries/plumbing .\n$2B+ is the supplied selected-company funding total, not funding for every pictured product or evidence of local-service demand: Hark over $700M, Instinct $1B Series C plus $350M previously reported total, Town $55M Series A. Source record: resources/agent-funding-evidence-2026-10-10.json. https://hark.com/articles/hark-announces-usd700-million-fundraising-round ; https://www.businesswire.com/news/home/20260928153437/en/ ; https://techcrunch.com/2026/08/26/viral-ai-startup-instinct-has-raised-350-million-at-a-2-5-billion-valuation/ ; https://www.town.com/press/series-a . Original supplied agent logos retained.\nWhy a shared layer: recruiting supply, normalizing different workflows and handling booking state can save each agent company from repeating that work. Supplier coverage and reliable execution are the proposed differentiation. Distribution and economics remain to be proven.`;
// Customer example uses the same city as the planned pilot.
await repl(3,'“Book a plumber in Dallas tomorrow morning\nfor my leaking kitchen tap.”','“Book a plumber in Salt Lake City tomorrow\nmorning for my leaking kitchen tap.”');
await repl(3,'Collects the address and\na photo of the leak.\nDefines a diagnostic visit.','Collects the address and\na photo of the leak.\nScopes a diagnostic visit.');
p.slides.items[3].speakerNotes.text='Illustrative intended customer journey, not a live GoLocal transaction. Salt Lake City aligns the example with the planned plumbing pilot. Oak Plumbing, the $79 diagnostic visit, 9–11 am slot and booking GL-1042 are fictional. The customer approves the provider, visit fee and payment authorization before execution. Authorization is not payment capture. Repair work requires a separate quote after inspection. GoLocal would return provider-confirmed booking state through authorized software connections; this capability remains to be validated. A completed and paid job, rather than connector installation or a mere request, is the proposed commercial outcome.';
// Launch and growth: give the causal loop room, separate expansion from the loop.
s=await clear(4);
head(s,'LAUNCH AND GROWTH','Local bookings can build a stronger local network','One city and one service category first.');
tx(s,'1  Build a local market',52,221,345,40,28,C.ink,true);
tx(s,'Recruit providers and users\nwith a specific booking need\nin one city and category.',52,273,345,103,25);
tx(s,'2  Connect their agents',52,411,345,40,28,C.ink,true);
tx(s,'“Add GoLocal to find\nme local services.”',52,463,345,65,27,C.green,true);
tx(s,'One-time setup on a compatible\nagent, with sign-in and approval.',52,545,350,54,20,C.muted);
tx(s,'3  The proposed network effect',451,221,777,40,28,C.ink,true);
const a=tx(s,'Successful\nbookings',451,302,333,67,28,C.green,true,'center');
const b=tx(s,'Agents suggest GoLocal\nto more users with\nsimilar requests*',885,285,343,103,26,C.ink,true,'center');
const c=tx(s,'More local\nbookings',885,438,343,68,28,C.green,true,'center');
const d=tx(s,'More local businesses join,\nexpanding useful coverage',451,433,333,76,25,C.ink,true,'center');
arrow(s,a,b);arrow(s,b,c,'bottom','top');arrow(s,c,d,'left','right');arrow(s,d,a,'top','bottom');
tx(s,'Proof in one city supports more categories there,\nthen expansion into more cities.',451,548,777,63,25,C.green,true);
tx(s,'PROPOSED REVENUE MODEL',52,632,350,22,16,C.green,true);
tx(s,'Businesses pay a success fee on fulfilled new-customer jobs, shared with contributing partners.',52,658,1176,28,22,C.ink);
foot(s,5,'*Growth hypothesis. Recommendations depend on booking reliability, platform discovery and selection rules.');
s.speakerNotes.text=`The cold start requires both useful participating supply and users with real booking needs. One-time setup is an intended experience on compatible platforms and may require sign-in and approval. Each transaction still requires the relevant user authorization.\nProposed network effect: successful bookings create evidence of usefulness and reliability. Where agent discovery and selection mechanisms can use that evidence, agents may suggest GoLocal to more users with similar requests. Those suggestions can bring more local bookings. Demonstrated demand can attract more businesses, improving coverage and availability and making subsequent bookings more useful. This is a commercial hypothesis, not an observed growth loop or a claim that models automatically learn across users. No demand-routing agreement or automatic recommendation mechanism is established.\nExpansion is a subsequent decision: demonstrate the local loop and viable economics in one city/category, use that proof to add related categories within the city, then repeat in more cities. Supply and demand still need to be established in each new market.\nProposed commercial model: providers pay a success fee on fulfilled new-customer jobs, with a share for contributing partners. Prices, shares and paid continuation have not been agreed. Repeat visits, cancellations and existing-customer changes do not automatically generate acquisition fees. Contribution must cover acquisition, partner share, integration, support, payment and exception-handling costs. A venture-scale opportunity requires repeatable distribution, reusable integrations and profitable delivery, beyond a thin connector or manual booking service.`;
// Partnerships: keep the two counts separate and make the planned milestone explicit.
s=await clear(5);
head(s,'PARTNERSHIPS AND PILOT','First pilot: plumbing in Salt Lake City','Two channel partners provide a starting point for supply.');
tx(s,'50+',52,218,510,116,102,C.green,true);
tx(s,'Cactus AI',52,342,510,43,34,C.ink,true);
tx(s,'Agreed to introduce GoLocal\nto 50+ service partners.',52,399,510,77,28);
tx(s,'10+',688,218,540,116,102,C.green,true);
tx(s,'YourCardare',688,342,540,43,34,C.ink,true);
tx(s,'Regional back-office partner.\nAnother 10+ providers in the pipeline.',688,399,540,77,27);
tx(s,'Next milestone: turn eligible agent requests into confirmed bookings',52,516,1176,46,31,C.ink,true);
const q1=tx(s,'Provider\nintroductions',52,593,310,62,26,C.ink,true);
const q2=tx(s,'Onboard providers\nand connect software',458,593,337,62,26,C.ink,true);
const q3=tx(s,'Test customer-authorized\nagent bookings',888,593,340,62,26,C.green,true);
arrow(s,q1,q2);arrow(s,q2,q3);
foot(s,6,'Founder-reported pipeline. Introductions are not live supply. GoLocal bookings and paid demand remain unproven.');
s.speakerNotes.text='Planned pilot: Salt Lake City plumbing. Founder-reported Cactus AI agreement to introduce GoLocal to 50+ service partners. Founder-reported YourCardare regional back-office relationship with another 10+ providers in the pipeline. Counts remain separate because overlap, city/category eligibility, consent and integration readiness are not established. These are introduction channels, not 60+ unique active providers or committed onboardings. The initial milestone is a customer-authorized, provider-confirmed booking through a permitted software connection. No live GoLocal booking, representative agent demand, paid revenue or production reliability has been established in the supplied materials. Pilot evidence should include where eligible requests originate, confirmation and fulfillment, failure/exception rates and contribution after costs. Supplier introductions are early access evidence; they do not establish demand distribution.';
// Team: tighter language, supplied credentials, no unscoped ranking claim.
(await repl(6,'Rohit Jain','Rohit Jain')).position={left:846,top:175,width:205,height:49};
(await repl(6,'Pulkit Walia','Pulkit Walia')).position={left:210,top:175,width:280,height:49};
await repl(6,'Built Asia’s largest home services marketplace from zero to a $3B IPO as an Urban Company founding team member.','Urban Company founding team member. Helped build the marketplace from launch to a $3B IPO.');
await repl(6,'Launched a home security brand at 19, scaling it to $700K in revenue.','Launched a home security brand at 19 and grew revenue to $700K.');
await repl(6,'Investor at Bessemer Venture Partners, deploying $50M in consumer AI startups.','Bessemer Venture Partners investor. Deployed $50M in consumer AI startups.');
await repl(6,'5 years as a Senior SWE at Amazon, Square and Citrix.','5 years as a senior software engineer at Amazon, Square and Citrix.');
await repl(6,'#1 system design tutor on Udemy, with 2,500 engineers taught.','Taught system design to 2,500 engineers on Udemy.');
await repl(6,'Built production-grade MCP integrations.','Built MCP integrations for production use.');
const role=await repl(6,'Operations and Partnerships','Operations and Partnerships');role.text.style={fontSize:23,typeface:"Helvetica Neue",color:C.green,bold:true,insets:0};
p.slides.items[6].speakerNotes.text='Founder-supplied biographies and credentials, not independently verified for this deck. Pulkit Walia: Urban Company founding team member, helped build from launch to a $3B IPO; launched a home security brand at 19 and grew it to $700K revenue; Bessemer Venture Partners investor with $50M deployed in consumer AI startups; Harvard Business School MBA. The IPO figure refers to Urban Company, not GoLocal. https://www.linkedin.com/in/pulkitwalia/ . Rohit Jain: five years as a senior software engineer at Amazon, Square and Citrix; taught 2,500 engineers system design on Udemy; production MCP integration experience; Texas A&M Computer Science and IIT Kharagpur. https://www.linkedin.com/in/rohit-jain-343437187/ . Founder/cofounder titles, ownership and employment commitment are not implied. Original supplied photos and education logos retained.';
p.slides.items[0].speakerNotes.text='GoLocal: local services, booked by your personal agent. GoLocal would organize participating providers and connect their software so personal agents can complete supported service bookings through a shared connection.';
await fs.mkdir(W+'/renders',{recursive:true});
for(let i=0;i<7;i++){await fs.writeFile(W+`/renders/slide-${i+1}.png`,new Uint8Array(await(await p.export({slide:p.slides.items[i],format:'png',scale:1.5})).arrayBuffer()));}
await(await PresentationFile.exportPptx(p)).save(W+'/candidate-seven.pptx');
// Six-slide competition version: brand the opportunity opening and preserve all six content slides.
const sid=(await p.inspect({select:'$.slides[*]',include:['id']})).records[0].id;p.delete([sid]);
await repl(0,'MARKET OPPORTUNITY','GOLOCAL');
const brand=(await p.inspect({select:'$.slides[0].elements[*]',include:['id','text']})).records.find(x=>x.text==='GOLOCAL');p.resolve(brand.id).text.style={fontSize:23,bold:true,color:C.green,typeface:'Helvetica Neue'};
tx(p.slides.items[0],'Local services, booked by your personal agent.',540,26,688,30,22,C.muted,false,'right');
for(let i=0;i<6;i++)await repl(i,`${i+2} / 7`,`${i+1} / 6`);
await fs.mkdir(W+'/submission-renders',{recursive:true});
for(let i=0;i<6;i++)await fs.writeFile(W+`/submission-renders/slide-${i+1}.png`,new Uint8Array(await(await p.export({slide:p.slides.items[i],format:'png',scale:1.5})).arrayBuffer()));
await(await PresentationFile.exportPptx(p)).save(W+'/candidate-six.pptx');
console.log('Both editable draft decks exported.');
