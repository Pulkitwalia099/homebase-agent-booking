import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const R='/Users/pulkitwalia/Documents/ChatGPT/Homebase',W=R+'/tmp/pitch-v32-2026-10-10';
for(const [stem,file,i] of [['seven','golocal-pitch-v31.pptx',4],['six','golocal-pitch-v31-competition.pptx',3]]){
 const p=await PresentationFile.importPptx(await FileBlob.load(R+'/output/pptx/'+file));
 const s=p.slides.items[i];
 const els=(await p.inspect({select:`$.slides[${i}].elements[*]`,include:['id','text']})).records;
 const find=(str)=>{const e=els.find(x=>x.text===str);if(!e)throw Error(str);return p.resolve(e.id);};
 const header=find('PROPOSED REVENUE MODEL');header.position={left:52,top:618,width:1176,height:22};
 const body=find('Businesses pay a success fee on fulfilled new-customer jobs, shared with contributing partners.');
 body.text='Businesses pay 10% of the booking amount.\nThat 10% fee is shared between GoLocal and software or channel partners.';
 body.position={left:52,top:642,width:1176,height:52};body.text.style={fontSize:21,typeface:'Helvetica Neue',color:'#103D3B',insets:0,autoFit:'none',wrap:'square'};
 const foot=find('*Growth hypothesis. Recommendations depend on booking reliability, platform discovery and selection rules.');foot.position={left:52,top:698,width:1085,height:17};foot.text.style={fontSize:12};
 const notes=s.speakerNotes.text;
 s.speakerNotes.text=notes.slice(0,notes.indexOf('Proposed commercial model:'))+'Proposed commercial model clarified by the founder on October 10, 2026: businesses pay a fee equal to 10% of the booking amount. This same 10% fee is shared between GoLocal and contributing software partners or channel partners. It is not a 10% fee plus a separate partner fee, and GoLocal does not retain the full 10%. The allocation among GoLocal and partners has not been specified or agreed. This is the intended pricing model, not evidence of collected revenue, signed merchant terms or paid continuation. Eligibility, collection timing, repeat bookings, cancellations and refunds still require commercial terms. Contribution must cover acquisition, partner share, integration, support, payment and exception-handling costs.';
 await fs.writeFile(W+'/draft-'+stem+'.png',new Uint8Array(await(await p.export({slide:s,format:'png',scale:1})).arrayBuffer()));
 await(await PresentationFile.exportPptx(p)).save(W+'/candidate-'+stem+'.pptx');console.log(stem+' exported');
}
