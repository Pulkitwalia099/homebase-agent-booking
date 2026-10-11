import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/instinct-label-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-slide1-refined-v2.pptx')));
const matches=(await p.inspect({select:'$.slides[2].elements[?(@.text == "Dots")]',include:['id','text']})).records;
if(matches.length!==1)throw new Error('Expected one Dots node on slide 3');
p.resolve(matches[0].id).text.replace('Dots','Instinct');
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v3.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v3.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Replaced Dots with Instinct on slide 3; six-slide deck exported and reimported.');
