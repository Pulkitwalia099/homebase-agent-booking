import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const R='/Users/pulkitwalia/Documents/ChatGPT/Homebase',W=R+'/tmp/pitch-v37-2026-10-10';
const p=await PresentationFile.importPptx(await FileBlob.load(R+'/output/pptx/golocal-pitch-v36.pptx'));
const s=p.slides.items[5];
const els=(await p.inspect({select:'$.slides[5].elements[*]',include:['id','text','kind']})).records;
function find(str){const e=els.find(x=>x.text===str);if(!e)throw Error(str);return p.resolve(e.id);}
function repl(a,b){const sh=find(a);sh.text.replace(a,b);return sh;}
repl('60+ plumbing companies in the pipeline','First pilot lined up in Salt Lake City');
repl('Salt Lake City, through two channel partners.','60+ plumbing companies already in the pipeline.');
repl('Next milestone: turn eligible agent requests into confirmed bookings','30-day target: launch the GoLocal MCP');
const q1=repl('Provider\nintroductions','Onboard pilot\nproviders');
const q2=repl('Onboard providers\nand connect software','Connect live pricing\nand availability');
const q3=repl('Test customer-authorized\nagent bookings','Launch MCP and test\nfirst agent bookings');
for(const [i,q] of [q1,q2,q3].entries()){
 q.position={left:52+i*428,top:580,width:320,height:82};
 q.text.style={fontSize:26,alignment:'center',verticalAlignment:'middle',insets:0};
}
const connectors=els.filter(x=>!x.text);console.log('Non-text elements',JSON.stringify(connectors));
p.delete(connectors.map(x=>x.id));
for(const [a,b] of [[q1,q2],[q2,q3]])s.shapes.connect(a,b,{kind:'straight',fromSide:'right',toSide:'left',line:{fill:'#BDCCAD',width:2,style:'solid'},tail:{type:'arrow',width:'sm',length:'sm'}});
s.speakerNotes.text+='\nFounder launch framing clarified October 10, 2026 in annotation-mv39f5a2-j: the first pilot is lined up in Salt Lake City, supported by the previously confirmed 60+ plumbing-company pipeline. The intended MCP launch is approximately 30 days from this pitch revision, displayed as a 30-day target rather than a guaranteed deadline or already completed launch. The process is to onboard pilot providers, connect live pricing and availability through authorized software, then launch the MCP and test initial customer-authorized agent bookings. Partner pipeline does not imply all providers will be live at launch.';
await fs.writeFile(W+'/draft-slide-6.png',new Uint8Array(await(await p.export({slide:s,format:'png',scale:1})).arrayBuffer()));
await(await PresentationFile.exportPptx(p)).save(W+'/candidate-seven.pptx');
