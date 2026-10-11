import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/era-label-update-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-slide1-refined.pptx')));
const s=p.slides.items[0];const tb=s.tables.items[0];
const headers=['Pre-2000\nYellow Pages','2000–2010\nGoogle /\nCraigslist','2010–2025\nGoogle Maps','2026+\nAI agents','AI agents\n+ GoLocal'];
for(let c=1;c<6;c++)tb.getCell(0,c).value=headers[c-1];
s.speakerNotes.text+='\n\nFounder correction, October 10 2026: displayed eras are now Pre-2000 Yellow Pages; 2000–2010 Google/Craigslist; 2010–2025 Google Maps; 2026+ AI agents. These are conceptual local-service channel eras selected by the founder, not launch dates and not evidence that the products first existed in those periods. The final table heading reads AI agents + GoLocal, with no Next/planned label. It describes product capabilities; this wording change does not establish deployed integrations or completed bookings. Historical source dates in earlier notes remain evidence of invention dates, not the displayed channel-era boundaries.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-slide1-refined-v2.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-slide1-refined-v2.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Applied five header changes; exported and reimported six-slide deck.');
