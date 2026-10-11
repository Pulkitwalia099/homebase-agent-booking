import fs from 'node:fs/promises';
import {FileBlob, PresentationFile} from '@oai/artifact-tool';
const root='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const p=await PresentationFile.importPptx(await FileBlob.load(root+'/output/pptx/golocal-sharks-pitch.pptx'));
await fs.mkdir(root+'/tmp/sharks-pitch-2026-10-10/final-renders',{recursive:true});
for(let i=0;i<p.slides.items.length;i++){
 const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});
 await fs.writeFile(root+`/tmp/sharks-pitch-2026-10-10/final-renders/slide-${i+1}.png`,new Uint8Array(await b.arrayBuffer()));
}
console.log('Final PPTX reimported and all',p.slides.items.length,'slides rendered.');
