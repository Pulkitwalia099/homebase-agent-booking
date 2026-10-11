import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/transaction-bottleneck-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v5.pptx')));
const s=p.slides.items[0];
const ids=(await p.inspect({select:'$.slides[0].elements[*]',include:['id','kind']})).records.map(x=>x.id);p.delete(ids);
const C={ink:'#193C32',muted:'#65746C',bg:'#FBF9F4',green:'#236C4E',paleGreen:'#E3F0E6',red:'#9D514B',paleRed:'#F7E8E3'};
s.background.fill=C.bg;let id=0;
function tx(str,x,y,w,h,size=26,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',name:`market-opening-${id++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return sh;}
tx('≈$1.2T U.S. local-services opportunity',52,42,1176,82,52,C.ink,true);
tx('Personal agents can take on the task. The transaction is still fragmented.',52,133,1176,44,30,C.muted);
tx('Green: platform unlock',52,187,415,28,20,C.green,true);
tx('Red: external work still required',520,187,708,28,20,C.red,true);
const values=[
 ['', 'Pre-2000','2000–2010','2010–2020','2020–2025','2026+'],
 ['Technology','Telephones','Internet','Mobile + GPS','LLMs','AI + tools'],
 ['Platform','Yellow Pages','Google /\nCraigslist','Google Maps','AI chatbots','Personal AI\nagents'],
 ['Platform unlock','Find & call','Search &\ncompare','Nearby results\n& reviews','Describe needs\n& get answers','Delegate\ntasks'],
 ['Scope & quote','Call','Calls / forms','Calls / forms','Calls / forms','Agent calls'],
 ['Live availability','Call','Calls / sites','Calls / sites','Calls / sites','Sites / calls'],
 ['Book & pay','Call / in person','Separate\ncheckout','Separate\ncheckout','Separate\ncheckout','Sites / calls /\ncheckout']
];
const tb=s.tables.add({rows:7,columns:6,left:52,top:225,width:1176,height:338,columnWidths:[221,191,191,191,191,191],values});
tb.styleOptions={headerRow:false,bandedRows:false,firstColumn:false};const heights=[30,38,62,67,47,47,47];
for(let r=0;r<7;r++)tb.rows[r].height=heights[r];
for(let r=0;r<7;r++)for(let c=0;c<6;c++){
 const cell=tb.getCell(r,c);cell.fill=c===0?C.bg:r===3?C.paleGreen:r>=4?C.paleRed:r===2&&c===5?C.green:C.bg;
 cell.text.style={fontSize:r===0?21:c===0?22:r===2?23:r===3?22:21,typeface:'Helvetica Neue',color:c===0?(r===3?C.green:r>=4?C.red:C.muted):r===0?C.muted:r===2&&c===5?'#FFFFFF':r===3?C.green:r>=4?C.red:C.ink,bold:c===0||r===2||r===3&&c===5,alignment:c===0?'left':'center',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
 tb.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:c===0?0:7,right:7,top:2,bottom:2},borders:{top:{width:3,color:C.bg},bottom:{width:3,color:C.bg},left:{width:3,color:C.bg},right:{width:3,color:C.bg}}});
}
tx('Delegating the task still leaves calls, waiting and separate checkouts.',52,593,1176,40,30,C.ink,true);
tx('Agents need structured business data and a reliable way to transact.',52,641,1176,36,26,C.ink);
tx('Indicative annual spending, mixed 2023–25 sources, including materials. Eras and workflows are illustrative.',52,690,1097,21,15,C.muted);
tx('1 / 6',1160,690,70,22,17,C.muted);
const marketNotes='Market evidence from project chat “Estimate Homebase local services TAM”, October 10 2026, and resources/local-services-tam-2026-10-10.md. Approximately $1.2T in annual U.S. spending across selected categories: home improvement and repair around $600B (Harvard, 2023 actual / 2025 projected total owner and rental stock); auto maintenance and repair $283.802B (BEA 2025); personal care and clothing services $239.558B (BEA 2025); child day care $65.546955B (Census 2024 revenue). Indicative sum $1.1889T with rounded home baseline, or $1.1969T with $608B home projection, rounded to $1.2T. This supports approximately $1.2T rather than a measured $1.2T+ lower bound. Mixed years and measures; includes home materials and DIY. Underlying spending is not bookable volume or GoLocal fee revenue. Sources: https://www.jchs.harvard.edu/blog/bigger-market-more-players-what-20-years-data-reveal-about-remodeling-industry ; https://www.jchs.harvard.edu/sites/default/files/reports/files/Harvard_JCHS_Improving_Americas_Housing_2025.pdf ; https://fred.stlouisfed.org/release/tables?eid=44183&rid=53 ; https://fred.stlouisfed.org/series/AIES6244RCT00US .';
s.speakerNotes.text='Founder-requested era correction and green/red workflow matrix. Dates: Maps 2010–2020, AI chatbots 2020–2025, personal AI agents 2026+. These are illustrative channel eras, not invention dates. Green shows what each platform adds to discovery or delegation. Red shows typical external work remaining across fragmented providers. An agent can perform calls and browse websites, but task delegation does not itself provide structured quotes, live schedules, booking and payments. Some marketplaces and businesses already transact digitally. This does not claim all local bookings are unsolved or that agents cannot book. Complex scoping may require provider input; business authorization is required. No quantified mass-adoption claim added. AI + tools is a simplified description of action capabilities. Craigslist history: https://www.craigslist.org/about/mission_and_history ; Google Maps retrospective: https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/ .\n'+marketNotes;
p.resolve('sh/r65knqtk').text.replace('$600B','≈$1.2T');
p.resolve('sh/q5wjelsz').text.replace('home services within a\n$2T local-services market','annual U.S. spending in\nselected local services');
p.slides.items[1].speakerNotes.text += '\nOctober 10 market update supersedes the old unsourced $2T line: '+marketNotes;
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-v6.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:['Helvetica Neue']},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation.json')});
const final=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v6.pptx')));
await fs.mkdir(path.join(WORK,'final-renders'),{recursive:true});
for(let i=0;i<6;i++){const b=await final.export({slide:final.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(WORK,'final-renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log('Rebuilt market/problem opening and reimported six-slide deck.');
