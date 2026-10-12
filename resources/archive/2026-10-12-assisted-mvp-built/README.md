# GoLocal

Current project context · 2026-10-10

Personal agents are expanding the ways people find and buy services, but local bookings can still require searching websites, filling forms and making calls. GoLocal would organize participating providers into a shared booking layer that different agents can use, starting with one audience and service.

## Start here

## Connector pilot

- **Assisted multi-supplier MVP built locally:** verified customer and supplier accounts, reviewed listings, customer requests and supplier accept/decline. [Setup and onboarding](connectors/golocal/docs/assisted-mvp.md) · [Verification](output/golocal-assisted-mvp-verification.json) · [Source bundle](output/golocal-assisted-mvp-source.zip). All 53 connector tests pass; two-supplier browser flow verified. Public hosting, sign-in email and actual agent linking remain to be configured and verified. CRM synchronization, booking alerts and payments are not implemented.

- [Agent-channel onboarding plan](output/golocal-agent-onboarding-plan.html): customers stay in Muse, Dots or another supported agent; custom versus directory versus routing-partner activation, supplier access, non-MAX acceptance and honest booking responses. [Sources and evidence boundaries](resources/golocal-agent-onboarding-plan-2026-10-11.json).

- [Connector build and test guide](connectors/golocal/README.md) · [Dots setup](connectors/golocal/docs/dots-setup.md) · [Muse prompt](connectors/golocal/docs/muse-setup.md): one GoLocal service with private demo and Housecall test grants; 42 tests pass. Actual Dot completed both the simulated lifecycle and a real Housecall trial $0 synthetic job, same-key retry, status and schedule removal. Final vendor state independently verified as needs scheduling, notifications off and $0. [Housecall test results](output/dots-housecall-e2e-results.json). Real service fulfillment and payments remain unsupported; Muse also passed the real trial synthetic lifecycle through the published GoLocal REST relay, including same-key retry and schedule removal. [Muse results](output/muse-golocal-e2e-results.json). Seven relay security tests and website build pass. All three test-job operations are used; Muse access expires October 12, 1:48 a.m. Eastern. The relay still depends on the local backend/tunnel. Durable hosting source is published and locally verified; the approved ~$7.25/month Render setup is waiting for private billing entry.

## GoLocal website

