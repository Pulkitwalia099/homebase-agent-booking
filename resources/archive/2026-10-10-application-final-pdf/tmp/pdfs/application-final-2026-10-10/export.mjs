import fs from 'node:fs/promises';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
const p=await PresentationFile.importPptx(await FileBlob.load('/Users/pulkitwalia/Documents/ChatGPT/Homebase/output/pptx/golocal-pitch-v25.pptx'));
const b=await p.export({format:'pdf',scale:2});
await fs.writeFile('/Users/pulkitwalia/Documents/ChatGPT/Homebase/tmp/pdfs/application-final-2026-10-10/candidate.pdf',new Uint8Array(await b.arrayBuffer()));
console.log('Six-slide PDF exported from unchanged approved deck.');
