const C={ink:'#103D3B',muted:'#53716A',green:'#236C4E'};
function tx(s,str,x,y,w,h,size=24,color=C.ink,bold=false){
 const sh=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0,style:'solid'}});
 sh.text=str;sh.text.style={fontSize:size,typeface:'Helvetica Neue',color,bold,insets:0,verticalAlignment:'top',autoFit:'none',alignment:'left',wrap:'square'};return sh;
}
export async function revise({presentation:p}){
 const s=p.slides.getItem(2);
 p.delete(['sh/l4bmp0v6','sh/65k3y5cr','sh/76d4radc','sh/87ml0vux','sh/t8vmt0vi','sh/2903m1cn','sh/3uhs3y1k','sh/it8rutkz','sh/4vqtw325','sh/ry1s7i1w']);
 p.resolve('im/v25sne50').position={left:60,top:230,width:140,height:140};
 p.resolve('im/kbu98zmd').position={left:780,top:270,width:96,height:96};
 p.resolve('im/mp0vuxov').position={left:780,top:485,width:96,height:96};
 tx(s,'Pulkit Walia',230,231,480,52,40,C.ink,true);
 tx(s,'Founder',230,290,480,34,27,C.green,true);
 tx(s,'Harvard Business School MBA',230,336,480,34,24,C.muted);
 tx(s,'Urban Company founding team',60,399,670,35,27,C.ink,true);
 tx(s,'Helped build from launch to a $3B IPO.',60,438,670,34,24);
 tx(s,'Launched a home security brand at 19',60,489,670,35,27,C.ink,true);
 tx(s,'Grew revenue to $700K.',60,528,670,34,24);
 tx(s,'Bessemer Venture Partners investor',60,579,670,35,27,C.ink,true);
 tx(s,'Deployed $15M in consumer AI startups.',60,618,670,34,24);
 tx(s,'ENGINEERING TEAM',780,229,440,28,18,C.muted,true);
 tx(s,'Rohit Jain',900,268,320,42,29,C.ink,true);
 tx(s,'Senior Software Developer\nat Grab',900,312,320,63,22,C.green);
 tx(s,'5 years at Amazon, Square and Citrix\nBuilt production MCP integrations',780,391,440,66,22);
 tx(s,'Aryan Singh',900,483,320,42,29,C.ink,true);
 tx(s,'Agent commerce at Grab',900,529,320,34,22,C.green);
 tx(s,'Helped build GXS Bank',780,603,440,34,22);
 s.speakerNotes.text='Speaking pointers, about 25–30 seconds: Pulkit is the sole founder. Lead with his Urban Company founding-team experience, helping build from launch to a $3B IPO. He also launched a home security brand at 19 and grew revenue to $700K, then deployed $15M in consumer AI startups as a Bessemer Venture Partners investor. Rohit and Aryan are the engineering team. Rohit is a Senior Software Developer at Grab, with prior Amazon, Square and Citrix experience and production MCP integrations. Aryan works on agent commerce at Grab and helped build GXS Bank. Close on applying this experience to local bookings through personal agents.\nSources: founder-submitted golocal-pitch.pptx for original founder and Rohit credentials. Pulkit corrected Bessemer amount from $50M to $15M and supplied Rohit current Grab title on November 2, 2026. Aryan history and portrait are founder-supplied. LinkedIn reference: https://www.linkedin.com/in/aryan-singh-081851103/ . GXS Bank identity: https://www.gxs.com.sg/about-us . Personal histories have not been independently verified. Rohit and Aryan are not co-founders.';
 await p.render({slide:2});
}
