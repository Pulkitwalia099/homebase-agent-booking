import fs from 'node:fs/promises';
import path from 'node:path';
import {Presentation, PresentationFile} from '@oai/artifact-tool';
import {resolvePresentationFont, finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/pitch-structure-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const font=resolvePresentationFont();
const C={ink:'#18352F',muted:'#606A67',teal:'#215C4E',pale:'#E5EFEA',gray:'#F3F4F2',border:'#CCD2CE',white:'#FFFFFF'};
const p=Presentation.create({slideSize:{width:1280,height:720}});let id=0;
function tx(s,str,x,y,w,h,size=26,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',name:`text-${id++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,color,bold,typeface:font,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return sh;}
function node(s,str,x,y,w,h,accent=false,size=24){const sh=s.shapes.add({geometry:'rect',name:`diagram-${id++}`,position:{left:x,top:y,width:w,height:h},fill:accent?C.pale:C.gray,line:{fill:accent?C.teal:C.border,width:1.5,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:font,color:C.ink,bold:accent,insets:10,verticalAlignment:'middle',alignment:'center',autoFit:'none',wrap:'square'};return sh;}
function link(s,a,b,both=false,kind='elbow'){return s.shapes.connect(a,b,{kind,fromSide:'right',toSide:'left',line:{fill:C.teal,width:2,style:'solid'},tail:{type:'arrow',width:'sm',length:'sm'},...(both?{head:{type:'arrow',width:'sm',length:'sm'}}:{})});}
function sl(label,n,title){const s=p.slides.add();s.background.fill=C.white;tx(s,label.toUpperCase(),48,30,1050,26,17,C.muted,true);tx(s,title,48,80,1184,124,44,C.ink,true);tx(s,'GoLocal',48,677,700,25,17,C.muted);tx(s,`${n} / 6`,1160,677,72,25,17,C.muted);return s;}
const fundingSources='Hark >$700M Series A: https://hark.com/articles/hark-announces-usd700-million-fundraising-round ; Instinct $1B Series C: https://www.businesswire.com/news/home/20260928153437/en/ ; earlier reported Instinct cumulative $350M: https://techcrunch.com/2026/08/26/viral-ai-startup-instinct-has-raised-350-million-at-a-2-5-billion-valuation/ ; Town $55M Series A: https://www.town.com/press/series-a . Selected-company total >$2.105B; not an exhaustive market aggregate. Excludes unverified Wajo funding and general AI-lab financing that cannot be allocated to Muse/Dots.';
const connectorSources='Muse platform guidelines: https://muse.ai/platform/docs . OpenAI plugin guidelines: https://developers.openai.com/plugins/plugin-guidelines and Dots supported installed/enabled plugins: https://learn.chatgpt.com/docs/dots/computers-and-apps . Claude directory versus custom: https://claude.com/docs/connectors/building/directory-vs-custom . Review, compatibility, account availability and permissions vary. Platforms support developer connectors; GoLocal is not approved or integrated yet.';
// 1: user-requested cumulative process matrix, kept native/editable.
{
const s=p.slides.add();s.background.fill=C.white;
tx(s,'GoLocal',48,26,330,58,46,C.ink,true);
tx(s,'Stripe for home-service bookings',420,37,810,44,30,C.teal,true);
tx(s,'Each platform made more of the local-service journey easier',48,110,1184,76,36,C.ink,true);
const values=[
 ['Customer task','Phone era\nYellow Pages','Web era\nGoogle / sites','Mobile era\nMaps','Agent era\nPersonal agents','GoLocal\nPlanned layer'],
 ['Find business','Directory','Search','Nearby search','Agent search','Agent search'],
 ['Compare options','Call around','Filters','Reviews','Agent compares','Structured data'],
 ['Check coverage','Address','Address / site','Map / distance','Browse / call','Coverage data'],
 ['Scope & quote','Call','Form / call','Site / call','Agent outreach','Quote workflow'],
 ['Check slots','Call','Site / call','Site / call','Agent outreach','Live slots'],
 ['Book the job','Call','Site / call','Site / call','Agent action','Booking tools'],
 ['Pay & manage','Direct','Direct','Direct','Agent action','Pay / manage']
];
const tb=s.tables.add({rows:8,columns:6,left:48,top:202,width:1184,height:392,columnWidths:[224,192,192,192,192,192],values});
tb.styleOptions={headerRow:false,bandedRows:false,firstColumn:false};
tb.borders.assign({style:'solid',fill:C.border,width:1});
tb.rows[0].height=70;for(let r=1;r<8;r++)tb.rows[r].height=46;
for(let r=0;r<8;r++)for(let c=0;c<6;c++){
 const cell=tb.getCell(r,c);cell.fill=r===0?C.gray:(c===5?C.pale:C.white);
 cell.text.style={fontSize:r===0?20:20,typeface:font,color:c===5?C.teal:C.ink,bold:r===0||c===0,alignment:c===0?'left':'center',verticalAlignment:'middle',wrap:'square',autoFit:'none'};
 tb.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:10,right:10,top:8,bottom:5}});
}
tx(s,'Local services, booked by your personal agent.',48,611,1184,40,28,C.teal,true);
tx(s,'Typical workflow; capabilities vary. Complex quotes still need business input. GoLocal tools are planned.',48,657,1134,26,17,C.muted);
tx(s,'1 / 6',1160,686,72,25,17,C.muted);
s.speakerNotes.text='Conceptual progression of customer tasks, not product launch chronology. Yellow Pages made businesses and phone numbers discoverable; calls remained manual. Web search and listing sites expanded search/filtering. Maps made location and reviews central, although reviews and ratings also predate Maps. Some search/Maps listings and existing vertical platforms already support appointments/payments. The matrix describes a typical fragmented local-service journey, not a universal absence of booking. Agents can act by browsing/calling; GoLocal would supply structured data and transaction tools for participating authorized businesses. Quotes can require follow-up, inspection or merchant acceptance. Payments require approved checkout, customer consent and platform-appropriate integrations. The Stripe analogy means shared transaction infrastructure, not a claim that GoLocal is a licensed payment processor or solely a payments company. No planned tool is presented as live.';
}
// 2: momentum, concrete demand surfaces and service market size.
{
const s=sl('Why now',2,'Billions are backing personal agents\nand a new way to find local services');
tx(s,'$2B+',48,219,350,103,84,C.teal,true);
tx(s,'raised by three agent companies',48,323,570,41,27,C.ink,true);
tx(s,'Hark: $700M+   |   Instinct: $1.35B   |   Town: $55M',48,373,755,34,23,C.muted);
tx(s,'$600B',890,226,330,82,62,C.ink,true);
tx(s,'home services within a\n$2T local-services market',890,310,330,78,25,C.muted);
tx(s,'Platforms are opening developer connector ecosystems',48,427,1170,42,28,C.ink,true);
node(s,'OpenAI Dots',48,482,234,64,false,25);node(s,'Meta Muse',314,482,234,64,false,25);node(s,'Claude',580,482,234,64,false,25);
tx(s,'Providers use different\nbooking systems.',890,440,332,93,27,C.teal,true);
tx(s,'Uber and DoorDash make booking straightforward.\nLocal-service agents still cross websites, calls and business systems\nto get a quote, a slot and a confirmed booking.',48,562,1184,100,26,C.ink);
s.speakerNotes.text=fundingSources+'\n'+connectorSources+'\nPrimary connector documentation accessed October 10 2026. Company-name shapes are editable logo positions for later design, not partnership logos. The shift of local discovery into many agents is the investment thesis, not a quantified share shift. Funding does not establish local-service request volume. Founder-sourced market figures ($2T local services, $600B home services) preserved from business-thesis.md; geography, year and methodology not supplied. Home services is a subset and the figures must not be added. They describe underlying services spending, not addressable GoLocal fee revenue. Existing competition includes https://updater.com/ ; claim concerns fragmentation and intended participating coverage, not no middleware anywhere. Agent platforms may have both consumer and business workflows; funding is company-level.';
}
// 3: explicitly requested native many-to-one-to-many architecture.
{
const s=sl('What we build',3,'One connection to compare and book\nparticipating local businesses');
tx(s,'One authorized business connection serves every connected agent.',48,210,1184,43,27,C.muted);
tx(s,'Personal agents',48,267,200,31,22,C.ink,true);
tx(s,'Shared data + actions',300,267,342,31,22,C.ink,true);
tx(s,'Business software',716,267,220,31,22,C.ink,true);
tx(s,'Local businesses',1026,267,206,31,22,C.ink,true);
const aa=[node(s,'Dots',48,319,184,54),node(s,'Muse',48,398,184,54),node(s,'Other agents',48,477,184,54)];
const hub=node(s,'',302,310,342,232,true);
tx(s,'GoLocal',322,325,302,47,34,C.teal,true);
tx(s,'Services & service areas\nPrices / quote requirements\nSlots & permitted job history',322,384,302,102,22,C.ink);
tx(s,'Quote • book • pay • manage',322,501,302,32,22,C.teal,true);
const bb=[node(s,'FSM / CRM A',718,319,214,54),node(s,'FSM / CRM B',718,398,214,54),node(s,'Other software',718,477,214,54)];
const cc=[node(s,'Trade shops',1028,319,204,54),node(s,'Home services',1028,398,204,54),node(s,'Other providers',1028,477,204,54)];
for(let i=0;i<3;i++){link(s,aa[i],hub,true);link(s,hub,bb[i],true);link(s,bb[i],cc[i],true,'straight');}
tx(s,'Calls: ask providers one at a time',48,566,570,38,25,C.muted,true);
tx(s,'GoLocal: query connected supply at once',654,566,578,38,25,C.teal,true);
tx(s,'Illustrative lookup target: ~15 minutes → under 5 seconds. Not measured; excludes scoping and booking.',48,620,1184,30,18,C.muted);
s.speakerNotes.text='Planned architecture. FSM = field service management; CRM = customer relationship management. System labels are generic integration targets, not signed vendors or live integrations. GoLocal recruits suitable participating supply, obtains merchant authorization, connects permitted business software and standardizes the data/action interface for agents. Existing systems remain authoritative for schedules, quotes and job status. Transaction history is exposed only where supported, authorized and appropriate. One integration per business provides access to the agents actually connected to GoLocal, not every agent in the market. APIs can compare participating providers without contacting each sequentially, but asynchronous availability, complex scope or provider acceptance can still require follow-up. The founder supplied ~15 minutes of calls to 3-4 providers versus an under-5-second API lookup as an illustration; it is not a measured benchmark, speed guarantee or full-booking latency. Quote, payment and management capabilities are proposed; payment collection can use approved external checkout and is separate from GoLocal success-fee monetization. Discovery must also prioritize fit, availability, consent and service coverage, not merely lowest price. GoLocal has no claimed live bookings.';
}
// 4: business + unsolved customer-side distribution, recommendation conditional.
{
const s=sl('Business model and distribution',4,'GoLocal earns when a new customer’s\nbooking becomes a fulfilled job');
tx(s,'Proposed: the supplier pays a success fee. GoLocal shares an agreed\nportion with the partner that brings the customer.',48,216,1184,85,28,C.ink);
tx(s,'Direct agent partnership',48,338,540,43,31,C.teal,true);
tx(s,'An agent platform routes relevant requests\nto GoLocal as an integrated booking tool.\nA partnership still needs to be secured.',48,395,548,111,26,C.ink);
tx(s,'User-added connector',694,338,538,43,31,C.teal,true);
tx(s,'Reach an audience with an urgent need.\nHelp them add GoLocal to their agent.\nInstallation requires customer acquisition.',694,395,538,111,26,C.ink);
const a=node(s,'Approved connector',48,550,310,66,false,23);const b=node(s,'Useful completed tasks',484,550,310,66,true,23);const c=node(s,'Broader discovery',920,550,312,66,false,23);link(s,a,b,false,'straight');link(s,b,c,false,'straight');
tx(s,'Strong utility can support recommendations; placement is platform-dependent. Fees and routes remain open.',48,635,1184,26,17,C.muted);
s.speakerNotes.text='Business proposal, not signed pricing, revenue projections or validated unit economics. Supplier pays for a fulfilled job from a new customer; proposed partner share is not agreed. New-customer acquisition and serving an existing customer are separate hypotheses. Payment processing itself is not assumed to be the monetization model. Direct agent-platform routing requires a secured partnership; supplier partner Cactus is not that demand partner. A marketplace/directory connector still needs user discovery and consent. One prompt may start installation on supported platforms; permissions, review and custom integration requirements vary. These are routes under exploration, not exclusive or finalized. '+connectorSources+'\nMuse separates approved connector discovery from editorial featuring and guarantees neither ranking nor traffic. OpenAI says strong utility/satisfaction may support enhanced placement or proactive suggestions. Claude directory listings are eligible for Suggested Connectors; custom connectors are not. Transaction history alone is not a published universal ranking mechanism. Early presence can help learn and prove utility; there is no guaranteed first-mover distribution advantage. Important tests: who installs/routes requests, how many requests finish, whether suppliers pay, and contribution after acquisition, integration and support costs.';
}
// 5: partner traction and near-term concrete route to bookings.
{
const s=sl('What is coming together',5,'Partners have agreed to open access\nto the first local businesses');
tx(s,'100+',48,231,540,104,86,C.teal,true);
tx(s,'trade shops served by Cactus AI',48,348,552,45,29,C.ink,true);
tx(s,'Salt Lake City and Dallas.\nCactus agreed to introduce shops and\nprovide booking access through its customers.',48,415,558,120,26,C.ink);
tx(s,'20',704,231,528,104,86,C.teal,true);
tx(s,'clients committed for onboarding',704,348,528,45,29,C.ink,true);
tx(s,'A separate back-office management\ncompany agreed to onboard its clients.',704,415,528,94,26,C.ink);
const a=node(s,'One trade + one city',48,567,310,66,false,23);const b=node(s,'Connect authorized supply',484,567,310,66,false,23);const c=node(s,'Route and fulfill real jobs',920,567,312,66,true,23);link(s,a,b,false,'straight');link(s,b,c,false,'straight');
tx(s,'Founder-reported commitments. These are not live GoLocal merchants, integrations, bookings or revenue.',48,645,1184,26,17,C.muted);
s.speakerNotes.text='Founder reports October 10 2026: Cactus AI (YC) serves 100+ mid-market trade shops in Salt Lake City and Dallas and agreed to introductions and booking access through its existing customers. Separate back-office management company agreed to onboard its 20 clients. Counts are not unique live GoLocal customers and are not summed. No active integration, request-routing partner, production booking, paid continuation or revenue established. Positive interviews and partnership calls reported without a count or attributable testimonials. Public Cactus identity: https://www.ycombinator.com/companies/oncactus ; public profile does not prove the private commitment. Initial trade and city to be selected from eligible requests and partner access, not assumed Boston cleaning. Next tasks include getting merchant-specific authorization and an actual customer demand channel. Team should show the product completes permitted scoped actions rather than only serving listings.';
}
// 6: precise experience without inflated role titles.
{
const s=sl('The team',6,'A decade building local services\nwith engineering for the agent era');
tx(s,'Pulkit Walia',48,262,552,65,45,C.ink,true);
tx(s,'Founder  |  HBS MBA',48,342,552,41,26,C.teal,true);
tx(s,'Urban Company founding team.\nSpent a decade building local services\nin Asia, from zero to a $3B IPO.',48,410,559,129,29,C.ink);
tx(s,'Rohit Jain',704,262,528,65,45,C.ink,true);
tx(s,'Engineering',704,342,528,41,26,C.teal,true);
tx(s,'Backend engineer with experience\nat Amazon and Square.\nBuilt production-grade MCP products.\nTeaches system design.',704,410,528,163,27,C.ink);
tx(s,'GoLocal: the shared data and booking layer for home services.',48,615,1184,43,28,C.teal,true);
s.speakerNotes.text='Pulkit founder-supplied: Urban Company founding team member, decade building Asia local services, helped scale company zero to $3B IPO. Company milestone, not personal wealth. HBS MBA student. Profile https://www.linkedin.com/in/pulkitwalia/ . Rohit is shown as Engineering as supplied, not an inferred CTO/cofounder title; role commitment unspecified. Founder reports production-grade MCP products and system-design teaching. Engineering employer context: https://laoh.ai/ links to supplied https://www.linkedin.com/in/rohit-jain-343437187/ . Relevant fit is operational experience building local services plus backend and transaction systems. Connector, demand and unit-economics proof is still required.';
}
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<p.slides.items.length;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));console.log('Rendered',i+1);}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-structure.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:[font]},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation-complete.json')});
console.log('Finalized structure deck');
