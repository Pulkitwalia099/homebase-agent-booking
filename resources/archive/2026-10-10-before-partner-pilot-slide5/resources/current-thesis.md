# GoLocal opportunity distribution and working analysis

Local thesis updated: 2026-10-06. The [short business thesis](business-thesis.md) is the discussion version for friends and advisors. The [working Page](https://chatgpt.com/space/page_af46a0758c0481918b30bebe2a884596) is a separate copy and has not been updated by this revision.

## October 6 user edited discussion thesis

The latest [short thesis](business-thesis.md) follows the user's edited Word file and preserves their sourced facts and wording. It adds the $2T local-services market and $600B home-services framing, the progression from Yellow Pages through Craigslist to Google and Maps, and the emergence of 15+ personal-agent startups raising billions. It presents multiple agents serving different audiences as the expected market structure.

The updated discussion focuses on whether AI companies will build the local supplier network themselves, and whether a direct personal-agent integration or distribution of the MCP can establish enough demand in a confined area. It also asks whether freight forwarders, brokers or other business agents have a useful B2B booking workflow. These additions are preserved in full in the short thesis; the earlier detailed analysis below remains supporting context.

## Market-size check — October 10 2026

The [dated market-sizing note](local-services-tam-2026-10-10.md) supports a conservative **$1T+ in annual U.S. spending across selected local-service categories**: roughly $600B home improvement and repair, $283.8B motor vehicle maintenance and repair, $239.6B personal care and clothing services, and $65.5B child day care. Their indicative sum is about $1.2T, using different data years and sources. The home figure includes materials and DIY work. This is market context, not GoLocal's transactionable booking volume or fee revenue. The blanket $2T local-services claim in the user-edited short thesis has no comparable scoped calculation; retain that historical draft as supplied, but use the sourced, qualified line in future revisions.

## Current direction

The [business thesis](business-thesis.md) establishes the market premise: personal agents are expanding the ways people initiate service requests, while execution can still require searching websites, submitting forms and making calls. Uber, DoorDash and Booking.com illustrate how organized supply and a transaction layer help turn intent into a purchase. GoLocal would provide a shared booking layer for participating local-service businesses, usable by multiple agents.

**Build a supplier network for a specific task that people want their personal agents to complete, then make that network accessible through an MCP connector or API.** The central commercial question is how requests reach GoLocal. Supplier onboarding and a working connector establish capability; distribution must turn that capability into demand.

Start with an audience, a task, a location and a channel to customers. Develop the supplier side around those requests. Wajo is a possible agent partner, and Boston cleaning is one possible use case. Neither defines the business or has been selected through measured demand.

## Distribution choices and the evidence needed

| Route | What GoLocal would do | Evidence that would support the route | Main weakness |
| --- | --- | --- | --- |
| Personal-agent partnership | Offer useful supply and booking execution; agree how the partner routes relevant requests and what each side earns. | Recent eligible requests, an accountable partner owner, actual routing and paid continuation. | Dependence on the partner; it can integrate suppliers directly or favor another provider. |
| Platform directory or MCP marketplace | Publish a clear listing for a specific service and coverage area; support the platform's connection flow. | Relevant discovery traffic, completed connections, requests and fulfilled jobs attributable to the listing. | Being listed may produce little demand; installs alone do not establish usage. |
| Direct niche distribution | Reach a community around a concrete need and guide users into their preferred agent with a setup link or prompt. | A reachable audience, successful setup on its actual agents, real requests and acceptable acquisition cost. | GoLocal must acquire users itself; installation friction and low repeat usage can undermine economics. |

A platform integration can feel native without making GoLocal a first-party product. Clarify whether a proposed partnership offers ordinary availability, promotion, automatic selection for eligible tasks, or an actual volume commitment. These have different distribution value.

**Track the whole path:** relevant audience reached → connection completed → eligible request → GoLocal selected → suitable offer → confirmed booking → fulfilled and paid job → another request when the need returns. For a built-in partnership, track enablement and routing instead of assuming each user installs something. Count drop-offs and requests outside our coverage. Compare cost per acquired, paying customer with contribution, rather than reporting installs as customer acquisition.

## Discovery connection and selection

The [official MCP Registry](https://registry.modelcontextprotocol.io/) provides server discovery. [Smithery](https://smithery.ai/) offers publishing and connection tooling. [Claude supports directory submissions](https://claude.com/blog/build-plugins-for-claude), subject to review. These are possible distribution surfaces, not evidence of GoLocal demand.

[Claude's connector documentation](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities) describes connection and authentication and says connected apps can be used when relevant. [Smithery's connection documentation](https://smithery.ai/docs/use/connect) also includes authorization flows. The proposed one-line prompt is an entry into onboarding; test the actual permissions, sign-in steps and supported actions for each target agent. Do not assume a public registry listing automatically installs the connector into consumer agents.

Once connected, GoLocal still needs the agent to choose it for an appropriate request. Make service scope, location coverage and supported actions explicit, and test ordinary user requests without naming GoLocal. Distinguish success when the user explicitly invokes GoLocal from success when the agent selects it unaided.

## Questions for friends advisors and potential partners

| Question | How to answer it |
| --- | --- |
| Which audience can we actually reach? | Name a community or partner and its existing access to users; inspect recent examples of the task and the agents those people use. |
| What makes the task painful enough to delegate? | Walk through a recent attempt and its alternatives. Look for coordination, uncertainty or unavailable capacity, rather than assuming every booking needs an agent. |
| Why would an agent company buy this? | Compare our coverage, completion and operating cost with browsing, calls, existing marketplaces and direct integrations. Ask which work it wants to own. |
| Can supply satisfy the requests we can attract? | Match actual request locations, scope and timing to willing providers with capacity and authority to accept bookings. |
| What would people pay for? | Test supplier-funded acquisition separately from user- or agent-funded coordination. Follow jobs to payment and reconcile all delivery costs. |
| What could compound into an advantage? | Look for repeatable onboarding, dense useful supply, reliable fulfillment and distribution relationships. Determine what another connector or supplier platform could readily copy. |
| How large could the business become? | Estimate reachable users × eligible requests per user × fulfilled share × GoLocal net revenue per job. Subtract acquisition and operating costs. Do not use total home-services spending as the fee opportunity. |

A household asking to change its existing cleaner's appointment is a different commercial case from acquiring a new customer for another cleaner. Repeat service visits do not necessarily create repeat GoLocal revenue. For direct distribution, GoLocal also bears user-acquisition costs that are absent from a simple partner revenue-share illustration.

**Recommendation:** pursue the narrow distribution hypothesis; defer broad integration work until there is a credible route to real requests. A small test should connect one audience and channel to sufficient participating supply, then establish whether requests turn into fulfilled jobs at economics people will continue paying for. A functioning connector without that path is insufficient evidence for a network business.

## Earlier cleaning scenario retained for implementation detail

The following October 5 analysis is retained as a conditional example of the partner route. Its Wajo pitch, illustrative fees, Boston software observations and pilot are not the chosen distribution strategy. Current vendor capabilities and permissions must be rechecked before implementation. The [original snapshot](archive/2026-10-06-before-distribution-reframe/current-thesis.md) preserves its original framing.

**Test whether Wajo wants a supplier network you operate, with an API as the interface.** A connector alone gives Wajo little reason to share valuable customer-acquisition revenue. The proposition becomes stronger if you recruit willing cleaners, expose usable offers, complete bookings and handle exceptions more effectively than Wajo can do directly. That is the central question for the pilot.

## Why Wajo would work with you

**Yes, Wajo could work directly with software vendors or cleaners.** It already advertises calls, bookings and human assistance. Your pitch must improve that existing process. [Wajo](https://wajo.ai/).

Proposed offer: “You keep the consumer relationship. We recruit participating cleaners, agree what can be booked, connect their systems and handle booking problems. You get usable supply through one interface and earn a share of the cleaner’s acquisition fee.”

An integration with Jobber or Housecall Pro does not automatically authorize access to every customer account or make every cleaner willing to accept the job. That merchant-by-merchant work is a possible reason to use you. If a vendor already supplies Wajo equivalent participating merchants, terms and support, your advantage is much weaker.

**Revenue sharing creates an incentive, not protection from being bypassed.** Wajo should buy when your supplier coverage and avoided operating costs justify your share. As volume grows, building directly may become more attractive. Ask what it would outsource, what it considers core, and what would make it switch to direct integrations.

## How the money could work

**For this pilot, test one cleaner-funded success fee, shared with Wajo.** Wajo brings the customer; you provide the participating supply and booking execution. The customer pays the cleaner the agreed service price, with no extra consumer fee in this pilot. Your company collects the acquisition fee separately and pays Wajo its agreed share.

The following is illustrative arithmetic, not a pricing recommendation or evidence of Boston acquisition costs. Both cases assume a comparable completed, paid, new-to-provider customer:

| Per acquired customer | Higher cost example | Lower cost example |
| --- | ---: | ---: |
| Cleaner’s assumed comparable acquisition cost elsewhere | $100 | $40 |
| Proposed total success fee paid by cleaner | $60 | $30 |
| Wajo share at an illustrative 60% | $36 | $18 |
| Your gross share at 40% | $24 | $12 |
| Fee difference versus the assumed alternative | $40 | $10 |

The last row is a comparison, not cash paid to the cleaner or guaranteed profit. The cleaner still needs profitable jobs after labor, supplies, travel and acquisition. Your $24 or $12 must cover delivery, support and recovery, with enough left to recover supplier onboarding and software maintenance. Wajo’s share is also gross, before its remaining operating costs.

**Wajo could potentially keep the full $60 by doing everything directly. You must earn the $24 it gives up.** Sharing revenue without supplying useful capacity or removing meaningful work will not solve that objection.

A $100 acquisition cost is not a $100 pot waiting to be divided. Also distinguish cost per lead from cost per acquired customer: an assumed $20 lead converting at 20% costs $100 per acquisition before sales effort. Angi’s official description explicitly separates receiving a paid lead from winning the job. [Angi lead model](https://intercom.help/angi/en/articles/6221483-opportunities-and-leads-frequently-asked-questions).

**Where $2 fits:** if you only process bookings for suppliers Wajo already manages, a usage fee paid by Wajo could be appropriate—but $2 is unvalidated. That is a different offer from acquiring customers. Do not assume both fees. For the acquisition pilot, charge once after the first paid completed clean; define duplicates, existing customers, refunds and attribution in advance. Repeat bookings need their own value and pricing case.

Software vendors and payment providers receive their contracted charges; they do not automatically receive a share of the acquisition fee. Wajo must also find the referral model compatible with its consumer promise. Keep commissions transparent and let customer suitability govern recommendations.

## Key questions and how to answer them

| Ask | Key question | Evidence to request |
| --- | --- | --- |
| Wajo product and operations owner | Are there enough relevant requests in one area? | Recent cleaning requests, locations, outcomes and a defined observation period; separate new-provider searches from existing-cleaner changes |
| Wajo operating team | What would you buy instead of build? | Walk through recent tasks, current tools, manual work and failures; discuss direct vendor integration and the proposed revenue split |
| Cleaning owner | Do you want these customers at this fee? | Recent acquisition spending and completed customers, first-clean contribution, repeat behavior and specific unfilled capacity |
| Cleaning scheduler | What can we promise without a phone call? | Demonstrate scope rules, actual pricing, crew availability and the point at which a booking becomes accepted |
| Cleaner and software developer team | Can an outside agent execute this safely and reliably? | Approved access, supported operations, account permissions and a test of price, booking, status, change and cancellation |
| All three parties | Will you actually participate? | Wajo supplies genuine requests; cleaners authorize offers and a success fee; everyone agrees who resolves problems |

**Talk to cleaners and Wajo in parallel. Bring the relevant software vendor into the discussion as soon as an interested cleaner’s system is identified.** A vendor conversation cannot establish whether cleaners want customers or what they will pay. A cleaner’s enthusiasm cannot establish that the required API access exists.

With the cleaner, also resolve the practical constraints: service ZIP codes; home size and condition; deep-clean exclusions; parking, pets and access; travel and crew capacity; deposits; price changes on arrival; cancellation fees; and responsibility for complaints or re-cleans. Ask who controls the software account, especially in a franchise.

## Boston software and integration routes

These are verified public interfaces, not a census of Boston software usage or proof of API access:

| Cleaner | Public evidence |
| --- | --- |
| MaidThis Boston | Its Boston page links to a Launch27 customer portal. [Source](https://maidthis.com/boston/house-cleaning-services/) |
| Maid Sailors | Its shared booking page embeds Launch27; Boston-specific capacity still needs verification. [Booking page](https://maidsailors.com/book-now/), [Boston service](https://maidsailors.com/boston/) |
| Unmess | Its Greater Boston site links booking and customer access to BookingKoala. [Source](https://getunmess.com/) |

**Start vendor diligence with the systems used by willing cleaners.** These examples justify investigating Launch27 and BookingKoala; they do not establish that Jobber or Housecall Pro dominate Boston cleaning.

| System | How integration could work | Main unresolved constraint |
| --- | --- | --- |
| Launch27 | Officially advertises an API; connect to the participating cleaner’s account. [Features and API link](https://www.launch27.com/software-features/) | Confirm current credentials, plan, permission and price/availability/create/change/cancel operations. Full API lifecycle was not verified here |
| BookingKoala | Merchant-generated integration keys support documented Zapier/Make workflows. [Integration guide](https://help.bookingkoala.com/help/zapier-integration) | Booking event notifications do not prove an API can create a booking. Ask for the supported availability and booking-write route |
| Jobber | Cleaner’s admin authorizes an OAuth application; GraphQL exposes account operations. [Developer guide](https://developer.getjobber.com/docs/getting_started/) | Verify the exact scheduling operations and coordinate with Jobber before customer testing. Its guide explicitly requires this. [Testing guide](https://developer.getjobber.com/docs/building_your_app/testing_your_app/) |
| Housecall Pro | Eligible cleaner accounts can generate API keys; service-aware booking windows are documented. [API access](https://help.housecallpro.com/en/articles/8505035-api-overview), [booking windows](https://docs.housecallpro.com/docs/housecall-public-api/c80920efe7ef1-booking-windows) | Confirm plan entitlement and commercial use. Available windows plus job creation do not alone prove an accepted booking with conflict protection |
| MaidCentral | Dedicated API user; documented cleaning-specific price → quote → availability → booking flow. [Workflow](https://support.maidcentral.com/apidocs/online-booking-to-api-workflow) | Relevant if a participating cleaner uses it. Confirm external-agent use, access costs, status and cancellation support. [API terms](https://maidcentral.com/api-terms-of-service/) |

The vendor question is concrete: “For opted-in cleaners, can our application obtain a valid price and available slot, create an accepted booking, verify its state, and change or cancel it? Which plans, permissions and commercial approvals apply?”

The working flow is **Wajo → your API → cleaner’s existing software → verified result back to Wajo**. Keep the cleaner’s software authoritative. Return “pending” when approval remains outstanding; never turn a created record into an unsupported promise that a crew will arrive. You do not need to give every cleaner a new personal agent to test this.

## The pilot to run

**One agent partner, one bounded Boston-area service, and one or two willing cleaners.** Start with first standard residential cleans for new customers, using supplier-approved scope, pricing and capacity. Move the location if the partner’s actual demand is elsewhere.

1. Agree the service, eligible customers, total acquisition fee, Wajo share and responsibilities before building.

2. Connect one supported cleaner system. Test booking, cancellation, price changes and uncertain responses without creating unintended purchases.

3. Route genuine customer-authorized requests. Examine roughly ten resolved cases as an initial learning batch, including failures and unavailable offers; this is not proof of market size.

4. Follow bookings through fulfillment and payment. Compare outcomes and manual work with Wajo’s existing process; include work performed by you and the cleaner.

5. Settle actual fees and ask both Wajo and cleaners to continue at the agreed economics.

**Continue only if requests recur, cleaners honor the offers, customers receive suitable service, and both your company and Wajo have a reason to keep participating.** The decisive Wajo question is: “Having seen what we handle, would you continue giving us this share rather than do it directly?”

If the answer is no, a working integration has not validated this business. Keep operator capacity recovery and specific property-maintenance coordination problems as adjacent hypotheses. A venture-scale case would require repeatable supplier onboarding and additional demand partners; this pilot establishes whether the first commercial relationship works.

## Founder and partner evidence reported October 10 2026

The founder supplied these updates while preparing a six-slide application for An Evening with the Sharks. They supersede the earlier absence of recorded partner commitments; they do not establish live integrations or completed transactions.

- **Cactus AI:** agreed to partner in Salt Lake City and Dallas, where it serves 100+ mid-market trade shops. The founder clarified that Cactus will introduce shops and provide booking access through existing customers. This is a supplier-access and integration route; personal-agent request routing has not been reported. Do not label all Cactus customers as onboarded GoLocal businesses.
- **Back-office management company:** agreed to onboard its 20 clients, according to the founder. Its name, completed onboarding and commercial terms have not yet been supplied. Keep this figure separate from Cactus's customer base; unique nonoverlapping supply has not been established.
- **Discovery:** the founder reports a few positive customer interviews and partnership calls. Specific interview counts, findings, paid demand and completed bookings were not supplied.
- **Pulkit Walia:** identifies Urban Company as the platform he helped build over the last decade in Asia. He describes himself as a founding team member who helped scale it from zero to a $3 billion IPO, and GoLocal as reimagining the business for the AI era. His public [IPO reflection](https://www.linkedin.com/posts/pulkitwalia_urban-company-is-now-public-when-i-first-activity-7374240855139868672-U711) supports the decade-long connection. Supplied [LinkedIn profile](https://www.linkedin.com/in/pulkitwalia/); direct profile retrieval was unavailable.
- **Rohit Jain:** the founder describes backend engineering, MCP-based products, production MCP integrations and system design interview teaching. His supplied [LinkedIn profile](https://www.linkedin.com/in/rohit-jain-343437187/) is linked from [Laoh's team section](https://laoh.ai/), which lists Amazon, Square and Citrix experience. The [Udemy instructor profile](https://www.udemy.com/user/a6a5d0a8-fdb1-40b1-84d5-1fe3a0861886/) retrieved October 10 reports 24,599 total learners. That is not a count of system design students alone. Exact GoLocal role, equity and time commitment remain unspecified; do not label him cofounder or CTO without confirmation.

The current forwarded 2026 organiser emails specify a current Harvard student founder and a startup beyond ideation. The founder has checked the deadline. Sources: [HBS Entrepreneurship Club email](https://mail.google.com/mail/u/?authuser=pulkitwalia099%40gmail.com#all/1a123c475a96c71a), [Rock Center email](https://mail.google.com/mail/u/?authuser=pulkitwalia099%40gmail.com#all/1a10df28300df0a3). The six-slide maximum and evaluation criteria were supplied by the founder; the application form could not be retrieved through web tools. Older public 2025 pages do not determine this round's eligibility.

Recommendation: apply with the local-service booking thesis, supplier-access commitments and relevant team credentials. Customer-request distribution remains the principal commercial question. New dated local supporting context only; short thesis, Word/PDF and online Page unchanged. No external message or application was sent.

## Six-slide Sharks application deck — October 10 2026

Created an editable PowerPoint and a six-page PDF using the current thesis and the founder's partnership/team updates. The narrative is: fragmented local bookings in an expanding personal-agent market; GoLocal's participating supply and shared MCP booking interface; specific supplier-access commitments; proposed success-fee economics and request distribution; team experience. The original thesis, its Word/PDF and the working Page remain unchanged.

The application form was subsequently inspected through the browser. It requires a current Harvard student founder, a startup beyond ideation, basic company details and a deck of six slides maximum including the title. It states that submissions cannot be edited. The form contains no separate long-form business questions. Preparation is not submission.

The deck preserves the founder-sourced $2T local-services and $600B home-services figures and the 15+ new-agent-startup claim. Its speaker notes retain provenance and qualification. The market amounts are service-market figures, not GoLocal revenue projections. Rohit's title is Engineering; cofounder/CTO status has not been inferred. Cactus's 100+ customer base and the separate 20-client onboarding commitment are displayed separately and are not presented as live GoLocal merchants.

Recommendation: pursue the application and the next commercial validation steps. Supplier access plus founder experience justify the early pitch. A connector alone is a useful feature; manual fulfillment can become a service business. A venture-scale case requires repeatable demand routing, reliable transactions and viable economics across multiple suppliers, cities and agents. Those conditions remain unproven.

Application preparation status: the Harvard email and GoLocal company name were entered, the six-page PDF was attached, and the form displayed Draft saved with the attachment. Existing name, school and No outside capital selection were retained. Optional website and funding-summary fields remain blank. No Submit action was performed; founder review is pending.

## Funding-led pitch wireframe — October 10 2026

The founder asked to establish the capital flowing into personal agents before explaining local-booking fragmentation. The [new content wireframe](golocal-pitch-wireframe-2026-10-10.txt) proposes the positioning “Stripe for home-service bookings,” clarified as booking infrastructure connecting agents to participating suppliers and their existing software. The [funding ledger](agent-funding-evidence-2026-10-10.json) records a selected-company total exceeding $2.105B: Hark over $700M Series A, Instinct $1B Series C plus $350M previously reported cumulative funding, and Town $55M Series A. Wajo funding is excluded as unverified. “INKS” is provisionally identified as Hark from the amount; “Bajoy” remains an unconfirmed name, potentially Wajo.

Meta Muse is launched and Google/Anthropic already have agent capabilities. The expected diversification of local-service requests is a thesis, not a measured Google share shift. Existing marketplaces, software booking APIs and Updater’s agent-commerce platform mean the pitch should describe fragmented interoperability and supplier access rather than claim no middleware exists anywhere. FSM means field service management software; supplier authorization and bookable actions remain distinct from a general CRM connection.

Only research and a proposed wireframe were added. The existing deck, its application attachment, user-edited short thesis/Word/PDF and online Page were not revised. Application submission remains pending.


## Visual pitch structure revision — October 10 2026

The founder requested an editable six-slide structure before visual styling. The new [PPTX](../output/pptx/golocal-pitch-structure.pptx) and [PDF](../output/pdf/golocal-pitch-structure.pdf) show a seven-task local-service journey and the many-agent / GoLocal / business-software / participating-provider connection. The planned product includes authorized coverage, pricing/quote data, schedules and permitted transaction history, with quote, booking, payment and management actions. Existing business systems remain authoritative. Some local platforms already transact; the claim concerns fragmentation across agents and suppliers.

The proposed under-five-second lookup versus roughly fifteen minutes of sequential calls is a founder illustration and target, not a measured benchmark or full-booking time. Complex scopes may still require merchant responses. Payment tools are proposed and must use platform-compatible checkout.

The funding slide uses a verified selected-company $2B+ minimum. No allocation of Meta/OpenAI general financing to Muse/Dots establishes $3B+ in the cited evidence. New connector documentation supports developer access and conditional broader discovery for useful approved tools; it does not establish automatic recommendations from transaction count or first arrival. See the [new dated evidence](connector-and-process-evidence-2026-10-10.json).

The commercial proposal remains supplier-paid new-customer success fees, with an unagreed demand-partner share. Direct agent routing and user-added connectors remain distribution hypotheses. Cactus is supply access, not a secured agent-demand partner. Prior source bodies, main thesis, Word/PDF and working Page are unchanged. The application attachment was not replaced and no submission occurred.
