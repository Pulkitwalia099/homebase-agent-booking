import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/agent-logos-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v24.pptx')));
const ids=(await p.inspect({select:'$.slides[1].elements[*]',include:['id','kind']})).records.map(x=>x.id);p.delete(ids);
const s=p.slides.items[1];const C={ink:'#193C32',muted:'#65746C',bg:'#FBF9F4',green:'#236C4E',gray:'#F0F2EE',border:'#CDD5CE'};s.background.fill=C.bg;let n=0;
function tx(str,x,y,w,h,size=26,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',name:`booking-layer-text-${n++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return sh;}
function box(str,x,y,w,h,hub=false,size=24){const sh=s.shapes.add({geometry:'rect',name:`booking-layer-node-${n++}`,position:{left:x,top:y,width:w,height:h},fill:hub?C.green:C.gray,line:{fill:hub?C.green:C.border,width:1.5,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color:hub?'#FFFFFF':C.ink,bold:true,insets:8,verticalAlignment:'middle',alignment:'center',autoFit:'none',wrap:'square'};return sh;}
function link(a,b,straight=false,startArrow=true,endArrow=true){return s.shapes.connect(a,b,{kind:straight?'straight':'elbow',fromSide:'right',toSide:'left',line:{fill:C.green,width:2,style:'solid'},...(endArrow?{tail:{type:'arrow',width:'sm',length:'sm'}}:{}),...(startArrow?{head:{type:'arrow',width:'sm',length:'sm'}}:{})});}
tx('THE SHARED DATA AND BOOKING LAYER',52,27,1176,25,17,C.muted,true);
tx('GoLocal connects personal agents to local businesses',52,65,1176,66,44,C.ink,true);
tx('The data agents need already lives across businesses’ different software systems.',52,143,1176,48,27,C.muted);
tx('Personal agents',52,226,196,30,22,C.ink,true);
tx('$2B+ raised',52,260,196,28,19,C.muted);
tx('GoLocal',336,226,358,31,22,C.ink,true);
tx('Plumbing software stacks',750,223,280,27,21,C.ink,true);
tx('100+ listed options*',750,254,280,26,20,C.green,true);
tx('Plumbing\nbusinesses',1088,223,140,55,21,C.ink,true);
async function logo(file,alt,x,y,w,h,crop={left:0,top:0,right:0,bottom:0}){
 return s.images.add({blob:new Uint8Array(await fs.readFile(path.join(WORK,'assets',file))),contentType:file.endsWith('.png')?'image/png':'image/jpeg',alt,fit:'cover',crop,position:{left:x,top:y,width:w,height:h}});
}
const agentNames=['Instinct','Muse','Dots','Town','Hark','OpenClaw','Hermes'];
const agents=agentNames.map((name,i)=>{const sh=box(['Instinct','Dots'].includes(name)?name:'',52,290+i*40,196,34,false,22);sh.fill='#FFFFFF';sh.text.style={fontSize:22,typeface:'Helvetica Neue',color:'#101010',bold:true,insets:4,verticalAlignment:'middle',alignment:'center',autoFit:'none',wrap:'square'};return sh;});
await logo('muse.png','Muse supplied wordmark',95,334,110,27,{left:.08,top:.33,right:.065,bottom:.35});
await logo('town.jpeg','Town supplied wordmark',87,414,126,27,{left:.06,top:.395,right:.095,bottom:.37});
await logo('hark.jpeg','Hark supplied wordmark',101,453,98,28,{left:.21,top:.26,right:.21,bottom:.32});
await logo('openclaw.jpeg','OpenClaw supplied symbol',88,493,27,28,{left:.035,top:.07,right:.695,bottom:.11});
tx('OpenClaw',127,495,115,25,21,'#101010',true);
await logo('heremes.png','Hermes supplied icon',103,534,26,26);
const hermes=tx('Hermes',139,535,90,25,21,'#101010',true);
tx('Claude · Gemini · more',52,574,230,26,18,C.muted);

const hub=box('',336,290,358,288,true);
tx('GoLocal',357,312,315,47,37,'#FFFFFF',true);
tx('One data & booking API',357,367,315,37,23,'#FFFFFF',true);
tx('Services & coverage\nPricing & quote requirements\nLive availability',357,421,315,88,21,'#FFFFFF');
tx('Quote, book, pay & manage',357,532,315,31,22,'#FFFFFF',true);
const systems=[box('',750,289,280,78),box('',750,381,280,78),box('',750,473,280,84)];
tx('BuildOps, ServiceTitan',762,296,256,24,19,C.ink,true);
tx('Simpro, Probook AI',762,320,256,24,19,C.ink,true);
tx('+ other platforms',762,344,256,22,17,C.muted);
tx('Housecall Pro, FieldEdge',762,388,256,24,19,C.ink,true);
tx('Service Fusion, Commusoft',762,412,256,24,19,C.ink,true);
tx('Joblogic, Cactus AI + others',762,436,256,22,18,C.ink,true);
tx('Jobber, Workiz, ServiceM8',762,480,256,24,19,C.ink,true);
tx('Kickserv, Topline Pro',762,505,256,24,19,C.ink,true);
tx('+ many other platforms',762,532,256,21,17,C.muted);
const businesses=[box('Enterprise',1088,289,140,78,false,21),box('Mid-market',1088,381,140,78,false,21),box('Small\nbusinesses',1088,473,140,84,false,21)];
for(const a of agents)link(a,hub);
for(let i=0;i<systems.length;i++){link(hub,systems[i]);link(systems[i],businesses[i],true);}
tx('Just one service category: plumbing.\nThe software mix changes across categories.',750,567,478,39,18,C.green,true);
tx('We onboard businesses and connect their existing software.',52,607,1176,40,28,C.ink,true);
tx('One connection for agents. One integration for participating businesses.',52,652,1176,34,25,C.green);
tx('*100+ listed plumbing products, Software Advice. Segment examples overlap. Merchant authorization required.',52,695,1096,20,15,C.muted);
tx('2 / 6',1160,695,70,21,17,C.muted);
s.speakerNotes.text='Slide 2 now explicitly shows plumbing as one category. Founder requested several equally weighted vendor examples per provider segment so ServiceTitan is not visually presented as the single main platform. Illustrative enterprise row: BuildOps, ServiceTitan, Simpro, Probook AI and other platforms. Mid-market row: Housecall Pro, FieldEdge, Service Fusion, Commusoft, Joblogic, Cactus AI and others. Small-business row: Jobber, Workiz, ServiceM8, Kickserv, Topline Pro and many other platforms. These are overlapping segment examples, not exclusive customer tiers, an exhaustive vendor taxonomy, signed GoLocal integrations or a measured concentration claim. BuildOps explicitly serves commercial plumbing, Simpro Premium explicitly supports complex enterprise operations including plumbing; other named vendors advertise plumbing workflows. Probook and Cactus are AI operations/booking tools alongside field-service software. Category-level count: 100+ listed plumbing software options across all provider sizes. Software Advice category page shows 186 products in its listing, 212 in introductory copy, and 180 in the buyer guide/FAQ. The conservative 100+ wording avoids relying on an inconsistent exact count. This is a software-directory product count, including tools with differing scopes and geography, not a count of independent firms, production booking APIs, exclusively small-business vendors or enterprise providers. No separate 20+, 50+ or 100+ tier total established. Source accessed October 10 2026: https://www.softwareadvice.com/field-service/plumbing-software-comparison/ . New official vendor pages: https://buildops.com/industries/plumbing ; https://www.simprogroup.com/industries/plumbing-software ; https://www.simprogroup.com/solutions/simpro-premium ; https://www.commusoft.com/en-us/industries/plumbing-software/ ; https://www.servicefusion.com/plumbing-software ; https://www.joblogic.com/industries/plumbing-software/ ; https://www.kickserv.com/industries/plumbing . Prior sources and qualifications preserved in resources/software-stack-segments-2026-10-10.json and resources/plumbing-vendor-depth-evidence-2026-10-10.json. Character AI not added because no verified plumbing software role; the existing verified Cactus AI example is retained. Robinline excluded per founder direction. Topline Pro retained. Every category has its own software mix; Launch27 cleaning and LMN landscaping are existing source examples. Supplier authorization, supported actions and integrations remain required. No production or market-share claim. Left funnel, central GoLocal data/actions and bottom business message retained. $2B+ selected-company funding caption retains the basis in resources/agent-funding-evidence-2026-10-10.json and is not last-month-only or local-service demand.';

s.speakerNotes.text += '\nOctober 10 logo update: agent rows show Instinct, Muse, Dots, Town, Hark, OpenClaw and Hermes as illustrative demand-side products/frameworks, not signed partners or completed GoLocal integrations. Claude and Gemini are additional examples of the broader assistant/agent landscape. Their inclusion is supported by https://claude.com/resources/articles/dispatch-and-computer-use and https://gemini.google/about/ . No niche-by-niche count or market-share claim added. Original founder-supplied assets are embedded without redrawing or recoloring; native crop removes blank image margins and extracts the original OpenClaw symbol for use with an editable name. Dots images are promotional collages and remain unused to preserve consistency; Instinct and Dots use text. Duplicate Town/Hark attachments not repeated. Selected-startup $2B+ funding basis unchanged, not funding for all pictured examples or the last month. All prior business-software examples, supplier permissions and source qualifications retained.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
const b=await p.export({slide:s,format:'png',scale:2});
await fs.writeFile(path.join(WORK,'renders/slide-2.png'),new Uint8Array(await b.arrayBuffer()));
await(await PresentationFile.exportPptx(p)).save(path.join(WORK,'candidate.pptx'));
console.log('Agent logo draft exported.');
