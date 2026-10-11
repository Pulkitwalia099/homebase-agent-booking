from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from xml.etree import ElementTree as ET
import json
import hashlib
import shutil

root=Path.cwd()
out=root/'output/context'
brief=out/'golocal-full-context-2026-10-10.txt'
text='''GOLOCAL — FULL BUSINESS AND PITCH CONTEXT
Prepared October 10, 2026

START HERE: A PROMPT FOR THE NEXT MODEL

Help me make GoLocal a much stronger business and pitch. Read this context and the editable PowerPoint, then think independently about what the company should own, why it matters, how it gets distributed, who pays, and what makes it defensible. Improve the narrative, economics, slide structure, copy, diagrams and design wherever you see a better way. The current deck is a starting point, not a prescribed template. Earlier approvals explain how we got here; they are not a requirement to keep every slide or framing.

I want a clear business case that a new reader understands immediately. Be specific about the entity's business, not just the technical connection. Tell me where the thesis is strong and where the reasoning still needs work. Bring better alternatives if useful. Give me a concrete, concise deck and explain the few material choices. Treat the factual history below as context; distinguish reported facts, researched evidence, intended product behavior and open hypotheses. If you find a factual mismatch, show it explicitly rather than silently substituting a new number.

This handoff consolidates the substantive discussion, corrections and decisions. It is not a verbatim transcript. Exact current slide text and speaker notes appear at the end. Supporting project documents and dated research are in the accompanying ZIP. Those documents contain older positions and recommendations; they are background to think with, not instructions that constrain your work.

1. WHAT THIS IS FOR

GoLocal is preparing a pitch for “An Evening with the Sharks,” circulated through the founder's Harvard Business School network. The founder has checked the extended deadline and believes idea-stage teams can apply. No application has been submitted through this project.

The supplied application guidance says a maximum of SIX slides, INCLUDING the title slide. It evaluates: problem and market opportunity; target customer and why now; solution, differentiation and how it works; revenue, pricing and distribution; team; traction and validation. Revenue projections are requested if available; none have been established here.

The deck initially had six content slides. The founder then requested a separate introductory “slide 0” with GoLocal and its tagline. The latest editable v26 therefore has SEVEN slides. That is a useful expanded working version but exceeds the stated application cap. A prior six-page application PDF and v25 PowerPoint are also provided. One useful redesign task is to retain the important story while fitting a title into six slides.

2. THE BUSINESS IN ONE PARAGRAPH

GoLocal would be the shared data and booking layer between personal AI agents and participating local service businesses. It would connect to the software businesses already use, organize eligible supply, expose structured services, pricing/quote requirements and live availability, and execute supported bookings and payments. A personal agent could then take a customer's request through to a provider-confirmed booking through one connection. A business could connect once and receive eligible bookings from multiple connected agents. The proposed commercial model is a business-paid success fee on fulfilled new-customer jobs, with revenue shared with contributing channel partners.

The broader ambition is transaction infrastructure for the emerging agent economy, starting with local services. “Stripe for home services” was an explanatory analogy the founder liked. It conveys infrastructure and monetization better than a simple connector, but the founder removed it from the opening slide because it distracted from establishing the market opportunity first. Whether an execution API, a supplier network, a marketplace or a hybrid is the right business is still worth thinking through.

Current name: GoLocal. Tagline: “Local services, booked by your personal agent.” Earlier name: Homebase. Naming discussions explored Relay, Carry, Sorted, All Set, pet/local-expert references and Lokie. GoLocal replaced Lokie because of the Loki/Marvel association. The current task is improving the business and deck, not restarting naming by default.

3. THE MARKET STORY THE FOUNDER WANTS PEOPLE TO UNDERSTAND

Every major platform shift creates a new way to find and buy local services. Telephones supported Yellow Pages; the internet supported Google/Craigslist; mobile plus GPS supported Google Maps; LLMs supported conversational chatbots; personal agents now let people delegate tasks. These are illustrative eras and incremental capabilities, not exact invention dates.

Historically, local-service search was heavily concentrated on Google and Google Maps. Personal agents introduce more starting points for requests. The founder expects several agents with different user groups and strengths, rather than one winner owning all demand. There may still be consolidation. The extent of actual local-search migration has not been measured in this project.

The gap: a user can delegate a task, but the agent still pieces together websites, forms, calls and callbacks to get scope, quotes, live availability, bookings and payments. It can call businesses, but calling one by one does not create a comprehensive structured transaction layer. The founder's illustrative comparison was roughly 15 minutes calling three or four providers versus a target of under five seconds for an API lookup. That is a motivating comparison, not measured GoLocal performance or total end-to-end booking latency.

Uber, DoorDash and Booking.com illustrate how organized supply plus a transaction layer makes a service easier to buy. Booking a ride or food order is straightforward through an established platform. Local services across trades, cleaning and other categories are much more fragmented. Existing marketplaces and software do solve parts of this problem; the opportunity is to identify and own the remaining gaps rather than assume nobody has built anything relevant.

The story should show PROGRESSIVE UNLOCKS. The founder repeatedly rejected versions that looked like a static timeline or made it unclear what each platform solved. The latest opening uses a green staircase of cumulative capabilities and three red transaction bottlenecks. It distinguishes the enabling technology from the platform built on it. Personal agents solve delegation; they still need structured supplier data and transactional access to finish the task efficiently.

4. WHY BOTH SIDES NEED A SHARED LAYER

Demand side: many personal agents, each potentially needing to recruit local supply, integrate different tools and manage booking workflows. The deck gives Instinct, Muse, Dots, Town, Hark, OpenClaw and Hermes as illustrative examples and mentions Claude and Gemini. These examples are not GoLocal partners. They also include different types of assistants, frameworks and platforms; a cleaner taxonomy may help.

Supply side: many independent businesses, plus fragmented software even WITHIN one service category. Plumbing is the current illustration. Enterprise, mid-market and small businesses use different stacks, with overlap. The stack changes again for cleaning, landscaping and other categories. The founder did not want a diagram that implied ServiceTitan was the single main system and GoLocal merely connected many businesses through it.

Current examples:
- Enterprise: BuildOps, ServiceTitan, Simpro, Probook AI and other platforms.
- Mid-market: Housecall Pro, FieldEdge, Service Fusion, Commusoft, Joblogic, Cactus AI and others.
- Small business: Jobber, Workiz, ServiceM8, Kickserv, Topline Pro and many other platforms.

These are illustrative, overlapping segments. AI operations products sit alongside conventional field-service software in the diagram. A software-directory listing supports “100+ listed plumbing products” across the category, not 100 firms in each tier or a measured market-share statistic. Earlier suggestions of 20+/50+/100+ per segment and no vendor above 5% were not established. Pro AI was clarified as Probook AI. Robinline was omitted because of category fit. Character AI was not included as plumbing software.

Businesses already hold much of the information agents need in their operating systems: services, coverage, scope/quote rules, schedules and customer/booking records. That does not mean every required field is clean, current or available through an API. Merchant-by-merchant permissions and supported operations matter.

Value to agents: immediate access to eligible participating supply to discover, filter, book and manage bookings through one integration, reducing repeated supplier recruitment and integration work.

Value to businesses: one integration can expose them to multiple connected agents. For supported platforms, setup may be a one-click OAuth approval through an app marketplace. Other systems may need credentials, manual setup or a custom integration. The business continues using its existing software. The founder's point was distribution and transaction access with minimal repeated setup, not just less administration.

5. WHAT THE PRODUCT WOULD ACTUALLY DO

The intended path is personal agent → GoLocal → provider software → local business.

GoLocal needs to normalize relevant supply information, identify an eligible provider, return accurate scope/price/availability, execute the permitted booking action, confirm provider acceptance and support subsequent status or changes where available. Payment authorization, payment settlement and job completion are separate outcomes.

Some work can be quoted and booked directly. A plumbing repair may require a diagnostic visit before a final repair quote. The example therefore books a visit rather than pretending the entire repair can be priced from one sentence. Complex scoping can still require photos, a call or human judgment.

Questions about the product boundary remain: Does GoLocal own supply quality, booking reliability, payment orchestration, failed-booking recovery and post-booking management? Which of these produces durable value beyond connecting APIs? Does it integrate software vendors directly, work through existing supplier networks, or onboard businesses one by one? What does a sufficiently useful first version actually include?

Prior integration research considered Jobber OAuth/GraphQL, Housecall Pro API access, Launch27, BookingKoala and MaidCentral. Public booking pages, API documentation, webhooks and production booking permissions are different evidence levels. An event integration does not necessarily allow booking writes. Plumbing is the current pilot choice; cleaning vendors remain historical research rather than the chosen launch stack.

6. DISTRIBUTION IS THE CENTRAL BUSINESS QUESTION

Building an MCP and onboarding suppliers does not automatically make it discoverable or selected by agents. The original central question was: how do actual requests reach us?

The near-term proposed experience is a one-time prompt to a compatible agent: “Add GoLocal to find me local services.” Setup may require sign-in and approval. After installation, the connector can support future eligible bookings. This phrase is the intended entry point, not proof that every agent supports identical installation.

The founder wants a coherent connector-led growth story instead of a slide listing “two routes.” Start with one city-category combination, build useful supplier coverage, recruit users with a specific recurring or urgent booking need, and make the connector useful. Successful bookings may support agent suggestions and broader discovery; more requests can attract more providers; better coverage makes the connector more useful. Expand category by category and city by city.

The long-term ambition is first-party integration or a deep partnership with a large personal-agent platform, making GoLocal the default for relevant service requests. No such demand-routing agreement has been reported. Even a platform partnership would need defined categories, coverage and routing terms; it does not imply capturing every search query.

Earlier discussion considered directory/marketplace discovery and direct marketing to niches already using personal agents. A listing, an installed connector, a selected tool, a confirmed booking and a fulfilled paid job are distinct milestones. The founder believes useful connectors increasingly get recommended by agents; prior research supports conditional discovery/featuring, not a guaranteed autonomous flywheel.

Cold start requires BOTH enough eligible local suppliers and enough users submitting useful requests. The founder suggested a possible product-led supply tactic: bring a real request to a vendor and make signing up to convert it simple. This is a growth idea, not an executed acquisition channel. Candidate demand archetypes discussed include move-in cleaning before furniture arrives, plumbing needs, and households already using agents for errands. The precise reachable audience is still an important missing choice.

Questions to improve: Where do the first 100 requests come from? What is the user's burning need? Why install GoLocal rather than let the agent browse/call? Can a software partner also distribute demand? How does GoLocal win selection among competing connectors? What evidence gets it recommended? How expensive is the first city-category launch and how much of it repeats in the next city?

7. REVENUE AND THE SCALE QUESTION

Current deck model: participating businesses pay a success fee on FULFILLED NEW-CUSTOMER jobs; contributing partners share in revenue. No fee, take rate, split or pricing agreement has been finalized. There are no reported revenue projections, unit economics or paid continuation.

New-customer acquisition and existing-customer coordination are different commercial hypotheses. A merchant may pay to acquire a new customer but not for every reschedule or repeat visit. Repeat bookings therefore do not automatically equal repeated monetization. Lead cost, acquired-customer cost, gross service revenue, GoLocal revenue and contribution after costs are different quantities.

Older cleaning/Wajo analysis used $100/$40 acquisition costs, $60/$30 fees and a 60/40 split as illustrations. Those are not measured or agreed and are not the current pitch's pricing. The current thesis was deliberately kept simpler.

The business may look like a useful feature if it is only a thin adapter, a service business if it needs bespoke manual coordination, or vertical software if recurring workflows can be reused for paying buyers. A venture-scale case needs repeatable distribution, reliable transactions, attractive contribution and expansion across meaningful categories. Supplier access, execution quality, permissions, transaction history, workflow reuse and partner distribution are possible sources of differentiation to evaluate, not established moats.

8. PARTNERSHIPS, PILOT AND CURRENT VALIDATION

The founder has had customer interviews and partnership calls and reports positive responses. Detailed interview counts, documented quotes and paid commitments are not provided.

Current proof-of-concept plan: SALT LAKE CITY, PLUMBING. This belongs on the pilot slide, not the general growth slide. The planned goal is to turn eligible personal-agent requests into provider-confirmed bookings.

Cactus AI: founder-reported channel partnership, agreed to introduce GoLocal to 50+ service partners. Earlier founder context described a YC/venture-backed business with 100+ mid-market trade-shop customers across Salt Lake City and Dallas and potential booking access through existing customers. The latest deck emphasizes introductions, not deployed access or dominance in the market.

YourCardare: named regional back-office partner, another 10+ providers in the pipeline. The founder corrected the older number to 10+ in an annotation. An earlier 56 figure and an earlier 20-client reference are historical, not the latest deck count.

Use pipeline/introductions language. The founder explicitly rejected “committed onboarding” as an overpromise. Do not add the partner counts into a claimed unique live supply total: overlap, geography, category eligibility and integration readiness have not been established.

The planned sequence is introductions → onboard consenting providers and connect supported systems → test initial agent bookings. No live GoLocal transaction, paid revenue, production booking reliability or representative agent-demand volume has been reported. The partnership pipeline is valuable supply access and early validation, not proof that demand or economics are solved.

9. TEAM: LATEST FOUNDER-SUPPLIED FACTS

Pulkit Walia — Operations and Partnerships
LinkedIn: https://www.linkedin.com/in/pulkitwalia/
Education: Harvard Business School MBA.
- Built Asia's largest home services marketplace from zero to a $3B IPO as an Urban Company founding team member, over the last decade.
- Launched his first venture at 19: a consumer home security systems brand, scaling to $700K in revenue.
- Investor at Bessemer Venture Partners, deploying $50M in consumer AI startups.

Rohit Jain — Engineering
LinkedIn: https://www.linkedin.com/in/rohit-jain-343437187/
Education: Texas A&M, Computer Science; IIT Kharagpur.
- Five years as a Senior SWE at Amazon, Square and Citrix.
- #1 system design tutor on Udemy, with 2,500 engineers taught.
- Built production-grade MCP integrations.

These are the founder's supplied credentials. The latest 2,500 figure replaces an older screenshot's 25,000+ in the pitch. The exact scope/date of the Udemy ranking was not independently established. The $3B IPO belongs to Urban Company, not GoLocal. Rohit's precise employment commitment, ownership and cofounder/CTO status have not been specified. The latest Pulkit role supersedes the earlier requested “Stratton” wording. A garbled later annotation did not clearly replace the explicit $50M investment figure.

The desired team positioning is relevant execution experience on both sides: Pulkit has built and scaled the underlying local-service business; Rohit can build reliable systems and production MCP integrations. Three useful points each. Real photos, soft rounded corners, education logos, recognizable company NAMES and restrained emphasis. Earlier tiny company logos did not communicate enough and were removed.

Asset repositories supplied by the founder:
https://github.com/RohitJain1103/laoh-web
https://github.com/Pulkitwalia099/get-an-expert-web
Original photos and logo sources are included in the bundle, with local provenance notes.

10. CURRENT DECK FLOW AND WHY EACH SLIDE EXISTS

Cover / slide 0: GoLocal and the tagline. Minimal introduction.

Slide 1 / opportunity: $1.2 trillion+ U.S. local-services opportunity. Show cumulative platform unlocks and three unfinished transaction steps. Establish market and bottleneck before pitching the product.

Slide 2 / solution architecture: fragmented personal agents on the left, GoLocal in the middle, fragmented plumbing software stacks and businesses on the right. Show the data/actions GoLocal provides and the business benefit of one connection. This diagram is deliberately more than a row of business logos.

Slide 3 / customer outcome: a concrete request travels from scoping to live options to customer approval to provider-confirmed booking. It should make the architecture tangible without repeating it. Current illustrative request is Dallas/tomorrow/leaking kitchen tap; Oak Plumbing, $79 diagnostic visit, 9–11 am and GL-1042 are fictional example values. Dallas in the illustration is not the pilot location. Choosing a consistent city may improve the story.

Slide 4 / growth and business model: one city-category, critical supply plus user acquisition, one-time setup, conditional booking/recommendation/supply loop, expand, success fee on fulfilled new-customer jobs. The founder wanted a simple repeatable growth model, not multiple distribution routes or a dense pilot plan.

Slide 5 / initial proof: Salt Lake City plumbing, Cactus AI 50+ introductions, YourCardare another 10+ pipeline providers, planned route to confirmed bookings. Partnership pipeline rather than invented traction.

Slide 6 / team: relevant marketplace-building experience plus engineering/MCP capability, two clear profiles with three points each.

The intended logical flow is market shift → remaining gap → shared layer → completed customer outcome → distribution/economics → initial access/validation → team. The six-slide cap may require combining proof with growth, incorporating a branded title into the market opening, or choosing another cleaner arrangement. A better model should decide rather than mechanically squeeze text.

11. WHAT THE FOUNDER REPEATEDLY LIKED AND DISLIKED

Liked: single, simple, useful phrases; an understandable business story; concrete customer requests; visually explicit platform progression; a sharp “one connection for agents, one integration for businesses” close; large opportunity with a realistic entry wedge; clean, consistent diagrams; premium restrained design; substantive business questions.

Disliked: attractive visuals with content a new reader cannot understand; too many sections and dense paragraphs; technical jargon without explaining the business; repeated architecture; spending too much time on pilot mechanics; forcing content onto a page at the expense of readability; excessive bolding; unclear roles/partnership language; a diagram implying one dominant supplier software company; logos that look inconsistent or overwhelm the story.

The earlier thesis was for friends/advisors, eventually aimed at 1–2 readable pages. Readers already understand MCP, so MCP 101 was not needed. The founder wanted definitive language for what is being built, while leaving genuinely undecided routes as open strategic choices. He explicitly asked not to silently change his sourced facts. His latest request is to give the next model full context and freedom to improve, without locking it into the existing presentation.

12. MARKET AND WHY-NOW EVIDENCE: WHAT THE NUMBERS MEAN

The current opening's “$1.2 trillion+” is the founder's preferred broad-market framing. The project's supporting calculation is approximately $1.19–$1.20T across selected U.S. categories, with mixed years and measures:
- Home improvement/repair: around $600B; Harvard JCHS, 2023 actual / 2025 projection including owner and rental stock. Includes materials and DIY.
- Auto maintenance/repair: $283.802B; BEA 2025.
- Personal care and clothing services: $239.558B; BEA 2025, a broad category.
- Child day care: $65.547B; Census 2024 revenue.

This is underlying spending, not GoLocal's bookable volume or fee revenue. The supplied calculation is approximate rather than an independently published $1.2T+ lower bound. Earlier short-thesis wording used $2T local services and $600B home services; the current deck later changed its opening. These documents have different revision dates. The context bundle preserves them rather than rewriting historical source bodies.

Current funding caption: “$2B+ raised,” based on selected-company reported funding in the project ledger: Hark over $700M Series A; Instinct $1B Series C plus an earlier reported $350M cumulative total; Town $55M Series A. Selected total exceeds $2.105B. It is not all last-month funding and not money raised by every agent pictured. Broader AI-lab funding and valuations are not additive evidence for this narrow headline. Earlier requests for $3B+ or “last month” were not retained as verified claims. Funding supports why-now context; it is not consumer adoption, local-service demand or proof of a successful GoLocal channel.

13. EARLIER STRATEGIC DISCUSSION: WHAT ELSE MIGHT BE BETTER?

Before building the deck, the founder wanted to share the thesis with a technical friend already working in agent middleware. He asked:
1. Is third-party infrastructure already available?
2. If not, what use cases should we build?
3. Is there a B2B wedge with faster monetization?
4. Are there more exciting middleware spaces beyond local services?

The technical-discussion note explored what GoLocal should own beyond a connector: accepted bookings, delegated permissions, workflow execution across businesses, recovery of interrupted work and verification of completed outcomes.

Prior research identified Composio for authentication/connections; PACT and Personal Agent Protocol for permission/trust patterns; Updater for agent/app commerce in complex services; Square Bookings and Openbay for existing transaction access. These are relevant competitors, complements or possible infrastructure to use. Their existence challenges an absolute “no middleware exists” claim. Coverage in the chosen workflow remains a concrete research question.

B2B alternatives discussed:
- Stalled appliance-repair cases involving approval, return visits or claim paperwork. Potential buyer: retailer/service-network operator; existing ServicePower coverage means identifying a narrow residual problem.
- Travel cancellation/refund follow-through across supplier and seller/customer payment systems. Existing Duffel and servicing products may already cover significant parts.
- Deadline-driven property-service exceptions before move-in or inspection. Existing maintenance coordinators such as Latchel make broad coordination a crowded starting point.
- Operator capacity recovery, specific property-maintenance coordination, freight-forwarder/broker use cases and other cross-business execution problems as adjacent hypotheses.

A B2B buyer with an existing request queue could reduce dependence on consumer connector adoption, but does not validate personal-agent demand. Faster monetization depends on actual willingness to pay and procurement, not the B2B label alone. Useful broader product directions include vertical execution APIs, recurring exception resolution and reconciliation/confirmation of completed outcomes. There was no decision to abandon the GoLocal consumer/agent thesis; these remain options to examine.

14. KEY OPEN QUESTIONS FOR A STRONGER PITCH

- What EXACTLY is GoLocal selling: qualified acquisition, confirmed bookings, execution infrastructure, software access or operational completion?
- Who is the first payer and why is the fee justified by incremental value?
- What is the initial demand audience and acquisition channel, beyond supplier introductions?
- Why this first city/category, and what constitutes sufficient supply coverage?
- Which critical actions are available through the first partner's systems? What requires human work?
- Why would agent platforms select GoLocal over browser/calling tools, vendor-native connectors or an incumbent network?
- What remains differentiated as agent capabilities and software APIs improve?
- How does the proposed recommendation loop actually operate on each platform?
- Can success-fee revenue support user acquisition, integration maintenance, support, partner shares and failure recovery?
- What evidence would make this a compelling venture-scale infrastructure story rather than a promising connector or coordination service?
- Does an existing B2B queue offer a more credible starting wedge while preserving the longer-term agent-commerce opportunity?
- Which two or three pilot outcomes best test demand, reliable execution and economics?

15. WHAT IS IN THE TRANSFER BUNDLE

Working deck: decks/golocal-pitch-v26.pptx — editable, cover plus six content slides.
Six-slide alternative: decks/golocal-pitch-v25.pptx — original content version without the cover.
PDFs: pdf/golocal-pitch-with-cover.pdf and pdf/golocal-application-final.pdf.
Context: this file, including exact extracted slide text and source notes below.
Project sources: resources/business-thesis.md, current-thesis.md, technical discussion, market sizing, pitch wireframe and dated evidence JSON files. Earlier positions are preserved in these source documents.
Research: selected exa-results research, source/evidence captures and ledgers where available.
Assets: original supplied agent images and team images/logos with provenance notes. PowerPoint already embeds the images it uses.
A file manifest records paths and hashes. This is a local handoff; no Page synchronization or application submission took place.

Source URLs are also in the exact speaker notes and supporting research. The bundle carries earlier research, not a new live verification of all vendor capabilities or platform rules. This gives the next model the evidence trail to inspect and update as needed.

END OF CONSOLIDATED CONTEXT

APPENDIX: EXACT TEXT AND SPEAKER NOTES FROM THE CURRENT EDITABLE DECK

The following is XML-extracted text. Some words in graphical logos do not appear as text, and table reading order is the PowerPoint XML order rather than a visual grid. Text split by emphasis may occupy separate lines. These notes explain the provenance and intended meaning of the actual deck; they are part of the handoff, not restrictions on redesign.
'''
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
ppt=root/'output/pptx/golocal-pitch-v26.pptx'
with ZipFile(ppt) as z:
 for i in range(1,8):
  slide=ET.fromstring(z.read(f'ppt/slides/slide{i}.xml'))
  body='\n'.join(t.text or '' for t in slide.findall('.//a:t',ns))
  text+=f'\n\nPAGE {i} — LOGICAL SLIDE {i-1}\n'+'='*64+'\n\nVISIBLE TEXT\n'+body+'\n\nSPEAKER NOTES\n'
  note=f'ppt/notesSlides/notesSlide{i}.xml'
  if note in z.namelist():
   text+='\n'.join(t.text or '' for t in ET.fromstring(z.read(note)).findall('.//a:t',ns))+'\n'
