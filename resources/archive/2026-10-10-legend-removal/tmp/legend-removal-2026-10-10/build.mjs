import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/legend-removal-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v7.pptx')));
const rec=(await p.inspect({select:'$.slides[*].elements[*]',include:['id','kind','text']})).records;
const legends=rec.filter(x=>x.kind==='textbox'&&(x.text==='✓  Platform unlock'||x.text==='—  Still manual / external')).map(x=>x.id);
if(legends.length!==2)throw Error('Expected two legend shapes');
p.delete(legends);
for(const [oldText,newText] of [['≈$1.2T U.S. local-services opportunity','$1.2 trillion+ U.S. local-services opportunity'],['≈$1.2T','$1.2T+']]){
 const shape=rec.find(x=>x.kind==='textbox'&&x.text===oldText);if(!shape)throw Error('Missing target text');p.resolve(shape.id).text.replace(oldText,newText);
}
for(let i=0;i<2;i++)p.slides.items[i].speakerNotes.text += '\nFounder-requested headline wording, October 10 2026: $1.2 trillion+. This is the founder’s broad-market estimate/framing. The sourced selected-category sum remains approximately $1.2T, with mixed observation years and materials/DIY included; no independent $1.2T+ lower-bound calculation was added. The original market research is preserved unchanged.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v8.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v8.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt market/problem opening and reimported six-slide deck.');
