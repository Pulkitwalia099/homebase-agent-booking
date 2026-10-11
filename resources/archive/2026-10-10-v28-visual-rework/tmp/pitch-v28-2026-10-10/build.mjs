import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const R='/Users/pulkitwalia/Documents/ChatGPT/Homebase',W=R+'/tmp/pitch-v28-2026-10-10';
const p=await PresentationFile.importPptx(await FileBlob.load(R+'/output/pptx/golocal-pitch-v27-polished.pptx'));
const C={ink:'#103D3B',cream:'#F5F2E9',muted:'#53716A',sage:'#BDCCAD',light:'#DDE4D6',green:'#236C4E',pale:'#E1EADC',gray:'#ECECE5',rose:'#F0E2D9',red:'#A34E3F'};
let k=0;
function tx(s,str,x,y,w,h,size=26,color=C.ink,bold=false,align='left'){
 const sh=s.shapes.add({geometry:'textbox',name:'v28-text-'+k++,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});
 sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',alignment:align,wrap:'square'};return sh;
}
async function clear(i){const r=(await p.inspect({select:`$.slides[${i}].elements[*]`,include:['id']})).records;p.delete(r.map(x=>x.id));return p.slides.items[i];}
async function find(i,str){const r=(await p.inspect({select:`$.slides[${i}].elements[*]`,include:['id','text']})).records.filter(x=>x.text===str);if(r.length!==1)throw Error(str+' matches '+r.length);return p.resolve(r[0].id);}
async function repl(i,a,b){const sh=await find(i,a);sh.text.replace(a,b);return sh;}
for(let i=1;i<7;i++)p.slides.items[i].background.fill=C.cream;
// Original cover artwork from the visual reference, with the current proposition.
let s=await clear(0);s.background.fill=C.ink;
s.images.add({blob:new Uint8Array(await fs.readFile(W+'/reference/cover.png')),contentType:'image/png',alt:'Original illustrated neighborhood, local workshop and service van from the supplied visual reference.',fit:'cover',position:{left:0,top:0,width:1280,height:720}});
tx(s,'GoLocal',64,100,545,100,80,C.cream,true);
tx(s,'Local services,\nbooked by your\npersonal agent.',64,225,485,190,47,C.cream,true);
tx(s,'One booking layer for agents\nand local businesses.',64,447,455,85,25,C.light);
s.speakerNotes.text='GoLocal: local services, booked by your personal agent. Proposed shared booking layer connecting personal agents and participating local businesses. Original neighborhood illustration from the user-supplied golocal-sharks-pitch.pptx, used as visual reference. Current product proposition retained. Image is conceptual artwork, not evidence of live providers or operations.';
// Opportunity: narrative headline, separate market anchor, five-action matrix.
s=await clear(1);s.background.fill=C.cream;
tx(s,'THE OPPORTUNITY',64,32,1000,26,17,C.muted,true);
tx(s,'Personal agents change discovery.\nLocal booking is still fragmented.',64,88,830,115,44,C.ink,true);
tx(s,'≈$1.2T',941,88,275,91,70,C.ink,true);
tx(s,'Annual U.S. spending\nacross selected categories',943,181,273,60,20,C.muted);
tx(s,'Each platform makes more of the customer’s task possible.',64,225,829,36,25,C.muted);
const vals=[['CUSTOMER TASK','Yellow\nPages','Google /\nCraigslist','Google\nMaps','AI\nchatbots','Personal\nagents'],['Find & compare','Find','✓','✓','✓','✓'],['Describe the need','–','–','–','✓','✓'],['Delegate the task','–','–','–','–','✓'],['Get quote & schedule','Provider-specific pricing and availability','','','',''],['Book & pay','Separate booking and payment flows','','','','']];
const t=s.tables.add({rows:6,columns:6,left:64,top:282,width:1152,height:270,columnWidths:[260,178.4,178.4,178.4,178.4,178.4],values:vals});
t.styleOptions={headerRow:false,firstColumn:false,bandedRows:false};
const hh=[60,42,42,42,42,42];
for(let r=0;r<6;r++){
 t.rows[r].height=hh[r];
 for(let c=0;c<6;c++){
  const cell=t.getCell(r,c),good=vals[r][c]==='✓',fresh=(r===1&&c===2)||(r===2&&c===4)||(r===3&&c===5);
  cell.fill=r===0||c===0?C.cream:r>=4?C.rose:good?(fresh?C.green:C.pale):C.gray;
  if(r===0&&c===5)cell.fill=C.ink;
  cell.text.style={fontSize:r===0?(c===0?16:21):c===0?21:r>=4?21:good?25:21,typeface:'Helvetica Neue',bold:r===0||c===0||good,color:r===0&&c===5||fresh?'#FFFFFF':r>=4?C.red:r===0&&c===0?C.muted:C.ink,alignment:c===0?'left':'center',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
  t.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:c===0?0:7,right:7,top:3,bottom:3},borders:{top:{width:r===4?7:2,color:C.cream},bottom:{width:2,color:C.cream},left:{width:2,color:C.cream},right:{width:2,color:C.cream}}});
 }
}
for(let r=4;r<6;r++)t.merge({startRow:r,endRow:r,startColumn:1,endColumn:5});
tx(s,'A platform that closes the last two steps can earn\na share of completed local-service bookings.',64,577,1152,78,30,C.ink,true);
tx(s,'Selected-category spending, mixed 2023–25 sources; includes materials/DIY. Illustrative capabilities. Integration scope varies.',64,669,1118,24,13.5,C.muted);
tx(s,'2 / 7',1160,696,70,21,17,C.muted);
s.speakerNotes.text=`Personal agents create additional starting points for service requests. The platform matrix describes an illustrative progression of dominant customer experiences rather than exact launch dates or an exhaustive product audit. Find/compare includes location and review-based filtering when supported. Describe the need consolidates conversational input; delegate describes action-capable agents. The two transaction rows consolidate scoping/quote and availability/scheduling into Get quote & schedule, followed by Book & pay. Their merged cells show shared provider fragmentation rather than claiming that no platform has ever supported these actions.\nThe local-service opportunity is to connect fragmented provider pricing/availability and booking/payment flows. A platform that helps complete eligible bookings can potentially charge for that outcome. This is a proposed business model, not measured capture or a guarantee of scale. The approximately $1.2T figure is a broad underlying spending pool, not annual GoLocal transactions, the transactionable portion, or potential fee revenue. No market-share, take-rate or revenue forecast is implied. No absence-of-competition claim.\nMarket context: about $1.19T rounded to $1.2T in underlying annual U.S. spending across home improvement/repair (~$600B, including materials and DIY), auto maintenance/repair ($283.802B), personal care/clothing services ($239.558B) and child day care ($65.547B). Mixed years and measures, not GoLocal transactionable volume or fee revenue. Supporting calculation: resources/local-services-tam-2026-10-10.md. https://www.jchs.harvard.edu/sites/default/files/reports/files/Harvard_JCHS_Improving_Americas_Housing_2025.pdf ; https://fred.stlouisfed.org/release/tables?eid=44183&rid=53 ; https://fred.stlouisfed.org/series/AIES6244RCT00US .`;
// Keep the architecture, reduce the software catalogue to representative examples.
await repl(2,'Simpro, Probook AI','Simpro');
await repl(2,'Service Fusion, Commusoft','Cactus AI');
await repl(2,'Joblogic, Cactus AI + others','+ other platforms');
await repl(2,'Kickserv, Topline Pro','+ other platforms');
const spare=await find(2,'+ many other platforms');spare.text='';
await repl(2,'Just one service category: plumbing.\nThe software mix changes across categories.','Plumbing is one category.\nEach category has its own software mix.');
p.slides.items[2].speakerNotes.text+='\nDisplay uses fewer representative vendor names per segment for clarity. This does not narrow the proposed integration scope or assert vendor exclusivity. Other examples retained in prior evidence include Probook AI, Service Fusion, Commusoft, Joblogic, Kickserv and Topline Pro. Vendor suitability and access remain to be verified.';
// The supplied reference uses a dark proof slide; carry its visual contrast over without its stale numbers.
const pilot=p.slides.items[5];pilot.background.fill=C.ink;
const rr=(await p.inspect({select:'$.slides[5].elements[*]',include:['id','kind','text']})).records;
for(const e of rr){const sh=p.resolve(e.id);if(e.text)sh.text.style={color:/Founder-reported|PARTNERSHIPS/.test(e.text)?C.sage:C.cream};else if(e.kind==='shape')sh.line={fill:C.sage,width:2,style:'solid'};}
await fs.mkdir(W+'/draft-seven',{recursive:true});
for(let i=0;i<7;i++)await fs.writeFile(W+`/draft-seven/slide-${i+1}.png`,new Uint8Array(await(await p.export({slide:p.slides.items[i],format:'png',scale:1})).arrayBuffer()));
await(await PresentationFile.exportPptx(p)).save(W+'/candidate-seven.pptx');
const coverId=(await p.inspect({select:'$.slides[*]',include:['id']})).records[0].id;p.delete([coverId]);
await repl(0,'THE OPPORTUNITY','GOLOCAL');
tx(p.slides.items[0],'Local services, booked by your personal agent.',690,31,526,29,20,C.muted,false,'right');
for(let i=0;i<6;i++)await repl(i,`${i+2} / 7`,`${i+1} / 6`);
await(await PresentationFile.exportPptx(p)).save(W+'/candidate-six.pptx');
console.log('V28 candidates exported.');
