import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const W=ROOT+'/tmp/pitch-v30-2026-10-10';
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const source='/Users/pulkitwalia/Downloads/golocal-sharks-pitch.pptx';
for(const [count,stem,finalName,tableSlide] of [[7,'seven','golocal-pitch-v30.pptx',2],[6,'six','golocal-pitch-v30-competition.pptx',1]]){
 const finalPath=ROOT+'/output/pptx/'+finalName;
 await finalizePresentation({explicitTotalSlideCount:count,workspaceDir:ROOT,candidatePath:W+'/candidate-'+stem+'.pptx',finalPath,pythonExecutable:'/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',integrityValidatorPath:SKILL+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:SKILL+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--validate-bullet-geometry','--require-native-table-slide',String(tableSlide)],requiredNativeTableOwnerSlides:[tableSlide],fontPolicy:{basis:'reference',families:['Helvetica Neue'],referencePath:source,referenceSha256:crypto.createHash('sha256').update(await fs.readFile(source)).digest('hex')},verifyArtifactToolImport:true,receiptPath:W+'/validation-final-'+stem+'.json'});
 const deck=await PresentationFile.importPptx(await FileBlob.load(finalPath));
 await fs.mkdir(W+'/final-'+stem,{recursive:true});
 for(let i=0;i<count;i++)await fs.writeFile(W+`/final-${stem}/slide-${i+1}.png`,new Uint8Array(await(await deck.export({slide:deck.slides.items[i],format:'png',scale:1})).arrayBuffer()));
 console.log(finalPath);
}
