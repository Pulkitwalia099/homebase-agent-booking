import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const R='/Users/pulkitwalia/Documents/ChatGPT/Homebase',W=R+'/tmp/pitch-v31-2026-10-10';
const C={ink:'#103D3B',cream:'#F5F2E9',muted:'#53716A',green:'#236C4E',pale:'#E1EADC',rose:'#F0E2D9',red:'#A34E3F'};
let k=0;
function tx(s,str,x,y,w,h,size=26,color=C.ink,bold=false,align='left'){
 const sh=s.shapes.add({geometry:'textbox',name:'v31-text-'+k++,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});
 sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',alignment:align,wrap:'square'};return sh;
}
for(const [stem,file,i] of [['seven','golocal-pitch-v30.pptx',3],['six','golocal-pitch-v30-competition.pptx',2]]){
 const p=await PresentationFile.importPptx(await FileBlob.load(R+'/output/pptx/'+file));
 const s=p.slides.items[i];
 const els=(await p.inspect({select:`$.slides[${i}].elements[*]`,include:['id']})).records;p.delete(els.map(x=>x.id));s.background.fill=C.cream;
 tx(s,'THE CUSTOMER EXPERIENCE',64,30,1000,26,17,C.muted,true);
 tx(s,'GoLocal turns a scoped job into a better booking',64,78,1152,60,43,C.ink,true);
 tx(s,'Agents can scope the job today. Live business data changes how they find the right provider.',64,147,1152,40,24,C.muted);
 const vals=[
 ['TODAY','Search Google listings. Call 2–3 businesses.\nCheck price and availability one at a time.','A narrow search can miss better matches.\nRepeated browsing and calls consume tokens.'],
 ['WITH GOLOCAL','Search hundreds of connected businesses.\nTarget: match in a fraction of a second.','Compare price, live availability, specialization\nand past transaction reviews to find the best fit.']];
 const t=s.tables.add({rows:2,columns:3,left:64,top:200,width:1152,height:164,columnWidths:[166,478,508],values:vals});
 t.styleOptions={headerRow:false,firstColumn:false,bandedRows:false};
 for(let r=0;r<2;r++){
  t.rows[r].height=82;
  for(let c=0;c<3;c++){
   const cell=t.getCell(r,c);cell.fill=r===0?C.rose:C.pale;
   cell.text.style={fontSize:c===0?18:21,typeface:'Helvetica Neue',color:c===0?(r===0?C.red:C.green):C.ink,bold:c===0,alignment:'left',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
   t.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:12,right:10,top:9,bottom:9},borders:{top:{width:r===1?5:0,color:C.cream},bottom:{width:0,color:C.cream},left:{width:0,color:C.cream},right:{width:0,color:C.cream}}});
  }
 }
 tx(s,'THE GOLOCAL BOOKING JOURNEY',64,395,1100,25,16,C.muted,true);
 tx(s,'“Book a plumber tomorrow morning for my leaking kitchen tap.”',64,429,1152,42,27,C.ink,true);
 const xs=[64,364,664,964];
 const titles=['1  Agent scopes the job','2  GoLocal compares','3  Customer approves','4  GoLocal books'];
 const bodies=['Salt Lake City address,\nphoto and scope of a\ndiagnostic visit.','Finds suitable providers,\navailable slots and\nvisit fees.','Chooses Oak Plumbing.\nAuthorizes the $79 visit\nand payment.','Books in provider system.\nReturns booking ID and\npayment status.'];
 for(let j=0;j<4;j++){
  tx(s,titles[j],xs[j],484,j===3?252:278,32,22,j===1||j===3?C.green:C.ink,true);
  tx(s,bodies[j],xs[j],526,j===3?252:278,83,20,C.ink);
 }
 tx(s,'Confirmed: Oak Plumbing, tomorrow 9–11 am',64,620,1152,40,28,C.green,true);
 tx(s,'Booking GL-1042. $79 visit fee authorized. Repairs quoted after inspection.',64,657,1152,27,18,C.muted);
 tx(s,'Illustrative flows. Hundreds of providers and sub-second matching are targets, not measured results. Provider, price and booking are examples.',64,694,1110,19,12,C.muted);
 tx(s,stem==='seven'?'4 / 7':'3 / 6',1160,697,70,20,15,C.muted);
 s.speakerNotes.text=`User-supplied comparison thesis: current agents can help scope a customer request but often must search listings, browse provider sites and call businesses to obtain real prices and availability. Calling two or three businesses is an illustrative constrained search, not an empirical average or a universal limit. Such a search can miss providers with a better fit on price, availability or specialization. Repeated browsing and voice/tool interactions consume tokens; no token-cost baseline, benchmark or measured savings have been established.\nGoLocal's intended delta is shared access to authorized live provider data, allowing broad comparison of service coverage, current slots, merchant pricing or visit fees, specialization, transaction history and past transaction reviews where available and permitted. Hundreds of connected businesses and matching in a fraction of a second are product scale and lookup-latency targets. They are not current provider counts or measured performance, and the speed target is not for full scoping, merchant quote response, payment or booking execution. Best fit means a match to the customer's expressed needs and preferences, not a guarantee of the globally lowest price or best provider. Proposed transaction-review data access and relevance remain to be validated.\nThe subsequent journey retains the approved Salt Lake City plumbing example. Oak Plumbing, the $79 diagnostic visit, 9–11 am slot and booking GL-1042 are fictional. The customer approves provider, visit fee and payment authorization before execution. Authorization is not payment capture. Repair work requires a separate quote after inspection. GoLocal would create and confirm bookings through merchant-authorized software connections. This is the intended product journey, not a live transaction or production reliability claim.`;
 await fs.writeFile(W+'/draft-'+stem+'.png',new Uint8Array(await(await p.export({slide:s,format:'png',scale:1})).arrayBuffer()));
 await(await PresentationFile.exportPptx(p)).save(W+'/candidate-'+stem+'.pptx');console.log(stem+' exported');
}
