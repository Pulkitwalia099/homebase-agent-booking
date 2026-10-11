import fs from 'node:fs/promises';
import path from 'node:path';
import {Presentation, PresentationFile} from '@oai/artifact-tool';
import {resolvePresentationFont, finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';

const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/sharks-pitch-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const font=resolvePresentationFont();
console.log('Font:',font);
const C={cream:'#F5F2E9',teal:'#103D3B',sage:'#BDCCAD',ink:'#173B38',muted:'#53716A',light:'#DDE4D6'};
const p=Presentation.create({slideSize:{width:1280,height:720}});
let sid=0;
function text(s,str,x,y,w,h,size=26,color=C.ink,bold=false){
  const sh=s.shapes.add({geometry:'textbox',name:`text-${sid++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});
  sh.text=str;
  sh.text.style={fontSize:size,color,bold,typeface:font,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};
  return sh;
}
function slide(label,n,dark=false){
  const s=p.slides.add();s.background.fill=dark?C.teal:C.cream;
  text(s,label.toUpperCase(),64,38,1000,28,17,dark?C.sage:C.muted,true);
  text(s,'GoLocal',64,666,400,25,17,dark?C.sage:C.muted);
  text(s,String(n).padStart(2,'0'),1176,666,44,25,17,dark?C.sage:C.muted);
  return s;
}
function band(s,color,x,y,w,h){s.shapes.add({geometry:'rect',position:{left:x,top:y,width:w,height:h},fill:color,line:{fill:'none',width:0,style:'solid'}});}
const thesis='Source: Founder-supplied GoLocal thesis, resources/business-thesis.md and output/docx/golocal-business-thesis.docx. The $2T local-services and $600B home-services market figures, and 15+ recent personal-agent startups raising billions, are founder-sourced claims preserved as requested. The source does not specify a consistent geography, measurement year or underlying market methodology. These are service-market figures, not projected GoLocal revenue. Home services is part of local services; the figures must not be added.';

// 1 — Cover. The sole raster asset is illustration; every word is editable.
{
 const s=p.slides.add();s.background.fill=C.teal;
 const b=await fs.readFile(path.join(ROOT,'assets/pitch/golocal-neighborhood.png'));
 s.images.add({blob:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),contentType:'image/png',alt:'An illustrated local neighborhood, contractor workshop and service van.',fit:'cover',position:{left:0,top:0,width:1280,height:720}});
 text(s,'GoLocal',64,100,545,100,80,C.cream,true);
 text(s,'Local services,\nbooked by your\npersonal agent.',64,225,485,190,47,C.cream,true);
 text(s,'The shared booking layer\nfor agents and local businesses.',64,447,455,85,25,C.light);
 text(s,'PULKIT WALIA  ·  FOUNDER',64,618,480,28,18,C.cream,true);
 text(s,'pwalia@mba2027.hbs.edu',64,651,480,28,18,C.light);
 s.speakerNotes.text='GoLocal makes local businesses bookable by personal agents. Start with a familiar contrast: it is easy to book a ride or order food, but a local-service request still ends in websites, forms and calls. This is a proposed business, with early supplier partnership commitments and no claimed live transaction volume. Cover illustration: original AI-generated artwork created for this deck on October 10, 2026. Tagline and business name supplied by the founder.';
}
// 2 — Market shift, pain and opportunity.
{
 const s=slide('The opportunity',2);
 text(s,'Personal agents are a new front door.\nLocal booking is still broken.',64,94,1140,118,48,C.teal,true);
 text(s,'Discovery is moving beyond Google. Completion still takes work.',64,224,1150,45,26,C.muted);
 text(s,'“Book a plumber for tomorrow.”',64,322,638,52,33,C.teal,true);
 text(s,'Search websites. Compare details.\nCheck availability. Fill forms. Make calls.',64,393,635,84,28);
 text(s,'Uber and DoorDash organized supply\nand made transactions simple.\nLocal services need that shared layer.',64,500,632,112,27);
 text(s,'$2T',816,305,382,95,78,C.teal,true);
 text(s,'local-services market',816,397,382,38,26);
 text(s,'$600B',816,460,382,81,62,C.teal,true);
 text(s,'home services alone',816,539,382,37,26);
 text(s,'15+ new personal-agent startups in recent months, raising billions.',64,623,1120,30,20,C.muted,true);
 s.speakerNotes.text=thesis+'\nThe market shift is the reason to build now: discovery is diversifying across personal agents, while the downstream booking flow remains fragmented. The proposed opportunity is to organize participating supply and expose booking actions, not merely scrape more listings. Existing businesses and platforms do offer booking APIs; the claim is fragmentation across local services, not that no interfaces exist. Sources: https://developer.doordash.com/en-US/mcp/ ; https://developers.booking.com/demand/docs/getting-started/overview ; https://sierra.ai/blog/introducing-personal-agent-protocol . The latter describes the gap between agents and existing websites/forms and is contextual support, not proof of GoLocal demand.';
}
// 3 — The product and why each side uses it.
{
 const s=slide('The solution',3);
 text(s,'One connection to local businesses\nthat personal agents can book.',64,94,1152,118,48,C.teal,true);
 text(s,'GoLocal combines participating supply with one MCP booking interface.',64,229,1138,42,26,C.muted);
 const xs=[64,466,868];
 const labels=['Personal agents','GoLocal','Local businesses'];
 const bodies=[
   'Get access to local providers.\nDiscover, filter, book and\nmanage the booking.',
   'Connect provider software.\nStandardize services, prices,\navailability and booking actions.',
   'Authorize one connection.\nReach every personal agent\nconnected to GoLocal.'
 ];
 for(let i=0;i<3;i++){
   text(s,labels[i],xs[i],334,350,49,32,C.teal,true);
   text(s,bodies[i],xs[i],410,350,123,25);
 }
 band(s,C.teal,64,556,1152,82);
 text(s,'We build on the software businesses already use.',88,579,1104,40,29,C.cream,true);
 s.speakerNotes.text='Proposed product, not a claim that these capabilities are already deployed. GoLocal recruits and authorizes participating businesses, connects their existing software, and exposes consistent discovery and booking actions through MCP or direct integrations. Agents receive supply access and less supplier recruitment and integration work. Businesses connect once to reach all agents integrated with GoLocal. Merchant-specific authorization is required; a vendor partnership does not authorize every customer. Supported software may permit OAuth authorization; other software requires credentials or custom integrations. The intended advantage over a generic connector is the combination of participating local supply, normalized booking actions, and reliable booking management. It is not a proven moat yet. Sources: founder thesis; https://developer.getjobber.com/docs/getting_started/ .';
}
// 4 — The strongest evidence: specific partnership commitments.
{
 const s=slide('Early validation',4,true);
 text(s,'Partners are opening access\nto our first local businesses.',64,94,1145,118,48,C.cream,true);
 text(s,'Partnership commitments',64,235,1000,38,25,C.sage,true);
 text(s,'100+',64,308,530,111,90,C.cream,true);
 text(s,'trade shops served by Cactus AI',64,424,545,43,28,C.cream,true);
 text(s,'Salt Lake City and Dallas.\nCactus agreed to introduce shops and\nprovide booking access through customers.',64,487,548,120,25,C.light);
 text(s,'20',713,308,485,111,90,C.cream,true);
 text(s,'clients committed for onboarding',713,424,485,43,28,C.cream,true);
 text(s,'A back-office management company\nagreed to onboard its clients.',713,487,484,95,25,C.light);
 text(s,'Access and onboarding commitments; integrations and live bookings are next.',64,619,1130,31,19,C.sage);
 s.speakerNotes.text='Primary evidence: founder reports supplied in this conversation, October 10, 2026. Cactus AI, a YC company, agreed to partner in Salt Lake City and Dallas, where it has 100+ mid-market trade-shop customers. The founder clarified that the partnership is for shop introductions and booking access through existing customers. This is a supply/integration channel, not evidence of consumer-agent demand routing. A separate back-office management company agreed to onboard its 20 clients. These counts are not active GoLocal merchants, must not be summed into 120+ unique customers, and do not establish production bookings or revenue. Commitment documentation and merchant-specific permissions remain to be operationalized. Positive customer interviews are reported, but no interview count, quotes or paid conversion metrics have been supplied. Public Cactus identity/product context: https://www.ycombinator.com/companies/oncactus . The public page does not document the private partnership.';
}
// 5 — Proposed commercial model and a specific distribution path.
{
 const s=slide('Business model and distribution',5);
 text(s,'Earn when a new customer’s\nbooking becomes a fulfilled job.',64,94,1150,118,48,C.teal,true);
 text(s,'Proposed model: a supplier-paid success fee, shared with the demand partner.',64,233,1144,70,26,C.muted);
 text(s,'Start with supply',64,342,340,48,28,C.teal,true);
 text(s,'Use Cactus and operating partners to onboard shops\nand connect their existing booking software.',452,336,750,88,26);
 text(s,'Secure demand',64,444,340,48,28,C.teal,true);
 text(s,'Partner with personal-agent companies to route requests.\nAlso test a user-added connector for a specific, urgent need.',452,438,752,88,26);
 text(s,'Prove, then expand',64,546,350,48,28,C.teal,true);
 text(s,'Start with one trade in a partner city. Earn repeat bookings,\nthen expand across trades, cities and agent platforms.',452,540,752,86,26);
 text(s,'Next proof: demand routing, reliable completion and willingness to pay. Fees are not yet agreed.',64,631,1136,27,18,C.muted);
 s.speakerNotes.text='Proposed commercial and distribution strategy, not signed pricing or achieved traction. Businesses would pay a success fee for a fulfilled booking that brings a new customer; an agreed portion would go to the personal-agent company providing demand. Fee levels, revenue share, payer willingness, attribution and unit economics are unvalidated. The consumer pays the underlying service price to the supplier. Do not conflate acquisition of a new customer with rescheduling an existing customer. First-party personal-agent distribution is an intended route, not a secured partnership. Cactus provides supplier access; it has not been presented as the personal-agent demand channel. A marketplace connector is a secondary route that still requires users to discover and install it. The initial trade and city remain to be selected from actual requests and supplier coverage in Salt Lake City and Dallas. No revenue projections are included because there are no measured booking volumes, conversion rates or agreed fees. Venture potential depends on repeatable demand distribution and transaction economics across suppliers, cities and agents, not merely the existence of a large services market.';
}
// 6 — Founder-market fit and engineering capability.
{
 const s=slide('The team',6);
 text(s,'A decade building local services.\nEngineering for the agent era.',64,94,1150,118,48,C.teal,true);
 text(s,'Pulkit Walia',64,311,520,60,44,C.teal,true);
 text(s,'Founder  ·  HBS MBA',64,376,530,40,25,C.muted,true);
 text(s,'Urban Company founding team.\nSpent a decade building local services\nin Asia, from zero to a $3B IPO.',64,444,532,114,28);
 text(s,'Rohit Jain',713,311,506,60,44,C.teal,true);
 text(s,'Engineering',713,376,506,40,25,C.muted,true);
 text(s,'Software engineering at Amazon and Square.\nBuilt production-grade MCP products.\nTechnical instructor with 24,000+ learners.',713,444,506,125,26);
 text(s,'Reimagining local services for a world of personal agents.',64,613,1148,43,29,C.teal,true);
 s.speakerNotes.text='Pulkit: founder-supplied facts, preserved as stated: Urban Company founding team member; a decade building the local-services platform in Asia; helped scale from zero to a $3 billion IPO. This is a company milestone, not Pulkit’s personal financial outcome. User profile: https://www.linkedin.com/in/pulkitwalia/ . Public founder reflection: https://www.linkedin.com/posts/pulkitwalia_urban-company-is-now-public-when-i-first-activity-7374240855139868672-U711 .\nRohit: user says he is the engineer on the team, built production-grade MCP products and teaches system design. Role commitment and cofounder/CTO status have not been established, so the deck uses Engineering. Primary profile context: https://laoh.ai/ links to the user-provided https://www.linkedin.com/in/rohit-jain-343437187/ and describes Amazon and Square engineering experience. Instructor total learners observed at 24,599 on https://www.udemy.com/user/a6a5d0a8-fdb1-40b1-84d5-1fe3a0861886/ ; displayed as 24,000+. This is total instructor reach, not a claim that every learner enrolled in a particular system-design course.';
}

await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
await fs.mkdir(path.join(ROOT,'output/pdf'),{recursive:true});
for(let i=0;i<p.slides.items.length;i++){
 const blob=await p.export({slide:p.slides.items[i],format:'png',scale:2});
 await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await blob.arrayBuffer()));
 console.log('Rendered',i+1);
}
const candidate=path.join(WORK,'candidate.pptx');
await (await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({
 explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,
 finalPath:path.join(ROOT,'output/pptx/golocal-sharks-pitch.pptx'),
 pythonExecutable:PY,
 integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],
 requiredNativeTableOwnerSlides:[],fontPolicy:{basis:'design',families:[font]},
 verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')
});
console.log('Created six-slide PPTX and PDF');
