import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/opportunity-close-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v8.pptx')));
const rec=(await p.inspect({select:'$.slides[0].elements[*]',include:['id','kind','text']})).records;
const old=rec.find(x=>x.kind==='textbox'&&x.text==='Agents still rely on calls and websites to turn a request into a completed booking.');
if(!old)throw Error('Missing slide 1 closing line');p.delete(old.id);
const close=p.slides.items[0].shapes.add({geometry:'textbox',name:'opportunity-close',position:{left:52,top:622,width:1176,height:65},fill:'none',line:{fill:'none',width:0,style:'solid'}});
close.text='A platform that solves the final three steps can complete local-service bookings\nand capture value in the $1.2 trillion+ U.S. market.';
close.text.style={fontSize:26,typeface:'Helvetica Neue',color:'#193C32',bold:true,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};
p.slides.items[0].speakerNotes.text += '\nOpportunity close requested by the founder: solving quotes, live availability and booking/payment can enable end-to-end local-service bookings and value capture. This is the commercial thesis, not evidence of achieved integration, measured revenue share or guaranteed large market capture. Reachable supply, permitted operations, reliability and demand distribution remain necessary. User requested finishing slide 1 before revising slide 2; other slides remain unchanged.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v9.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v9.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt market/problem opening and reimported six-slide deck.');
