import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {resolvePresentationFont,finalizePresentation} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/slide1-polish-2026-10-10');
const SKILL='/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const PY='/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const font=resolvePresentationFont();
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-structure.pptx')));
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
const unchanged=[];
for(let i=1;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});const v=new Uint8Array(await b.arrayBuffer());unchanged.push(crypto.createHash('sha256').update(v).digest('hex'));}
const before=await p.export({slide:p.slides.items[0],format:'png',scale:2});await fs.writeFile(path.join(WORK,'before.png'),new Uint8Array(await before.arrayBuffer()));
const ids=(await p.inspect({select:'$.slides[0].elements[*]',include:['id','kind']})).records.map(x=>x.id);
p.delete(ids);
const s=p.slides.items[0];
const C={ink:'#193C32',muted:'#65746C',bg:'#FBF9F4',green:'#236C4E',paleGreen:'#E3F0E6',red:'#9D514B',paleRed:'#F7E8E3',white:'#FFFFFF'};
s.background.fill=C.bg;let id=0;
function tx(str,x,y,w,h,size=26,color=C.ink,bold=false){const sh=s.shapes.add({geometry:'textbox',name:`slide1-polish-${id++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});sh.text=str;sh.text.style={fontSize:size,typeface:font,color,bold,insets:0,verticalAlignment:'top',autoFit:'none',wrap:'square'};return sh;}
tx('GoLocal',52,28,300,57,43,C.ink,true);
tx('Stripe for home-service bookings',510,39,716,43,28,C.green,true);
tx('Each tech era changed the front door to local services',52,109,1176,62,39,C.ink,true);
tx('✓  Platform handles it',52,177,334,33,21,C.green,true);
tx('—  Manual / external work',403,177,395,33,21,C.red,true);
const values=[
 ['The customer journey','Pre-1990s\nYellow Pages','1990s\nGoogle /\nCraigslist','2000s–2010s\nGoogle Maps','2020s\nAI agents','Next (planned)\nAI agents\n+ GoLocal'],
 ['Find a business','✓','✓','✓','✓','✓'],
 ['Compare options','—','✓','✓','✓','✓'],
 ['Check location','—','—','✓','✓','✓'],
 ['Scope & quote','—','—','—','Agent calls','✓'],
 ['Check slots & book','—','—','—','Sites / calls','✓'],
 ['Pay & manage','—','—','—','Sites / calls','✓']
];
const tb=s.tables.add({rows:7,columns:6,left:52,top:232,width:1176,height:365,columnWidths:[256,184,184,184,184,184],values});
tb.styleOptions={headerRow:false,bandedRows:false,firstColumn:false};
tb.borders.assign({style:'solid',fill:C.bg,color:C.bg,width:0});
tb.rows[0].height=101;for(let r=1;r<7;r++)tb.rows[r].height=44;
for(let r=0;r<7;r++)for(let c=0;c<6;c++){
 const cell=tb.getCell(r,c);const good=values[r][c]==='✓';
 cell.fill=c===0?C.bg:r===0?(c===5?C.green:C.bg):good?C.paleGreen:C.paleRed;
 cell.text.style={fontSize:r===0?(c===0?20:22):(c===0?22:good?28:21),typeface:font,color:r===0?(c===5?C.white:C.ink):(c===0?C.ink:good?C.green:C.red),bold:r===0||c===0||good,alignment:c===0?'left':'center',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
 tb.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:8,right:8,top:3,bottom:3},borders:{top:{width:3,color:C.bg},bottom:{width:3,color:C.bg},left:{width:3,color:C.bg},right:{width:3,color:C.bg}}});
}
tx('GoLocal makes participating businesses bookable by AI agents.',52,623,1176,43,28,C.green,true);
tx('Illustrative eras and typical workflow. Some platforms already transact; complex quotes still need business input.',52,675,1096,26,16,C.muted);
tx('1 / 6',1160,682,70,25,17,C.muted);
s.speakerNotes.text += '\n\nSlide 1 design revision, October 10 2026: availability and booking merged, leaving six tasks. Comparison and quote/scoping remain separate because digital comparison does not establish digital quote execution. Green means handled within the platform, red means work through calls or external sites in a typical fragmented home-service flow; it does not mean no existing business has a booking/payment interface. AI agents can perform the external work and are not incapable of booking. Last column is the planned integrated experience for participating authorized supply, not a live or universal solved-state claim. Scoping/quoting may still require merchant input.\nApproximate eras, not exact invention or adoption dates: pre-1990s directories, 1990s web, 2000s–2010s Maps/mobile, 2020s agents, Next planned AI agents + GoLocal. These do not imply a regular ten-year cycle. Craigslist dates its beginnings to early 1995: https://www.craigslist.org/about/mission_and_history . Google records Maps launch February 8 2005 and mobile expansion 2007–2012: https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/ . GoLocal green cells describe target workflows, not automation of every complex scope or user approval.';
for(let i=0;i<6;i++){const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});const v=new Uint8Array(await b.arrayBuffer());await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),v);if(i>0&&crypto.createHash('sha256').update(v).digest('hex')!==unchanged[i-1])throw Error(`Slide ${i+1} changed`);}
console.log('Slides 2–6 unchanged in rendered output.');
const candidate=path.join(WORK,'candidate.pptx');await(await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({explicitTotalSlideCount:6,workspaceDir:ROOT,candidatePath:candidate,finalPath:path.join(ROOT,'output/pptx/golocal-pitch-slide1-refined.pptx'),pythonExecutable:PY,integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','1'],requiredNativeTableOwnerSlides:[1],fontPolicy:{basis:'design',families:[font]},verifyArtifactToolImport:true,receiptPath:path.join(WORK,'validation-final.json')});
console.log('Finalized updated six-slide deck.');
