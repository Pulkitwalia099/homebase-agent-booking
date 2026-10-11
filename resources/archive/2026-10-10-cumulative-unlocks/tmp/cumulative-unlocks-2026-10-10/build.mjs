import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/cumulative-unlocks-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v6.pptx')));
const s=p.slides.items[0];
const ids=(await p.inspect({select:'$.slides[0].elements[*]',include:['id','kind']})).records.map(x=>x.id);p.delete(ids);
const C={ink:'#193C32',muted:'#65746C',bg:'#FBF9F4',green:'#236C4E',paleGreen:'#E3F0E6',red:'#9D514B',paleRed:'#F7E8E3'};
s.background.fill=C.bg;let id=0;
function tx(str,x,y,w,h,size=26,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',name:`market-opening-${id++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return sh;}
tx('≈$1.2T U.S. local-services opportunity',52,34,1176,78,52,C.ink,true);
tx('Each new platform unlocks another step. The transaction gap remains.',52,117,1176,43,31,C.muted);
tx('✓  Platform unlock',52,170,400,28,21,C.green,true);
tx('—  Still manual / external',520,170,708,28,21,C.red,true);
const values=[
 ['', 'Pre-2000','2000–2010','2010–2020','2020–2025','2026+'],
 ['Technology','Telephones','Internet','Mobile + GPS','LLMs','AI + tools'],
 ['Platform','Yellow Pages','Google /\nCraigslist','Google Maps','AI chatbots','Personal AI\nagents'],
 ['Find a business','✓','✓','✓','✓','✓'],
 ['Compare options','—','✓','✓','✓','✓'],
 ['Location & reviews','—','—','✓','✓','✓'],
 ['Conversational request','—','—','—','✓','✓'],
 ['Delegate the task','—','—','—','—','✓'],
 ['Scope & quote','—','—','—','—','Agent calls'],
 ['Live availability','—','—','—','—','Calls / sites'],
 ['Book & pay','—','—','—','—','Sites / checkout']
];
const tb=s.tables.add({rows:11,columns:6,left:52,top:209,width:1176,height:398,columnWidths:[241,187,187,187,187,187],values});
tb.styleOptions={headerRow:false,bandedRows:false,firstColumn:false};const heights=[28,30,64,34,34,34,34,34,34,34,38];
for(let r=0;r<11;r++)tb.rows[r].height=heights[r];
for(let r=0;r<11;r++)for(let c=0;c<6;c++){
 const cell=tb.getCell(r,c);const good=values[r][c]==='✓';const fresh=r>=3&&r<=7&&c===r-2;
 cell.fill=c===0?C.bg:r<3?(r===2&&c===5?C.green:C.bg):good?(fresh?C.green:C.paleGreen):C.paleRed;
 cell.text.style={fontSize:r===0?21:r<3?c===0?21:23:c===0?21:good?26:c===5&&r>=8?18:24,typeface:'Helvetica Neue',color:c===0?(r>=8?C.red:C.ink):r===0?C.muted:r<3?(r===2&&c===5?'#FFFFFF':C.ink):good?(fresh?'#FFFFFF':C.green):C.red,bold:r===2||c===0||good,alignment:c===0?'left':'center',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
 tb.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:c===0?0:7,right:7,top:2,bottom:2},borders:{top:{width:r===8?7:3,color:C.bg},bottom:{width:3,color:C.bg},left:{width:3,color:C.bg},right:{width:3,color:C.bg}}});
}
tx('Agents still rely on calls and websites to turn a request into a completed booking.',52,632,1176,43,28,C.ink,true);
tx('Mixed-year U.S. spending, including materials. Illustrative eras/workflows; some platforms already transact.',52,690,1097,21,15,C.muted);
tx('1 / 6',1160,690,70,22,17,C.muted);
const marketNotes='Market evidence from project chat “Estimate Homebase local services TAM”, October 10 2026, and resources/local-services-tam-2026-10-10.md. Approximately $1.2T in annual U.S. spending across selected categories: home improvement and repair around $600B (Harvard, 2023 actual / 2025 projected total owner and rental stock); auto maintenance and repair $283.802B (BEA 2025); personal care and clothing services $239.558B (BEA 2025); child day care $65.546955B (Census 2024 revenue). Indicative sum $1.1889T with rounded home baseline, or $1.1969T with $608B home projection, rounded to $1.2T. This supports approximately $1.2T rather than a measured $1.2T+ lower bound. Mixed years and measures; includes home materials and DIY. Underlying spending is not bookable volume or GoLocal fee revenue. Sources: https://www.jchs.harvard.edu/blog/bigger-market-more-players-what-20-years-data-reveal-about-remodeling-industry ; https://www.jchs.harvard.edu/sites/default/files/reports/files/Harvard_JCHS_Improving_Americas_Housing_2025.pdf ; https://fred.stlouisfed.org/release/tables?eid=44183&rid=53 ; https://fred.stlouisfed.org/series/AIES6244RCT00US .';
s.speakerNotes.text='Cumulative staircase of platform unlocks requested by the founder, October 10 2026. Capabilities remain green in later platforms: directories enable finding businesses; internet adds digital comparison; Maps/mobile adds location and review-based filtering; LLM chatbots add conversational requests; personal agents add task delegation. Dark-green diagonal identifies each new unlock and pale green preserves earlier gains. This is an illustrative progression of typical customer-facing platform capabilities, not a product-by-product historical audit, launch-date claim or assertion that older platforms never offered a similar feature. Red means work still manual or outside the platform. The last three rows are the remaining quote, live-availability and booking/payment bottlenecks across fragmented providers. Personal agents can call and browse; delegation does not by itself expose reliable structured supplier data or authorized transactions. Some providers and marketplaces already transact. Complex scoping and merchant authorization may still require human input. Dates retained: Maps 2010–2020, chatbots 2020–2025, personal AI agents 2026+. AI + tools is a simplified action-capability description. No measured mass-adoption or universal booking-success claim. Historical context: https://www.craigslist.org/about/mission_and_history ; https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/ .\n'+marketNotes;
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v7.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v7.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt market/problem opening and reimported six-slide deck.');
