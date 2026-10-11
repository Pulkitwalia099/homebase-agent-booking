import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/software-fragmentation-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v10.pptx')));
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
tx('Fragmented\nsoftware vendors',788,223,184,55,21,C.ink,true);
tx('Local businesses\nExample: plumbing',1036,223,192,55,21,C.ink,true);
const agents=['Instinct','Muse','Dots','Town','Hark'].map((name,i)=>box(name,52,299+i*56,196,43,false,25));
const hub=box('',336,290,358,288,true);
tx('GoLocal',357,312,315,47,37,'#FFFFFF',true);
tx('One data & booking API',357,367,315,37,23,'#FFFFFF',true);
tx('Services & coverage\nPricing & quote requirements\nLive availability',357,421,315,88,21,'#FFFFFF');
tx('Quote, book, pay & manage',357,532,315,31,22,'#FFFFFF',true);
const systems=['ServiceTitan','FieldEdge','Housecall Pro','Jobber','Other systems'].map((name,i)=>box(name,788,299+i*56,184,43,false,name==='Housecall Pro'?21:23));
const businesses=[box('Enterprise',1036,305,192,62,false,23),box('Mid-market',1036,409,192,62,false,23),box('Small businesses',1036,513,192,62,false,21)];
const junction=s.shapes.add({geometry:'rect',name:'software-business-junction',position:{left:1003,top:439,width:2,height:2},fill:'none',line:{fill:'none',width:0,style:'solid'}});
for(const a of agents)link(a,hub);
for(const system of systems){link(hub,system);link(system,junction,false,true,false);}
for(const business of businesses)link(junction,business,false,false,true);
tx('We onboard businesses and connect their existing software.',52,607,1176,40,28,C.ink,true);
tx('One connection for agents. One integration for participating businesses.',52,652,1176,34,25,C.green);
tx('Proposed network. Software examples and connections are illustrative; merchant authorization is required.',52,695,1096,20,15,C.muted);
tx('2 / 6',1160,695,70,21,17,C.muted);
s.speakerNotes.text='Founder-requested software fragmentation refinement, October 10 2026. Agent funnel, GoLocal data/action hub, supplier onboarding line and one-connection benefits retained. Right-hand diagram now shows multiple distinct software vendors serving one category (plumbing), rather than one functional software category per service. ServiceTitan, FieldEdge, Housecall Pro and Jobber each advertise plumbing business software; Other systems signals additional potential systems. A shared wiring junction connects the software examples to enterprise, mid-market and small-business provider segments. This is an illustrative ecosystem, not a vendor-to-size assignment, a claim that a specific provider uses every listed system, an exhaustive vendor list, concentration measurement or proof that no vendor dominates. Software names are examples, not signed GoLocal integrations. Enterprise/mid-market/SME segments represent different provider sizes; no exclusive software allocation or 5% share claim. Official source pages accessed October 10 2026: https://www.servicetitan.com/industries/plumbing-software ; https://fieldedge.com/plumbing-software/ ; https://www.housecallpro.com/plumbing/ ; https://www.getjobber.com/industries/plumbing-estimating-software/ . Evidence snapshot resources/plumbing-software-examples-2026-10-10.json. Proposed GoLocal network connects authorized supplier systems and exposes services, coverage, pricing/quote requirements, live availability, quoting, booking, payments and management. System capabilities vary; complex scoping may need provider input, merchant authorization and permitted operations. No production bookings, platform partnerships or universal API availability claimed. The five named agents remain illustrative. $2B+ caption is sourced selected-company funding, not last-month-only or local-service demand: Hark https://hark.com/articles/hark-announces-usd700-million-fundraising-round ; Instinct https://www.businesswire.com/news/home/20260928153437/en/ and earlier reported total https://techcrunch.com/2026/08/26/viral-ai-startup-instinct-has-raised-350-million-at-a-2-5-billion-valuation/ ; Town https://www.town.com/press/series-a . Funding excludes unverified product-specific OpenAI/Meta allocations. Existing business systems remain authoritative. Architecture follows local business/current theses and founder direction.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v11.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v11.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt market/problem opening and reimported six-slide deck.');
