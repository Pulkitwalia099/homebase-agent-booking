import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const R='/Users/pulkitwalia/Documents/ChatGPT/Homebase',W=R+'/tmp/pitch-v30-2026-10-10';
const C={ink:'#103D3B',cream:'#F5F2E9',muted:'#53716A',green:'#236C4E',pale:'#E1EADC',gray:'#ECECE5',rose:'#F0E2D9',red:'#A34E3F'};
let k=0;
function tx(s,str,x,y,w,h,size=26,color=C.ink,bold=false,align='left'){
 const sh=s.shapes.add({geometry:'textbox',name:'v30-text-'+k++,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});
 sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',alignment:align,wrap:'square'};return sh;
}
for(const [stem,file,i] of [['seven','golocal-pitch-v29.pptx',1],['six','golocal-pitch-v29-competition.pptx',0]]){
 const p=await PresentationFile.importPptx(await FileBlob.load(R+'/output/pptx/'+file));
 const s=p.slides.items[i], oldnotes=s.speakerNotes.text;
 const els=(await p.inspect({select:`$.slides[${i}].elements[*]`,include:['id']})).records;p.delete(els.map(x=>x.id));
 s.background.fill=C.cream;
 tx(s,stem==='seven'?'THE OPPORTUNITY':'GOLOCAL',64,30,1000,26,17,C.muted,true);
 if(stem==='six')tx(s,'Local services, booked by your personal agent.',690,29,526,29,20,C.muted,false,'right');
 tx(s,'Personal agents need live local-business data',64,79,1152,60,44,C.ink,true);
 tx(s,'Users once called businesses to scope the job.\nPersonal agents can now scope it with the customer, then act on live business data.',64,143,1152,62,24,C.muted);
 const vals=[
 ['ERA','Pre-2000','2000–2010','2010–2020','2020–2025','2026'],
 ['Technology','Telephones','Internet','Mobile + GPS','LLMs','AI + tools'],
 ['Platform','Yellow Pages','Google /\nCraigslist','Google Maps','AI chatbots','Personal\nagents today'],
 ['Find a business','✓','✓','✓','✓','✓'],
 ['Compare options','–','✓','✓','✓','✓'],
 ['Location & reviews','–','–','✓','✓','✓'],
 ['Discuss & scope the job','–','–','–','✓','✓'],
 ['Delegate the task','–','–','–','–','✓'],
 ['Get quotes & schedule','MISSING: a shared live data layer for local businesses\nServices, pricing and availability, connected to booking & payment','','','',''],
 ['Book & pay','','','','','']];
 const heights=[30,30,58,32,32,32,32,32,43,43];
 const t=s.tables.add({rows:10,columns:6,left:64,top:218,width:1152,height:364,columnWidths:[280,174.4,174.4,174.4,174.4,174.4],values:vals});
 t.styleOptions={headerRow:false,firstColumn:false,bandedRows:false};
 for(let r=0;r<10;r++){
  t.rows[r].height=heights[r];
  for(let c=0;c<6;c++){
   const cell=t.getCell(r,c),good=vals[r][c]==='✓',fresh=r>=3&&r<8&&c===r-2,head=r<3,lastHead=head&&c===5,gap=r>=8;
   cell.fill=lastHead?C.ink:head?C.cream:gap?C.rose:c===0?C.cream:good?(fresh?C.green:C.pale):C.gray;
   cell.text.style={fontSize:r===0?18:r===1?17:r===2?21:c===0?20:gap?21:good?22:20,typeface:'Helvetica Neue',bold:r===0||r===2||c===0||good||r===8,color:lastHead||fresh?'#FFFFFF':gap?C.red:head?C.muted:C.ink,alignment:c===0?'left':'center',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
   if(r===2&&!lastHead)cell.text.style={color:C.ink};
   t.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:c===0?6:7,right:6,top:2,bottom:2},borders:{top:{width:r===8?7:2,color:C.cream},bottom:{width:2,color:C.cream},left:{width:2,color:C.cream},right:{width:2,color:C.cream}}});
  }
 }
 t.merge({startRow:8,endRow:9,startColumn:1,endColumn:5});
 t.getCell(8,1).text.style={fontSize:22,bold:true};
 tx(s,'The live data layer that enables agent bookings can capture value\nfrom the ≈$1.2T local-services spending pool.',64,605,1152,70,28,C.ink,true);
 tx(s,'≈$1.2T annual U.S. spending across selected categories; mixed 2023–25 sources, including materials/DIY. Eras and capabilities illustrative.',64,681,1120,20,12.5,C.muted);
 tx(s,stem==='seven'?'2 / 7':'1 / 6',1160,700,70,19,15,C.muted);
 s.speakerNotes.text=`Founder thesis clarified in annotation on October 10, 2026: customers historically explained and scoped a local-service job through calls with providers before obtaining quotes or scheduling. Personal agents can now help scope a job in conversation with the customer and use live provider data to seek quotes and execute authorized bookings. This creates a new use for a shared live local-business data layer. The claim concerns fragmented access across agents, businesses and existing software, not an absence of provider databases or APIs. Live data was already useful to businesses; the new opportunity is making it usable by delegated agents.
The proposed layer exposes merchant-authorized service definitions, coverage, pricing or quoting rules and current availability, linked to supported booking and payment actions. Read-only data alone cannot confirm a booking. Complex jobs can still require provider review or a site visit; agent scoping does not guarantee a final price. User approval, merchant permissions and reliable transaction execution remain necessary.
The dates describe illustrative eras rather than launch dates or universal capabilities. The scope row indicates conversational assistance, not full technical diagnosis for every service. The final two task rows are Get quotes & schedule and Book & pay. The missing shared live layer enables those actions across participating providers. Capturing value through completed bookings is the business hypothesis, not a measured outcome.
`+oldnotes.slice(oldnotes.indexOf('Market context:'));
 await fs.writeFile(W+'/draft-'+stem+'.png',new Uint8Array(await(await p.export({slide:s,format:'png',scale:1})).arrayBuffer()));
 await(await PresentationFile.exportPptx(p)).save(W+'/candidate-'+stem+'.pptx');
 console.log(stem+' exported');
}
