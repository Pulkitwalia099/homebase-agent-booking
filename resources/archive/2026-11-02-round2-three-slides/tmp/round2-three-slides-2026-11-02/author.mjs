import fs from 'node:fs/promises';
const ROOT='/Users/pulkitwalia/Documents/ChatGPT/Homebase';
const W=ROOT+'/tmp/round2-three-slides-2026-11-02';
const C={ink:'#103D3B',cream:'#F5F2E9',muted:'#53716A',green:'#236C4E',pale:'#E1EADC',rose:'#F0E2D9',red:'#A34E3F',sage:'#BDCCAD'};
function tx(s,str,x,y,w,h,size=26,color=C.ink,bold=false,align='left'){
 const sh=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});
 sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',alignment:align,wrap:'square'};return sh;
}
function footer(s,n,dark=false){tx(s,'GoLocal',60,677,200,25,18,dark?C.sage:C.muted,true);tx(s,n+' / 3',1150,677,70,25,17,dark?C.sage:C.muted,false,'right');}
export async function first({presentation:p}){
 p.delete(JSON.parse(await fs.readFile(W+'/source-element-ids.json','utf8')));
 p.delete(['sl/ofy9wn61','sl/jyx0ra1s','sl/i107q5of','sl/x8f69ofe']);
 const s=p.slides.getItem(0);s.background.fill=C.cream;
 tx(s,'THE OPPORTUNITY',60,32,1160,24,17,C.muted,true);
 tx(s,'From searching for a business\nto asking an agent to book it',60,86,1160,134,52,C.ink,true);
 tx(s,'Personal agents create a new way to buy local services.',60,234,1160,40,27,C.muted);
 const vals=[['“Book me a hotel.”','“Book me a plumber.”'],['Compare live prices and availability\nthrough a booking platform.','Search websites and call businesses\nfor individual quotes and slots.'],['Book, track and change the reservation.','Fragmented data and booking access.']];
 const t=s.tables.add({rows:3,columns:2,left:60,top:315,width:1160,height:204,columnWidths:[580,580],values:vals});t.styleOptions={headerRow:false,firstColumn:false,bandedRows:false};
 for(let r=0;r<3;r++)for(let c=0;c<2;c++){
  t.rows[r].height=[60,88,56][r];const cell=t.getCell(r,c);cell.fill=c===0?C.pale:C.rose;
  cell.text.style={fontSize:r===0?31:r===1?25:24,typeface:'Helvetica Neue',color:c===0?C.ink:C.red,bold:r!==1,alignment:'left',verticalAlignment:'middle',autoFit:'none',wrap:'square'};
  t.cells.block({row:r,column:c,rowCount:1,columnCount:1}).assign({margins:{left:20,right:14,top:6,bottom:6},borders:{left:{width:0,color:C.cream},right:{width:c===0?14:0,color:C.cream},top:{width:0,color:C.cream},bottom:{width:0,color:C.cream}}});
 }
 tx(s,'Agents can scope the job. They need live business data\nand booking access to finish it.',60,561,1160,85,30,C.ink,true);
 footer(s,1);
 s.speakerNotes.text=`Speaking pointers, about 40 seconds: Start with the vision that personal agents open a new route to local commerce. Use the hotel example once: an agent should compare available rooms and transact through a platform rather than call hotels individually. Local services remain fragmented across businesses and software. Agents can help scope a request, but dependable live data and authorized booking access are the missing connection GoLocal aims to provide. Transition directly to the product.\nThe comparison is illustrative: some local businesses already offer online booking and individual APIs. It does not claim that all agents always call providers or that no existing booking technology exists. Personal agents describe a capability and interaction pattern, including agent modes within existing AI products. Source: https://openai.com/index/introducing-chatgpt-agent/ . Hotel analogy and local-services opportunity are founder-supplied pitch framing. No claim about measured mass adoption or guaranteed platform preference.`;
 await p.render({slide:0});return {slideCount:p.slides.items.length};
}
export async function second({presentation:p}){
 const s=p.slides.getItem(1);s.background.fill=C.ink;
 tx(s,'THE PRODUCT AND FIRST LAUNCH',60,32,1160,24,17,C.sage,true);
 tx(s,'One booking layer for agents\nand local businesses',60,82,1160,130,50,C.cream,true);
 tx(s,'We connect participating businesses through the software they already use.',60,223,1160,38,26,C.cream);
 const a=tx(s,'Personal agent',60,302,290,44,30,C.cream,true,'center');
 tx(s,'Scopes the job\nGets customer approval',60,361,290,75,23,C.cream,false,'center');
 const b=tx(s,'GoLocal',475,302,330,44,34,C.sage,true,'center');
 tx(s,'Services, pricing and availability\nCompare, book and manage',435,361,410,75,23,C.cream,false,'center');
 const c=tx(s,'Business software',930,302,290,44,30,C.cream,true,'center');
 tx(s,'Schedules and price books\nBooking confirmation and updates',890,361,370,75,23,C.cream,false,'center');
 for(const [x,y] of [[a,b],[b,c]])s.shapes.connect(x,y,{kind:'straight',fromSide:'right',toSide:'left',line:{fill:C.sage,width:2,style:'solid'},tail:{type:'arrow',width:'sm',length:'sm'}});
 tx(s,'3',60,486,310,76,66,C.cream,true);
 tx(s,'Florida plumbing businesses\nonboarded and connected',60,571,350,62,24,C.cream);
 tx(s,'2–3 weeks',475,486,410,76,56,C.cream,true);
 tx(s,'Target to begin\nreal bookings',475,571,350,62,24,C.cream);
 tx(s,'10%',930,486,290,76,66,C.cream,true);
 tx(s,'Paid by businesses\non each booking;\nshared with partners',930,571,290,88,24,C.cream);
 footer(s,2,true);
 s.speakerNotes.text=`Speaking pointers, about 45–50 seconds: GoLocal connects participating businesses through their existing software so agents can compare suitable live options, obtain approval, book and manage the booking. Three plumbing businesses are onboarded and connected in Florida. Real bookings are targeted in 2–3 weeks. Planned fee: businesses pay 10% of booking amount, shared between GoLocal and contributing software/channel partners; no allocation specified. Prove a useful local booking network, then expand.\nLatest progress and target are founder-reported November 2, 2026. The 2–3-week target is not a completed launch or guarantee. Three connected businesses do not establish fulfilled paid jobs. The diagram describes intended supported operations across authorized connections; it does not claim every price book or scheduling action is available through every vendor. Jobber OAuth scopes: https://developer.getjobber.com/docs/getting_started/ . Complex plumbing scopes can require provider review or a site visit; customer approval is required and payment authorization is not capture. No sub-second booking claim.\nQ&A pointer, acquisition: identify explicit local plumbing requests on Nextdoor/Reddit; Google search ads being activated; ChatGPT ads test planned next week. These are experiments, not established acquisition economics or an agent-distribution agreement. Prioritize useful coverage and measure actual bookings, acquisition cost and repeat use. Ads are separate from agent recommendations: https://help.openai.com/en/articles/20001047-ads-in-chatgpt .`;
 await p.render({slide:1});return {slide:2};
}
export async function third({presentation:p}){
 const s=p.slides.getItem(2);s.background.fill=C.cream;
 tx(s,'THE FOUNDER AND ENGINEERING TEAM',60,32,1160,24,17,C.muted,true);
 tx(s,'Built local services for consumers.\nNow building for their agents.',60,82,1160,115,46,C.ink,true);
 s.images.add({path:W+'/team-image-0.jpeg',alt:'Pulkit Walia, founder',fit:'cover',position:{left:60,top:232,width:210,height:210},geometry:'roundRect',borderRadius:'rounded-xl'});
 tx(s,'Pulkit Walia',300,235,405,56,40,C.ink,true);
 tx(s,'Founder',300,297,405,36,27,C.green,true);
 tx(s,'Harvard Business School\nMBA',300,350,405,66,25,C.muted);
 tx(s,'Urban Company founding team',60,478,650,43,32,C.ink,true);
 tx(s,'Helped build the marketplace\nfrom launch to a $3B IPO.',60,532,640,88,30,C.ink);
 tx(s,'ENGINEERING TEAM',760,229,460,28,18,C.muted,true);
 s.images.add({path:W+'/team-image-1.jpeg',alt:'Rohit Jain, engineering team',fit:'cover',position:{left:760,top:282,width:106,height:106},geometry:'roundRect',borderRadius:'rounded-xl'});
 tx(s,'Rohit Jain',890,279,330,42,29,C.ink,true);
 tx(s,'Amazon, Square and Citrix\nProduction MCP integrations',890,332,330,73,22,C.ink);
 s.images.add({path:W+'/aryan.jpeg',alt:'Aryan Singh, engineering team, user-supplied portrait',fit:'cover',position:{left:760,top:464,width:106,height:106},geometry:'roundRect',borderRadius:'rounded-xl'});
 tx(s,'Aryan Singh',890,461,330,42,29,C.ink,true);
 tx(s,'Agent commerce at Grab\nHelped build GXS Bank',890,514,330,73,22,C.ink);
 footer(s,3);
 s.speakerNotes.text=`Speaking pointers, about 25 seconds: Pulkit is the sole founder. He helped build Urban Company in the consumer-app era and is now applying local-service marketplace experience to agent-driven bookings. Rohit and Aryan are members of the engineering team, not co-founders. Rohit brings engineering experience at Amazon, Square and Citrix plus production MCP integrations. Aryan brings work in agent commerce at Grab and experience helping build GXS Bank. Close on GoLocal as the booking layer for local services through personal agents.\nPulkit and Rohit biographies and portraits are from the founder's submitted final deck, golocal-pitch.pptx. Aryan's photo and personal background are supplied by Pulkit on November 2, 2026. LinkedIn reference: https://www.linkedin.com/in/aryan-singh-081851103/ (full profile could not be retrieved). Aryan's specific involvement in Grab agent commerce and building GXS is founder-reported and not independently verified. GXS Bank is the verified name of the Singapore digital bank backed by Grab and Singtel: https://www.gxs.com.sg/about-us . The corporate source establishes the bank's identity, not Aryan's role. No formal co-founder title or full-time commitment is inferred for either engineer.`;
 await p.render({slide:2});return {slide:3};
}
