import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/booking-story-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v11.pptx')));
const ids=(await p.inspect({select:'$.slides[2].elements[*]',include:['id','kind']})).records.map(x=>x.id);p.delete(ids);
const s=p.slides.items[2];const C={ink:'#193C32',muted:'#65746C',bg:'#FBF9F4',green:'#236C4E',gray:'#F0F2EE',border:'#CDD5CE'};s.background.fill=C.bg;let n=0;
function tx(str,x,y,w,h,size=26,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',name:`booking-story-text-${n++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return sh;}
function rect(x,y,w,h,fill){return s.shapes.add({geometry:'rect',name:`booking-story-flow-${n++}`,position:{left:x,top:y,width:w,height:h},fill,line:{fill:'none',width:0,style:'solid'}});}
tx('THE CUSTOMER EXPERIENCE',52,27,1176,25,17,C.muted,true);
tx('A customer request becomes a confirmed booking',52,65,1176,66,44,C.ink,true);
tx('CUSTOMER TO PERSONAL AGENT',52,165,1176,26,17,C.muted,true);
tx('“Book a plumber in Dallas tomorrow morning\nfor my leaking kitchen tap.”',52,203,1176,86,33,C.ink,true);
const stages=[
 {x:52,role:'PERSONAL AGENT',title:'1  Scope the job',body:'Collects the address and\na photo of the leak.\nDefines a diagnostic visit.'},
 {x:354,role:'GOLOCAL',title:'2  Check live options',body:'Matches connected providers.\nReturns available slots\nand visit fees.'},
 {x:656,role:'CUSTOMER + AGENT',title:'3  Approve the visit',body:'Chooses Oak Plumbing.\nApproves the $79 visit\nand payment authorization.'},
 {x:958,role:'GOLOCAL',title:'4  Confirm the booking',body:'Books in the provider’s system.\nReturns the booking ID\nand payment status.'}
];
const anchors=stages.map(v=>rect(v.x,323,270,2,C.border));
for(let i=0;i<3;i++)s.shapes.connect(anchors[i],anchors[i+1],{kind:'straight',fromSide:'right',toSide:'left',line:{fill:C.green,width:2,style:'solid'},tail:{type:'arrow',width:'sm',length:'sm'}});
for(const v of stages){tx(v.role,v.x,342,270,28,17,v.role==='GOLOCAL'?C.green:C.muted,true);tx(v.title,v.x,381,270,34,24,C.ink,true);tx(v.body,v.x,432,270,103,22,C.ink);}
rect(52,566,1176,108,C.green);
tx('Oak Plumbing confirmed for tomorrow, 9–11 am',73,582,1134,38,31,'#FFFFFF',true);
tx('Booking GL-1042. $79 visit fee authorized. Repairs quoted after inspection.',73,632,1134,29,23,'#FFFFFF');
tx('Illustrative customer journey. Provider, price, slot and booking ID are examples, not live transactions.',52,695,1096,20,15,C.muted);
tx('3 / 6',1160,695,70,21,17,C.muted);
s.speakerNotes.text='Illustrative proposed customer journey, October 10 2026. This replaces the architecture repeated on slide 3 with a concrete request-to-confirmation example. A customer in Dallas asks their personal agent to book a plumber tomorrow morning for a leaking kitchen tap. The agent collects address, a photo and necessary access information, then scopes a diagnostic visit. GoLocal queries participating, authorized business systems for eligible providers, service coverage, live slots and visit fees. The agent presents a bookable option, and the customer explicitly approves the provider, fee and payment authorization. GoLocal rechecks availability, uses the permitted booking operation in the provider system, and returns a confirmed booking ID and payment status only after the provider system accepts the booking. If availability changes or no suitable option exists, the agent offers another option instead of claiming success. Booking GL-1042, Oak Plumbing, $79 and 9–11 am are invented illustrative values, not an actual merchant, offer, market price or completed transaction. The $79 covers a diagnostic visit only. Repairs require a later provider quote and customer approval. Payment authorization is distinct from a settled payment and requires supported payment capabilities and customer consent. Actual quote, schedule, payment and booking capabilities vary across providers and software. The slide presents the intended experience and does not imply production readiness or automatic access to every merchant. Sources of the proposed product scope are resources/business-thesis.md and resources/current-thesis.md; no new factual performance, transaction volume or speed claim is introduced. Existing slides, user-supplied thesis facts and evidence remain unchanged.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v12.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v12.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt customer booking story and reimported six-slide deck.');