- **Business software section:** [For businesses](https://getgolocal.com/businesses) now shows 12 official platform logos under “Works with your existing tech stack”; the hero text also covers less of the house. [Published preview](output/golocal-business-stack-live.jpg) · [Verification](output/golocal-business-stack-verification.json).

- **Animated hero live:** [Homepage](https://getgolocal.com) · [Compare both versions](https://getgolocal.com/hero-preview). Two Kling 3.0 animations, including the personal-agent message sequence; 96 of 350 authorized credits used. [Live preview](output/golocal-animated-hero-live.jpg) · [Verification](output/golocal-hero-verification.json).

- **Live site:** [getgolocal.com](https://getgolocal.com) · [Interactive booking demo](https://getgolocal.com/demo). Public HTTPS verified October 11, 2026 at 04:36 UTC; www redirects to the main domain.
- [Website source bundle](output/golocal-website-source.zip): Next.js source, brand assets and connector research. Credentials, Git data, dependencies and build outputs are excluded. The working source is in [website/apps/web](website/apps/web).
- **Registration alerts:** business, agent and channel-partner forms email your personal Gmail, automatically starred and marked Important. All three paths verified October 11. [Delivery proof](output/golocal-email-alerts-verified.jpg) · [Verification evidence](output/golocal-email-verification.json).
- [Launch report](output/golocal-launch-report.md) · [Homepage preview](output/golocal-website-preview.jpg) · [Conversation demo preview](output/golocal-live-demo-preview.jpg).


- [Latest V37 pitch deck](output/pptx/golocal-pitch-v37.pptx): first pilot lined up in Salt Lake City, 60+ plumbing companies already in pipeline, and 30-day MCP launch target with aligned launch steps.

- [Previous V36 pitch deck](output/pptx/golocal-pitch-v36.pptx): founder-confirmed 60+ Salt Lake City plumbing-company pipeline through Cactus AI and YourCardare, plus updated consumer-app-to-agent-layer team headline.

- [Previous V35 pitch deck](output/pptx/golocal-pitch-v35.pptx): based on the founder-uploaded final V34; only the opportunity-table wording changed to connect missing live pricing/availability data with incomplete scheduling, booking and payment.

- [Previous V33 pitch deck](output/pptx/golocal-pitch-v33.pptx): cover illustration adds a lawn-mowing worker and a roofer. All content slides unchanged from V32. The V32 six-slide competition version below remains current because it has no cover.

- [Previous V32 pitch deck](output/pptx/golocal-pitch-v32.pptx): revenue model specifies a 10% fee paid by businesses on the booking amount, shared between GoLocal and software or channel partners. Partner allocation remains unspecified.
- [V32 six-slide competition version](output/pptx/golocal-pitch-v32-competition.pptx): same explicit fee model.

- [Previous V31 pitch deck](output/pptx/golocal-pitch-v31.pptx): slide 4 now compares the listings/calls process with GoLocal live comparison across many providers, followed by the illustrative booking journey. Scale and latency remain product targets.
- [V31 six-slide competition version](output/pptx/golocal-pitch-v31-competition.pptx): same comparison and journey on slide 3.

- [Previous V30 pitch deck](output/pptx/golocal-pitch-v30.pptx): opportunity reframed around the missing shared live data layer. Agents scope the job with the customer, then need live local-business data and connected booking/payment actions.
- [V30 six-slide competition version](output/pptx/golocal-pitch-v30-competition.pptx): same revised opportunity slide in the competition format.

- [Previous V29 pitch deck](output/pptx/golocal-pitch-v29.pptx): restored years, technologies, named platforms and full capability progression through Personal agents today. Two red transaction rows and explicit $1.2T value-capture opportunity.
- [V29 six-slide competition version](output/pptx/golocal-pitch-v29-competition.pptx): same revised opportunity slide in the six-slide format.

- [Previous V28 pitch deck](output/pptx/golocal-pitch-v28.pptx): restored illustrated cover and reference styling, simplified opportunity matrix ending in Get quote & schedule / Book & pay, and a direct transaction-value close without marketplace comparisons. Current business facts retained.
- [V28 six-slide competition version](output/pptx/golocal-pitch-v28-competition.pptx): branded opportunity opening plus the five remaining content slides.

- [Previous V27 pitch deck](output/pptx/golocal-pitch-v27-polished.pptx): seven slides, revised directly from the founder-uploaded final V26. Clearer editable market table, explicit booking/recommendation/supply loop, staged category/city expansion, consistent Salt Lake City example and tighter partner/team messaging.
- [Previous six-slide competition version](output/pptx/golocal-pitch-v27-competition.pptx): GoLocal branding and tagline integrated into the opportunity opening, retaining all six content slides. Fits the six-slide limit recorded in the supplied competition brief.

- [Full context for another model](output/context/golocal-full-context-2026-10-10.txt) · [Editable deck and context bundle](output/context/golocal-editable-deck-and-context.zip): standalone business/pitch handoff with the discussion, latest corrections, strategic questions, exact slide text/notes and supporting research. Includes both cover and six-slide versions; no deck content changed.
- [Earlier application PDF](output/pdf/golocal-application-final.pdf): six approved slides reviewed for flow and visual consistency, facts/content unchanged.
- [Previous V26 deck with cover](output/pptx/golocal-pitch-v26.pptx) · [PDF with cover](output/pdf/golocal-pitch-with-cover.pdf): GoLocal title/tagline followed by the six approved slides. Seven pages; exceeds the application six-page limit. The six-page application PDF above remains unchanged.
- [Previous editable deck](output/pptx/golocal-pitch-v25.pptx) · [Agent ecosystem preview](output/pptx/previews/golocal-slide2-agent-logos.png): slide 2 incorporates original supplied agent logos with aligned sizing and spacing, adds OpenClaw/Hermes examples and mentions Claude/Gemini. Approved slides 1 and 3–6 retained.
- [Previous deck](output/pptx/golocal-pitch-v14.pptx) · [Previous PDF](output/pdf/golocal-pitch-v14.pdf): $1.2 trillion+ U.S. local-services opening (founder-requested headline), a cumulative staircase of platform unlocks and three remaining transaction bottlenecks. Slide 2 uses plumbing to show several equally weighted software examples per provider size and 100+ listed plumbing software options across all segments. Other categories have different software mixes. Slide 3 illustrates a customer request progressing through scoping, live options and approval to a confirmed plumbing visit.
- [Deck with refined first slide](output/pptx/golocal-pitch-slide1-refined.pptx) · [PDF](output/pdf/golocal-pitch-slide1-refined.pdf): dated technology eras and a simplified green/red process matrix. Slides 2–6 retain the previous structure.
- [Editable six-slide visual structure](output/pptx/golocal-pitch-structure.pptx) · [Review PDF](output/pdf/golocal-pitch-structure.pdf): seven-step process progression, structured supplier data and booking architecture, funding, distribution, partner access and team. Plain layouts and named logo positions for review; earlier deck retained.
- [Revised pitch content wireframe](resources/golocal-pitch-wireframe-2026-10-10.txt) · [Personal-agent funding evidence](resources/agent-funding-evidence-2026-10-10.json): current content and diagram plan, applied to the separate visual structure deck.
- [Six-slide Sharks pitch deck](output/pptx/golocal-sharks-pitch.pptx) · [Application PDF](output/pdf/golocal-sharks-pitch.pdf): opportunity, solution, partner commitments, proposed revenue/distribution and team. Created October 10; the user-edited thesis remains unchanged.
- [Technical discussion note for a middleware builder](resources/golocal-technical-discussion.md) · [October 9 evidence and recommendation](exa-results/technical-friend-review-2026-10-09/research.md): existing providers, B2B workflows and questions about what GoLocal should own. The user-edited thesis is unchanged.
- [Where to build personal-agent middleware](exa-results/industry-opportunities-2026-10-06/research.md): plain-language problems, industry value chains, buyers, existing products and a narrower order for customer discovery.
- [October 6 personal-agent middleware assessment and proposed direction](exa-results/personal-agent-middleware-2026-10-06/research.md) · [Monitoring plan](exa-results/personal-agent-middleware-2026-10-06/monitoring-plan.md): PACT, Personal Agent Protocol, opportunities beyond local services and evidence to track. Research proposal; the user-edited thesis below is unchanged.
- [Short business thesis for friends and advisors](resources/business-thesis.md)
- [Distribution questions, commercial analysis and integration detail](resources/current-thesis.md)
- [Research index and evidence limits](resources/research-index.md)
- [Draft archive](resources/archive/README.md)
- [Working Page](https://chatgpt.com/space/page_af46a0758c0481918b30bebe2a884596)

## Current working position

**Distribution is the central question:** how does GoLocal become the route an agent actually uses? Explore a personal-agent partnership, directory discovery and direct marketing to a niche audience. A listing, an installed connector and a fulfilled booking are different milestones.

The product combines participating supply with reliable booking execution. MCP is the connection to compatible agents. One-line setup is an intended experience to verify on each platform.

Boston cleaning and Wajo remain examples. Supplier-funded acquisition and user- or agent-funded coordination are separate commercial hypotheses; pricing and revenue shares remain unagreed.

## Next decisions

1. Choose a reachable audience, a painful task and a plausible channel to customers.
2. Establish how those users' agents discover, connect and select GoLocal.
3. Recruit enough suitable suppliers to serve those requests and verify permitted booking operations.
4. Establish who pays and whether fulfilled jobs leave a contribution after acquisition and delivery costs.

Demand, willingness to pay, production access, profitable delivery and venture scale remain unproven. Keep operator capacity recovery and specific property-maintenance coordination problems as adjacent hypotheses.

The October 6 revision updates the local thesis; the working Page is a separate copy. The research index links preserved earlier versions and original evidence. The latest October 10 founder correction describes Cactus AI introductions to 50+ service partners and another 10+ providers in the pipeline through the regional back-office partner YourCardare. These are pipeline introductions, not committed onboarding. Historical figures remain preserved in dated analysis and drafts. Live integrations, personal-agent request routing and completed bookings remain to be established.

The [earlier ecosystem visual draft](prototypes/homebase-ecosystem-draft.html) is preserved for reference; the short business thesis is the current narrative for future visuals.

Business renamed GoLocal on October 6 2026. The editable [Word thesis](output/docx/golocal-business-thesis.docx) uses the new name. Earlier Homebase drafts remain in the archive; the working Page is unchanged.

The October 6 user-edited Word draft is now the source for the local business thesis and [final PDF](output/pdf/golocal-business-thesis.pdf), with the user’s sourced facts and wording preserved. The working Page is unchanged.
