import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/market-opening-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v3.pptx')));
const s=p.slides.items[0];
const ids=(await p.inspect({select:'$.slides[0].elements[*]',include:['id','kind']})).records.map(x=>x.id);p.delete(ids);
const C={ink:'#193C32',muted:'#65746C',bg:'#FBF9F4',green:'#236C4E',paleGreen:'#E3F0E6',red:'#9D514B',paleRed:'#F7E8E3'};
s.background.fill=C.bg;let id=0;
function tx(str,x,y,w,h,size=26,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',name:`market-opening-${id++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return sh;}
tx('$600B home-services market',52,42,1176,82,54,C.ink,true);
tx('Each tech era unlocked more of the customer journey',52,136,1176,54,32,C.muted);
const values=[
 ['Pre-2000','2000–2010','2010–2025','2020s','2026+'],
 ['Telephones\nYellow Pages','Internet\nGoogle / Craigslist','Mobile + GPS\nGoogle Maps','AI assistants','Personal AI\nagents'],
 ['Phone discovery\n& outreach','Search &\ncomparison','Location &\nreviews','Explain needs\nin plain language','Delegate research\n& outreach']
];
const tb=s.tables.add({rows:3,columns:5,left:52,top:221,width:1176,height:252,columnWidths:[235.2,235.2,235.2,235.2,235.2],values});
tb.styleOptions={headerRow:false,bandedRows:false,firstColumn:false};tb.rows[0].height=40;tb.rows[1].height=102;tb.rows[2].height=110;
for(let r=0;r<3;r++)for(let c=0;c<5;c++){
 const cell=tb.getCell(r,c);cell.fill=r===2?C.paleGreen:r===1&&c===4?C.green:C.bg;
 cell.text.style={fontSize:r===0?23:r===1?24:24,typeface:'Helvetica Neue',color:r===0?C.muted:r===1&&c===4?'#FFFFFF':r===2?C.green:C.ink,bold:r!==2||c===4,alignment:'center',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
 tb.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:12,right:12,top:6,bottom:6},borders:{top:{width:3,color:C.bg},bottom:{width:3,color:C.bg},left:{width:3,color:C.bg},right:{width:3,color:C.bg}}});
}
tx('The remaining gap',52,513,1176,44,29,C.red,true);
tx('Scope & quote   ·   Live availability   ·   Booking, payment & follow-up',52,567,1176,49,29,C.red);
tx('Agents still need structured business data and a reliable way to transact.',52,632,1176,45,29,C.ink,true);
tx('Illustrative channel eras; typical fragmented workflow. Some platforms already support transactions.',52,691,1096,22,16,C.muted);
tx('1 / 6',1160,691,70,22,17,C.muted);
s.speakerNotes.text='Market/problem opening revised at the founder’s request, October 10 2026. Slide 1 introduces no GoLocal product name or Stripe analogy. It establishes the $600B home-services opportunity and the sequence of technological unlocks: telephones enabled discovery and outreach; internet search/listings enabled comparison; mobile/GPS improved location awareness and reviews; AI assistants let customers describe needs conversationally; personal AI agents can take on research and outreach. The remaining gap is access to structured authorized business data and reliable transactions across fragmented suppliers and software. Agents can already call/browse and some service platforms already transact; this is not a claim that every booking, payment or scoping workflow is impossible. Complex scope can require merchant input.\nMarket figure: $600B home services, preserved from founder-sourced resources/business-thesis.md and the user-edited thesis. Geography/year/methodology not supplied in the project source; underlying service spend is not GoLocal fee revenue.\nChannel eras selected for the narrative, not precise invention or universal adoption dates: Pre-2000 telephones/Yellow Pages; 2000–2010 internet/Google/Craigslist; 2010–2025 mobile/GPS/Google Maps; 2020s AI assistants; 2026+ personal AI agents (founder framing). No fixed ten-year-cycle claim. Craigslist history: https://www.craigslist.org/about/mission_and_history ; Google Maps retrospective: https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/ . Earlier launch dates do not contradict later channel-adoption periods. Personal-agent capabilities and demand-side evidence are on slide 2; GoLocal is introduced on slide 3.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v4.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v4.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt market/problem opening and reimported six-slide deck.');
