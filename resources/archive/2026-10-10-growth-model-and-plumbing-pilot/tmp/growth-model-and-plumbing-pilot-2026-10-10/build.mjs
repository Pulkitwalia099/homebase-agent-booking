import fs from 'node:fs/promises';
import path from 'node:path';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const WORK=path.join(ROOT,'tmp/growth-model-and-plumbing-pilot-2026-10-10');
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(ROOT,'output/pptx/golocal-pitch-v22.pptx')));
async function replace(i,old,next){
 const all=(await p.inspect({select:`$.slides[${i}].elements[*]`,include:['id','text']})).records;
 const hits=all.filter(x=>x.text===old);
 if(hits.length!==1)throw new Error(`Expected one text target on slide ${i+1}: ${old}; got ${hits.length}`);
 const sh=p.resolve(hits[0].id);sh.text.replace(old,next);return sh;
}
await replace(3,'Salt Lake City pilot · One city, one service category','Build critical mass in one city-category combination.');
await replace(3,'1  Start with one market','1  Build local supply');
await replace(3,'Salt Lake City','One city');
await replace(3,'Partners onboard businesses.\nWe recruit users with a\nspecific booking need.','Onboard suppliers to reach\ncritical mass. Recruit users\nwith a specific booking need.');
await replace(3,'“Add GoLocal to book\nlocal services for me.”','“Add GoLocal to find\nme local services.”');
await replace(3,'One-time setup, with approval.\nThen book through your agent.','One-time setup, with approval.\nThen use it for future bookings.');
await replace(3,'3  Grow through bookings','3  The network compounds');
await replace(4,'Partnerships to launch the Salt Lake City pilot','First proof of concept: Salt Lake City plumbing');
await replace(4,'Channel partnerships give GoLocal a pipeline of provider introductions.','Two channel partnerships give us a pipeline of provider introductions.');
await replace(4,'One city. One service category.','Pilot goal: turn agent requests into confirmed bookings.');
p.slides.items[3].speakerNotes.text='GoLocal repeatable growth model, updated from the founder request October 10, 2026. This slide deliberately contains no named pilot city or category. Pick one city-category combination, onboard enough participating suppliers for useful local coverage and recruit users with the relevant booking need. This is the proposed cold-start strategy, not evidence that critical mass or demand already exists. Users can start setup by asking their personal agent: "Add GoLocal to find me local services." One-time connector setup can require sign-in and approval on a compatible platform; each transaction retains its own authorization. The installed connector can then serve future eligible requests. The diagram represents the proposed network effect: useful bookings support agent suggestions, more booking requests attract more businesses, better supply supports useful bookings. Recommendations depend on usefulness, reliability and platform rules, not guaranteed automatic cross-user learning, ranking or traffic. Source basis retained from the approved slide: https://developers.openai.com/plugins/plugin-guidelines ; https://openai.com/index/developers-can-now-submit-apps-to-chatgpt/ ; https://muse.ai/platform/docs . These primary sources were reviewed for the prior approved October 10 slide; this revision changes the framing, not their evidence level. Expand category by category and city by city after demonstrating useful supply and booking outcomes. Proposed revenue remains a business-paid success fee on fulfilled new-customer jobs, shared with contributing partners. Prices, shares, paid continuation and margins remain unmeasured/unagreed. The concrete Salt Lake City plumbing proof of concept and existing channel partnerships are on slide 5. No named city/category should be inferred from this general model.';
p.slides.items[4].speakerNotes.text='Planned proof of concept: Salt Lake City, plumbing. Latest founder instruction October 10, 2026 specifies this city-category combination and asks that it be introduced on slide 5 rather than slide 4. This updates the prior unspecified-category pilot plan, without asserting a live integration, completed GoLocal booking, paid revenue or proven demand. Two founder-reported channel partnerships are already secured for provider introductions: Cactus AI agreed to introduce GoLocal to 50+ service partners; YourCardare, the regional back-office partner, has another 10+ providers in the pipeline. These figures are kept separate, are not inferred to be all unique, all Salt Lake City plumbers, committed onboardings or live supply. The latest pipeline framing supersedes prior commitment language and the historical YourCardare 56 figure; original evidence remains archived. The planned sequence is partner introductions, onboard consenting providers and connect supported software, then test customer-authorized personal-agent bookings. Pilot goal is to turn eligible agent requests into actual provider-confirmed bookings. Merchant booking permissions, supported actions, usable plumbing coverage, a reachable first audience and customer demand still need to be established. The general supply/demand model, one-time connector setup and conditional network effect are shown on slide 4. Partner names and counts are founder-supplied facts, not new public-source claims or platform endorsements.';
await fs.mkdir(path.join(WORK,'renders'),{recursive:true});
for(const i of [3,4]){
 const b=await p.export({slide:p.slides.items[i],format:'png',scale:2});
 await fs.writeFile(path.join(WORK,'renders',`slide-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));
}
await(await PresentationFile.exportPptx(p)).save(path.join(WORK,'candidate.pptx'));
console.log('Slides 4 and 5 updated in the approved layouts.');