brief.write_text(text,encoding='utf-8')

entries={}
def add(path, rel):
 if path.is_file(): entries[rel]=path
add(brief,brief.name)
for name in ['golocal-pitch-v26.pptx','golocal-pitch-v25.pptx']:
 add(root/'output/pptx'/name,'decks/'+name)
for name in ['golocal-pitch-with-cover.pdf','golocal-application-final.pdf']:
 add(root/'output/pdf'/name,'pdf/'+name)
# Retain source bodies, not operational instruction files or the recursive archive.
for p in sorted((root/'resources').glob('*')):
 if p.is_file() and p.suffix in ['.md','.txt','.json']:
  add(p,p.relative_to(root).as_posix())
for dirname in ['agent-logo-assets-2026-10-10','team-premium-assets-2026-10-10','team-slide6-assets-2026-10-10']:
 for p in sorted((root/'resources'/dirname).rglob('*')):
  if p.is_file(): add(p,p.relative_to(root).as_posix())
for dirname in ['technical-friend-review-2026-10-09','personal-agent-middleware-2026-10-06','connector-distribution-2026-10-06','industry-opportunities-2026-10-06']:
 for p in sorted((root/'exa-results'/dirname).rglob('*')):
  if p.is_file() and p.suffix in ['.md','.txt','.csv','.json']:
   add(p,p.relative_to(root).as_posix())
manifest={'created':'2026-10-10','purpose':'GoLocal editable deck and comprehensive business-context handoff','files':[]}
for rel,p in entries.items():
 b=p.read_bytes()
 manifest['files'].append({'path':rel,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
manifest_path=out/'golocal-handoff-manifest.json'
manifest_path.write_text(json.dumps(manifest,indent=2)+'\n')
bundle=out/'golocal-editable-deck-and-context.zip'
with ZipFile(bundle,'w',ZIP_DEFLATED) as z:
 for rel,p in entries.items(): z.write(p,rel)
 z.write(manifest_path,'manifest.json')
print(json.dumps({'context':str(brief),'words':len(text.split()),'bundle':str(bundle),'files':len(entries)+1,'bundle_bytes':bundle.stat().st_size},indent=2))
