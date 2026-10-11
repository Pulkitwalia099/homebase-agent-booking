import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/cover-slide0-2026-10-10');
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v25.pptx')));
const oldIds=(await p.inspect({select:'$.slides[*]',include:['id']})).records.map(r=>r.id);
for(let i=0;i<6;i++){
 const all=(await p.inspect({select:`$.slides[${i}].elements[*]`,include:['id','text']})).records;
 const hits=all.filter(r=>r.text===`${i+1} / 6`);
 if(hits.length!==1)throw new Error(`Missing footer ${i+1}`);
 p.resolve(hits[0].id).text.replace(`${i+1} / 6`,`${i+2} / 7`);
}
const s=p.slides.add({background:{fill:'#FBF9F4'}});
const ids=(await p.inspect({select:'$.slides[*]',include:['id']})).records.map(r=>r.id);
p.slides.reorder([ids.at(-1),...oldIds]);
function tx(text,x,y,w,h,size,color,bold=false){
 const sh=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});
 sh.text=text;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',alignment:'left',wrap:'square'};
}
tx('GoLocal',52,244,1176,137,108,'#193C32',true);
tx('Local services, booked by your personal agent.',56,396,1168,62,36,'#236C4E');
tx('1 / 7',1160,695,70,21,17,'#65746C');
s.speakerNotes.text='Requested introductory cover, October 10 2026. Uses approved business name GoLocal and existing tagline: Local services, booked by your personal agent. The six approved content slides follow unchanged except pagination. Seven total slides exceed the application six-page maximum; this is a separate cover version, not a replacement of the six-page application PDF.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
const b=await p.export({slide:s,format:'png',scale:2});
await fs.writeFile(path.join(WORK,'renders/slide-1.png'),new Uint8Array(await b.arrayBuffer()));
await(await PresentationFile.exportPptx(p)).save(path.join(WORK,'candidate.pptx'));
console.log('Cover added; seven-slide draft exported.');
