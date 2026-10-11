import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/platform-unlocks-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v4.pptx')));
const s=p.slides.items[0];
const ids=(await p.inspect({select:'$.slides[0].elements[*]',include:['id','kind']})).records.map(x=>x.id);p.delete(ids);
const C={ink:'#193C32',muted:'#65746C',bg:'#FBF9F4',green:'#236C4E',paleGreen:'#E3F0E6',red:'#9D514B',paleRed:'#F7E8E3'};
s.background.fill=C.bg;let id=0;
function tx(str,x,y,w,h,size=26,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',name:`market-opening-${id++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return sh;}
tx('$600B home-services market',52,42,1176,82,54,C.ink,true);
tx('New technology creates new platforms for local services',52,132,1176,54,32,C.muted);
const values=[
 ['', 'Pre-2000','2000–2010','2010–2025','2020s','2026+'],
 ['Technology','Telephones','Internet','Mobile + GPS','LLMs','AI + tools'],
 ['Platform','Yellow Pages','Google /\nCraigslist','Google Maps','AI chatbots','Personal AI\nagents'],
 ['Unlock','Find & call','Search &\ncompare','Nearby results\n& reviews','Describe needs\n& get answers','Delegate\ntasks']
];
const tb=s.tables.add({rows:4,columns:6,left:52,top:210,width:1176,height:266,columnWidths:[151,205,205,205,205,205],values});
tb.styleOptions={headerRow:false,bandedRows:false,firstColumn:false};tb.rows[0].height=37;tb.rows[1].height=66;tb.rows[2].height=84;tb.rows[3].height=79;
for(let r=0;r<4;r++)for(let c=0;c<6;c++){
 const cell=tb.getCell(r,c);cell.fill=c===0?C.bg:r===3?C.paleGreen:r===2&&c===5?C.green:C.bg;
 cell.text.style={fontSize:r===0?22:c===0?21:r===2?25:23,typeface:'Helvetica Neue',color:c===0||r===0?C.muted:r===2&&c===5?'#FFFFFF':r===3?C.green:C.ink,bold:c===0||r===2||c===5,alignment:c===0?'left':'center',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
 tb.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:c===0?0:8,right:8,top:5,bottom:5},borders:{top:{width:3,color:C.bg},bottom:{width:3,color:C.bg},left:{width:3,color:C.bg},right:{width:3,color:C.bg}}});
}
tx('The opportunity on personal AI agents',52,508,1176,45,30,C.ink,true);
const gaps=s.tables.add({rows:1,columns:3,left:52,top:565,width:1176,height:55,columnWidths:[392,392,392],values:[['Scope & quote','Live availability','Booking & payments']]});
gaps.styleOptions={headerRow:false,bandedRows:false};
for(let c=0;c<3;c++){
 const cell=gaps.getCell(0,c);cell.fill=C.bg;cell.text.style={fontSize:30,typeface:'Helvetica Neue',color:C.red,bold:true,alignment:'left',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
 gaps.cells.block({row:0,column:c,rowCount:1,columnCount:1}).assign({margins:{left:0,right:8,top:5,bottom:5},borders:{top:{width:0,color:C.bg},bottom:{width:0,color:C.bg},left:{width:0,color:C.bg},right:{width:0,color:C.bg}}});
}
tx('Agents need structured business data and a reliable way to transact.',52,637,1176,40,28,C.ink);
tx('Illustrative channel eras. These gaps persist across fragmented providers; some platforms already transact.',52,691,1096,22,16,C.muted);
tx('1 / 6',1160,691,70,22,17,C.muted);
s.speakerNotes.text='Founder-requested technology/platform separation, October 10 2026. Technology enables a platform, and that platform unlocks part of the local-service experience. Telephones: Yellow Pages/find and call. Internet: Google and Craigslist/search and comparison. Mobile and GPS: Google Maps/location and reviews. LLMs: AI chatbots/describe needs and get answers. AI with tools: personal AI agents/delegate tasks. AI + tools is a simplified technical description of agent action capabilities, not a claim of a single invention or universal implementation. Personal agents are the latest platform; a shared data and transaction layer can be built on top to address scoping/quoting, live availability and booking/payments across participating suppliers. These proposed capabilities are introduced as GoLocal on slide 3. The current slide stays on market and problem. Merchant authorization and provider input may be needed. Some local platforms already transact. Market figure $600B preserved from founder-sourced thesis; underlying service spend is not GoLocal fee revenue. Dates are illustrative channel eras, not launch dates or a fixed decade cycle. Craigslist history: https://www.craigslist.org/about/mission_and_history ; Google Maps retrospective: https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/ .';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v5.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v5.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt market/problem opening and reimported six-slide deck.');
