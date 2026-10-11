import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/cover-slide0-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const source=path.join(ROOT,'output/pptx/golocal-pitch-v25.pptx');
const finalPath=path.join(ROOT,'output/pptx/golocal-pitch-v26.pptx');
await finalizePresentation({explicitTotalSlideCount:7,workspaceDir:ROOT,candidatePath:path.join(WORK,'candidate.pptx'),finalPath,pythonExecutable:'/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--validate-bullet-geometry','--require-native-table-slide','2'],requiredNativeTableOwnerSlides:[2],fontPolicy:{basis:'reference',families:['Helvetica Neue'],referencePath:source,referenceSha256:crypto.createHash('sha256').update(await fs.readFile(source)).digest('hex')},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation-v26.json')});
const p=await PresentationFile.importPptx(await FileBlob.load(finalPath));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<7;i++){
 const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});
 await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));
}
await fs.writeFile(path.join(WORK,'final-content.ndjson'),(await p.inspect({select:'$.slides[*]',include:['id','index','elements.id','elements.kind','elements.text','notes.text']})).ndjson);
await fs.copyFile(path.join(WORK,'final-renders/slide-1.png'),path.join(ROOT,'output/pptx/previews/golocal-cover-slide0.png'));
console.log('Final seven-slide deck and cover preview saved.');
