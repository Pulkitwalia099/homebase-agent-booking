import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/segmented-software-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v12.pptx')));
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
tx('Fragmented software\nField service + AI tools',750,223,280,55,21,C.ink,true);
tx('Local service\nproviders',1088,223,140,55,21,C.ink,true);
const agents=['Instinct','Muse','Dots','Town','Hark'].map((name,i)=>box(name,52,299+i*56,196,43,false,25));
const hub=box('',336,290,358,288,true);
tx('GoLocal',357,312,315,47,37,'#FFFFFF',true);
tx('One data & booking API',357,367,315,37,23,'#FFFFFF',true);
tx('Services & coverage\nPricing & quote requirements\nLive availability',357,421,315,88,21,'#FFFFFF');
tx('Quote, book, pay & manage',357,532,315,31,22,'#FFFFFF',true);
const systems=[box('',750,289,280,70),box('',750,381,280,70),box('',750,473,280,84)];
tx('ServiceTitan',762,299,256,27,22,C.ink,true);
tx('Probook AI (AI operations)',762,331,256,24,18,C.ink);
tx('Housecall Pro, FieldEdge',762,391,256,27,20,C.ink,true);
tx('Cactus AI (AI booking)',762,423,256,24,18,C.ink);
tx('Jobber, Workiz, ServiceM8',762,480,256,25,19,C.ink,true);
tx('Topline Pro',762,506,256,24,19,C.ink);
tx('and many others',762,532,256,21,17,C.muted);
const businesses=[box('Enterprise',1088,289,140,70,false,21),box('Mid-market',1088,381,140,70,false,21),box('Small\nbusinesses',1088,473,140,84,false,21)];
for(const a of agents)link(a,hub);
for(let i=0;i<systems.length;i++){link(hub,systems[i]);link(systems[i],businesses[i],true);}
tx('A different software mix\nfor every service category.',750,567,478,39,18,C.green,true);
tx('We onboard businesses and connect their existing software.',52,607,1176,40,28,C.ink,true);
tx('One connection for agents. One integration for participating businesses.',52,652,1176,34,25,C.green);
tx('Illustrative stacks; vendors serve overlapping segments. Connections require merchant authorization.',52,695,1096,20,15,C.muted);
tx('2 / 6',1160,695,70,21,17,C.muted);
s.speakerNotes.text='Slide 2 refinement requested by founder, October 10 2026. Existing agent funnel, GoLocal block and bottom messages retained. The right side now shows several software and AI tool examples by local-provider size. Enterprise example: ServiceTitan (field-service management) and Probook AI (AI operations and dispatch). Probook site features large providers including 220-technician and 170-technician examples, and the ServiceTitan marketplace lists its integration. Mid-market illustration: Housecall Pro, FieldEdge, and Cactus AI as an AI booking layer. Small-business illustration: Jobber, Workiz, ServiceM8, Topline Pro and many others. Topline Pro advertises AI marketing, job qualification, quoting and payments for solo operators and growing teams. Robinline was researched but excluded at the founder request because its current focus is cleaning. Topline Pro inclusion follows the founder instruction. Role descriptions are vendor self-descriptions, not independent verification of production performance. These are overlapping segment examples, not a market-share taxonomy, exclusive tier allocation or proof that each business uses every named tool. Housecall Pro explicitly serves teams of 1 to 100+, and providers can choose different stacks. Probook and Cactus are labeled AI tools rather than substituting for the authoritative FSM system. User clarified Pro AI means Probook AI. Cactus mid-market access is founder supplied from the partnership conversation; public site establishes AI call handling and CRM booking. The software mix changes across service categories: Launch27 advertises cleaning software and LMN landscape management, supporting category-specific choices in addition to general-purpose systems. Many others is qualitative; no 500+ count or concentration statistic established. Software examples do not imply signed GoLocal integrations, universal API access or merchant authorization. GoLocal proposed data/actions unchanged. Cactus partner access does not establish demand routing or production bookings. Evidence snapshot: resources/software-stack-segments-2026-10-10.json. Official sources accessed October 10 2026: https://www.probook.ai/ ; https://marketplace.servicetitan.com/partner/probook ; https://www.servicetitan.com/industries/plumbing-software ; https://www.housecallpro.com/ ; https://fieldedge.com/ ; https://www.oncactus.com/ ; https://www.ycombinator.com/companies/oncactus ; https://developer.getjobber.com/docs/ ; https://www.workiz.com/features/dispatching/ ; https://www.servicem8.com/ ; https://www.launch27.com/ ; https://granum.com/lmn/ ; https://www.toplinepro.com/ ; https://www.robinline.com/ . Existing $2B+ selected-company funding caption retained, not last-month-only or local-service demand. Funding evidence resources/agent-funding-evidence-2026-10-10.json covers Hark, Instinct and Town; no unverified product-specific OpenAI/Meta funding allocation.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v13.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v13.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt market/problem opening and reimported six-slide deck.');
