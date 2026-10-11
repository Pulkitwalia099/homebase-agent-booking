import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
import {makeNativeBulletParagraphs} from '/Users/pulkitwalia/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations/container_tools/artifact_tool_utils.mjs';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/team-premium-2026-10-10');
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v21.pptx')));
const id=(await p.inspect({select:'$.slides[5]',include:['id']})).records[0].id;
const s=p.resolve(id);
p.delete((await p.inspect({select:'$.slides[5].elements[*]',include:['id']})).records.map(r=>r.id));
const C={ink:'#193C32',muted:'#65746C',bg:'#FBF9F4',green:'#236C4E'};
s.background.fill=C.bg;let n=0;
function tx(str,x,y,w,h,size=26,color=C.ink,bold=false){
 const sh=s.shapes.add({geometry:'textbox',name:`team-premium-${n++}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});
 sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',alignment:'left',autoFit:'none',wrap:'square'};return sh;
}
async function img(file,alt,x,y,w,h,rounded=false){
 const contentType=file.endsWith('.svg')?'image/svg+xml':/\.jpe?g$/.test(file)?'image/jpeg':'image/png';
 return s.images.add({blob:new Uint8Array(await fs.readFile(path.join(WORK,'assets',file))),contentType,alt,fit:'contain',position:{left:x,top:y,width:w,height:h},...(rounded?{geometry:'roundRect',borderRadius:'rounded-2xl'}:{})});
}
tx('THE TEAM',52,27,1176,25,17,C.muted,true);
tx('The team behind GoLocal',52,65,1176,68,46,C.ink,true);
await img('live-image-6.jpeg','Pulkit Walia',52,175,132,132,true);
await img('live-image-2.jpeg','Rohit Jain',688,175,132,132,true);
tx('Pulkit Walia',210,175,400,49,36,C.ink,true);
tx('Stratton',210,226,180,34,24,C.green,true);
const lp=tx('LinkedIn',412,231,120,29,18,C.muted);
lp.text.get('LinkedIn').link={uri:'https://www.linkedin.com/in/pulkitwalia/',isExternal:true};
tx('Rohit Jain',846,175,382,49,36,C.ink,true);
tx('Engineering',846,226,185,34,24,C.green,true);
const lr=tx('LinkedIn',1060,231,130,29,18,C.muted);
lr.text.get('LinkedIn').link={uri:'https://www.linkedin.com/in/rohit-jain-343437187/',isExternal:true};
await img('repo-hbs.jpg','Harvard Business School logo',210,275,44,44);
tx('Harvard Business School\nMBA',270,273,350,59,21,C.muted);
await img('tamu.png','Texas A&M University official logo',846,270,36,36);
tx('Texas A&M, Computer Science',898,274,330,34,20,C.muted);
await img('iit-emblem.jpg','IIT Kharagpur official emblem',846,315,36,36);
tx('IIT Kharagpur',898,319,330,32,20,C.muted);
function bullets(items,x,y,w,h,emphasis){
 const sh=tx('',x,y,w,h,26,C.ink);
 sh.text=makeNativeBulletParagraphs(items,{marginLeftPoints:18,hangingPoints:9,spaceAfterPoints:16});
 sh.text.style={fontSize:26,typeface:'Helvetica Neue',color:C.ink,insets:0,verticalAlignment:'top',alignment:'left',autoFit:'none',wrap:'square'};
 for(const str of emphasis)sh.text.get(str).bold=true;
 return sh;
}
bullets([
 'Built Asia’s largest home services marketplace from zero to a $3B IPO as an Urban Company founding team member.',
 'Launched a home security brand at 19, scaling it to $700K in revenue.',
 'Investor at Bessemer Venture Partners, deploying $50M in consumer AI startups.'
],52,387,558,271,['Asia’s largest home services marketplace','$3B IPO','at 19','$700K','Bessemer Venture Partners','$50M']);
bullets([
 '5 years as a Senior SWE at Amazon, Square and Citrix.',
 '#1 system design tutor on Udemy, with 2,500 engineers taught.',
 'Built production-grade MCP integrations.'
],688,387,540,271,['5 years','Senior SWE','Amazon, Square and Citrix','#1 system design tutor','Udemy','2,500','production-grade MCP integrations']);
await img('repo-uc.jpg','Urban Company logo',76,670,24,24);
await img('repo-bessemer.jpg','Bessemer Venture Partners logo',114,670,24,24);
await img('repo-amazon.jpg','Amazon logo',712,670,24,24);
await img('repo-square.jpg','Square logo',750,670,24,24);
await img('live-image-5.png','Citrix logo',788,670,24,24);
tx('6 / 6',1160,695,70,21,17,C.muted);
s.speakerNotes.text='Team credentials as supplied and corrected by the founder on October 10, 2026. Pulkit Walia label "Stratton" is used exactly as requested, replacing "Founder" without inferring another title. The founder describes Urban Company as Asia\'s largest home services marketplace and his role as founding team member helping build from zero to a $3 billion IPO. Company IPO milestone is not GoLocal revenue/valuation. First venture at age 19: consumer home security systems brand, $700K revenue. Investor at Bessemer Venture Partners, deploying $50M in consumer AI startups. All facts preserved as supplied; no independent audit inferred. Rohit Jain latest founder description: five years as a Senior SWE at Amazon, Square and Citrix; #1 system design tutor on Udemy; 2,500 engineers taught; built production-grade MCP integrations. The latest 2,500 supersedes the prior 25,000+ in this deck. Exact basis and date of the #1 ranking are founder-supplied rather than independently established, and it is not reframed as a different ranking. Education from founder screenshot/live page https://laoh.ai/: Pulkit Harvard Business School MBA; Rohit Texas A&M Computer Science and IIT Kharagpur. No extra degree type, CTO/cofounder title or commitment inferred. Photos are original screenshot versions from live Laoh assets, with native rounded image geometry. Original company marks and HBS mark are from public/team in the founder-supplied https://github.com/Pulkitwalia099/get-an-expert-web (commit 6aedaea); Citrix from the live Laoh page. Education logos: Texas A&M official https://aux.tamu.edu/logos/boxTAM.svg sourced from https://marcomm.tamu.edu/creative-platform/logos/; IIT Kharagpur official emblem from the National Informatics Centre asset library https://www.uxdt.nic.in/documents/iit/iit-kharagpur/ and original image https://www.uxdt.nic.in/wp-content/uploads/2024/06/iit-khargpur-01.jpg. Texas A&M SVG is rasterized only for compatibility, preserving its original artwork and colors. Complete logos retain proportions. LinkedIn profiles: https://www.linkedin.com/in/pulkitwalia/ and https://www.linkedin.com/in/rohit-jain-343437187/. Company and university logos identify background, not GoLocal partnerships or endorsements.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
const b=await p.export({slide:s,format:'png',scale:2});
await fs.writeFile(path.join(WORK,'renders/slide-6.png'),new Uint8Array(await b.arrayBuffer()));
await (await PresentationFile.exportPptx(p)).save(path.join(WORK,'candidate.pptx'));
console.log('Two profiles with six native bullet points and rounded photographs exported.');
