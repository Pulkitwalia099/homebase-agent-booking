import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/agent-booking-layer-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v9.pptx')));
const ids=(await p.inspect({select:'$.slides[1].elements[*]',include:['id','kind']})).records.map(x=>x.id);p.delete(ids);
const s=p.slides.items[1];const C={ink:'#193C32',muted:'#65746C',bg:'#FBF9F4',green:'#236C4E',gray:'#F0F2EE',border:'#CDD5CE'};s.background.fill=C.bg;let n=0;
function tx(str,x,y,w,h,size=26,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',name:`booking-layer-text-${n++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return sh;}
function box(str,x,y,w,h,hub=false,size=24){const sh=s.shapes.add({geometry:'rect',name:`booking-layer-node-${n++}`,position:{left:x,top:y,width:w,height:h},fill:hub?C.green:C.gray,line:{fill:hub?C.green:C.border,width:1.5,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color:hub?'#FFFFFF':C.ink,bold:true,insets:8,verticalAlignment:'middle',alignment:'center',autoFit:'none',wrap:'square'};return sh;}
function link(a,b,straight=false){return s.shapes.connect(a,b,{kind:straight?'straight':'elbow',fromSide:'right',toSide:'left',line:{fill:C.green,width:2,style:'solid'},tail:{type:'arrow',width:'sm',length:'sm'},head:{type:'arrow',width:'sm',length:'sm'}});}
tx('THE SHARED DATA AND BOOKING LAYER',52,27,1176,25,17,C.muted,true);
tx('GoLocal connects personal agents to local businesses',52,65,1176,66,44,C.ink,true);
tx('The data agents need already lives across businesses’ different software systems.',52,143,1176,48,27,C.muted);
tx('Personal agents',52,226,196,30,22,C.ink,true);
tx('$2B+ raised',52,260,196,28,19,C.muted);
tx('GoLocal',336,226,358,31,22,C.ink,true);
tx('Fragmented\nbusiness software',788,223,184,55,21,C.ink,true);
tx('Fragmented\nlocal businesses',1036,223,192,55,21,C.ink,true);
const agents=['Instinct','Muse','Dots','Town','Hark'].map((name,i)=>box(name,52,299+i*56,196,43,false,25));
const hub=box('',336,290,358,288,true);
tx('GoLocal',357,312,315,47,37,'#FFFFFF',true);
tx('One data & booking API',357,367,315,37,23,'#FFFFFF',true);
tx('Services & coverage\nPricing & quote requirements\nLive availability',357,421,315,88,21,'#FFFFFF');
tx('Quote, book, pay & manage',357,532,315,31,22,'#FFFFFF',true);
const systems=[box('Field service\nsoftware',788,305,184,62,false,22),box('Booking\nsoftware',788,409,184,62,false,22),box('CRM / other\nsoftware',788,513,184,62,false,22)];
const businesses=[box('Plumbing\nbusinesses',1036,305,192,62,false,22),box('Cleaning\nbusinesses',1036,409,192,62,false,22),box('Other local\nbusinesses',1036,513,192,62,false,22)];
for(const a of agents)link(a,hub);
for(let i=0;i<3;i++){link(hub,systems[i]);link(systems[i],businesses[i],true);}
tx('We onboard businesses and connect their existing software.',52,607,1176,40,28,C.ink,true);
tx('One connection for agents. One integration for participating businesses.',52,652,1176,34,25,C.green);
tx('Proposed network. Agent names and system categories are illustrative; merchant authorization is required.',52,695,1096,20,15,C.muted);
tx('2 / 6',1160,695,70,21,17,C.muted);
s.speakerNotes.text='Slide 2 rebuilt at the founder’s request, October 10 2026. GoLocal is the proposed shared data and booking layer linking five illustrative personal-agent platforms (Instinct, Muse, Dots, Town, Hark) to participating local businesses through authorized connections to existing fragmented business software. Native editable names stand in for later logos. No demand partnerships with these platforms or deployed integrations are claimed. Software boxes are categories, not signed vendors; business categories are examples, not a chosen wedge. Paired diagram rows are illustrative, not exclusive software/category relationships. Two-way connectors represent requests and data/results. Much of the required information is already maintained in provider systems, but quote/scoping rules, live availability, payment and management actions vary by system and need permitted operations and merchant authorization. Complex quotes may require provider input. GoLocal recruits/onboards participating businesses, connects their systems, standardizes services, coverage, pricing/quote requirements and schedules, and exposes quote, book, pay and management tools. These are proposed capabilities, not live/production-validated completion. Data is authorized and existing business software remains authoritative. One connection reaches actually connected agents and participating businesses; not all agents or all businesses. Payment tooling need not make GoLocal a payment processor. Funding caption $2B+ is the previously sourced selected-company subtotal, not funding of every named product or a last-month-only total. Hark >$700M: https://hark.com/articles/hark-announces-usd700-million-fundraising-round ; Instinct $1B round: https://www.businesswire.com/news/home/20260928153437/en/ ; earlier Instinct $350M reported cumulative: https://techcrunch.com/2026/08/26/viral-ai-startup-instinct-has-raised-350-million-at-a-2-5-billion-valuation/ ; Town $55M: https://www.town.com/press/series-a . No unverified 5% software concentration statistic used. Architecture based on business-thesis.md and current-thesis.md; no new capability claims about individual vendor APIs. Distribution remains an open commercial question covered later in the deck.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v10.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v10.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt market/problem opening and reimported six-slide deck.');
