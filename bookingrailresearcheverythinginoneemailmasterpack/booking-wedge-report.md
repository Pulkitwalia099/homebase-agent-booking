# Booking Middleware Wedge — Research Pack

**Prepared:** 2026-10-04 · **For:** Pulkit · **Question:** where should an MCP-style booking rail (agents booking
directly via providers' field-service/booking software instead of phone calls) wedge in first?

This pack has two parts:
- **Part 1** — Prompt 1 answered from my own task history (I act as one of the "agent teams").
- **Part 2** — Independent market research across the five candidate categories, standing in for the other agent
  teams' tables so you can check convergence.

Full Prompt 1 response (with the complete table) is the companion file `prompt1-agent-response.md`.

---

## 1. Context — what the two prompts are for

You designed two copy-paste prompts to send to 2–3 agent teams before building booking middleware:

- **Prompt 1 (data extraction):** each agent mines its own task history (last 90 days) for every booking/scheduling
  category — request counts, share completed with no phone call, share needing a phone call, share abandoned,
  one-off vs recurring — then scores each category 1–5 on scope standardization, price transparency, frequency,
  ticket size, supply software, and failure modes; lists the "missing-rail" categories; and states its platform
  constraints. Output: one table + ranked top-10 painful missing rails + the single category it wants a booking
  API for first.
- **Prompt 2 (live validation):** each agent runs 3 real booking attempts in each of its top-5 categories in one
  metro, stopping at the last reversible step when money/commitment is involved, logging wall-clock time, channels,
  choke points in order, and final state — because "a failed attempt with a timestamp is harder to dress up than a
  self-reported score."

**How to read the results** (your guidance, preserved verbatim in intent): the single most valuable output is
**convergence** — categories ranking top-3 across independent agents' logs are wedge candidates; disagreement is
noise or vantage-specific. Weight scores roughly: frequency 30%, scope standardization 25%, no-conversation
pricing 20%, supply integrability 15%, ticket-size trust 10% — and a category must clear standardization and
pricing or it fails regardless of demand. From live runs, rank choke points by frequency × whether an API removes
them: voicemail and phone menus are exactly what the product deletes (best story); login walls and payment
handoffs are inherited, not solved (discount them). Warning: an agent told to "report friction" will polish its
failures — the live-run prompt is the corrective.

**Status note:** Prompt 2 (live runs) is not executed in this pack — 15 real attempts across metros needs your call
on metro and categories. Say the word and I'll run a batch (e.g., Cambridge plumbers, where I already have
standing context).

---

## 2. Methodology — how Part 2 was researched

- **Researcher:** an isolated deep-research agent run on 2026-10-04, working from the web search index
  (signed-out; no live-browser transactional verification — no prices were quoted as bookable, so none was needed).
- **Source priority:** company filings and press releases first (e.g., ServiceTitan S-1, Jobber/Housecall Pro/Fresha
  PRs with customer counts), official developer documentation for API posture, then industry surveys (Angi State of
  Home Spending, Invoca call benchmarks, Zenoti consumer surveys, MGMA Stat polls, AAA Your Driving Costs, NRA
  consumer insights), then trade press. Analyst market-sizing treated as directional only.
- **Labeling discipline:** every major figure is tagged **measured** (from a survey/count) or **estimated**
  (modeled/forecast/vendor-adjacent). Verification flags used: `verified primary` (filing/PR/official docs),
  `index` (trade press/survey aggregators), `secondary` (vendor blogs/analyst estimates).
- **Bias flags:** vendor-sourced statistics (Invoca, ServiceTitan, Housecall Pro, Zenoti) come from companies that
  sell to the category being measured — they have incentive to emphasize phone pain. Treated as directional, and
  cross-checked where a second source existed.
- **No invention:** where data did not exist, it is stated as a gap (§6), not interpolated.

---

## 3. Part 1 — Prompt 1 from my own history (summary)

Sample: **1 user, ~90 days, 2 booking categories.** Thin — labeled honestly; useful only as one anecdotal point for
convergence-checking, not standalone evidence.

| Category | Requests | No-phone completion | Phone required | Abandoned | Pattern |
|---|---|---|---|---|---|
| Air travel (verify/rebook/track) | 4 (measured) | 100% — all online | 0% | 0% | Recurring (~4 US trips / 5 yrs) |
| Plumber, Cambridge MA | 1 (measured) | 0% — never completed | 0% (never got that far) | 100% — stalled ~2 wks on scoping | One-off per issue |

Scores that matter: air travel is 5/5 on standardization and price transparency (fully structured fields, all-in
prices shown pre-purchase: $806.40 AA, $503.40 Delta — measured) but the rail already exists. Plumber scores 2/5 on
both (stalled on "describe the issue"; no upfront pricing found on any surfaced shop). **Missing-rail list has one
entry: home-services booking** — a structured API would have turned a 2-week stall into a booked slot.
**My first-pick category: home-services booking (plumber/HVAC)** — the only category in my history where the
absence of a rail caused total failure. Platform constraints: I cannot place voice calls at all; web forms and
checkouts are fine but every payment needs explicit per-transaction approval.

---

## 4. Part 2 — Wedge ranking (strongest → weakest)

| Rank | Category | Why in one line |
|---|---|---|
| **1** | **Home services** | Largest phone pain (measured), biggest tickets, and the most open supply APIs |
| 2 | Salon / spa | Easiest technical build: fully structured scope, fixed price menus, most open APIs — but fragmented supply, smaller tickets |
| 3 | Auto repair | Maintenance is structured; repair needs diagnosis; supply API mostly partner-gated |
| 4 | Medical / dental | Worst price transparency; insurance/referral blockers are structural; incumbents own the agentic layer (Zocdoc × Gemini) |
| 5 | Restaurants | Booking already solved and free; every API hardened/read-only; supply consolidated behind walled gardens |

### Strongest wedge: HOME SERVICES
Contractors miss 27% of calls in business hours and over 60% after hours (ServiceTitan study); ~48% of
home-services calls never reach a person at all (Invoca 2026); fewer than 3% of voicemail callers leave a message
and 85% of unanswered callers never call back — while those same calls convert at 46%, the highest of any industry
(Invoca 2025, 60M+ calls). Average tickets run $350–$1,200+, so each recovered booking is worth real money, and 97%
of homeowners demand transparent pricing while only 31% of HVAC contractors publish any (Housecall Pro 2025;
ACHR/myCLEARopinion 2026) — a gap an agent quoting from flat-rate price books could close. Supply-side, the two
largest SMB platforms both expose real APIs today: Jobber's documented GraphQL Developer Center (100,000+
customers, PR May 2026) and Housecall Pro's public REST API (200,000+ pros, PR Nov 2025), with ServiceTitan's
partner API covering the enterprise tier (~8,000 active customers, $62B GTV, FY2025 revenue $771.9M +26%, IPO Dec
2024 at $71 / ~$9B). The category's weakness — repair scope needs diagnosis — is the moat: whoever builds the
structured-intake layer ("describe the problem → flat-rate quote → booked slot") owns the hardest part.

### Weakest wedge: RESTAURANT RESERVATIONS
Despite perfect scope standardization, the booking problem is already solved and the remaining value accrues to
gatekeepers, not middleware. OpenTable (70,000 restaurants, ~2B seats/yr) and merged Resy+Tock (25,000 venues)
already offer real-time availability and free consumer booking; every API is hardened — OpenTable has no public
consumer API, Tock's API is explicitly read-only for reservations, Resy is partner-only. Consolidation (Amex: Tock
$400M 2024, Rooam 2024, TheFork $700M agreed Jun 2026; DoorDash: SevenRooms ~£900M 2025) concentrates supply
behind walled gardens monetizing diner data and card-holder exclusivity, and incumbents automate the phone channel
themselves (OpenTable voice-AI partners seated 3M diners, +270% in 2026). A third-party rail would integrate N
fragmented systems per venue (restaurants run Resy + OpenTable + SevenRooms + Yelp simultaneously — WSJ Aug 2026)
to book a *free* reservation: high integration cost, no ticket to clip.

### Per-category briefs

**Home services** — Demand: 10 projects/yr, $12,472/yr spend; maintenance $2,041, emergency repairs $1,143
(Angi State of Home Spending 2025, Jan 2026; measured). Standardization: mixed — cleaning/lawn/pest/HVAC
maintenance are menu-izable; repair needs diagnosis; 64% of contractors still rely on phone as primary comms vs
10% online forms (EC&M 2025; measured). Price: 97% expect transparent pricing, only 31% of HVAC contractors publish
any; 91% prefer flat-rate over hourly (Decision Analyst 10,000+ homeowners) — but flat-rate books live inside
ServiceTitan/pricebook systems, shown on-site, not published. Supply APIs: Housecall Pro public REST
(docs.housecallpro.com), Jobber GraphQL Developer Center (developer.getjobber.com), ServiceTitan partner-gated
(partnerapis.servicetitan.io). Failure modes: the missed-call economics above; Google Local Services Ads began
charging for unanswered business-hours calls (>20s) from Oct 1, 2026 — missed calls now carry direct ad cost.

**Salon / spa** — Demand: women 3.81 visits/yr @ $54.34; men 5.84 @ $22.93; avg haircut ~$43 in 2026 (SQUIRE;
measured/secondary). Standardization: excellent — service + provider + date/time fully specifies. Price: high —
fixed service menus published as standard practice. Supply APIs (most open vertical): Boulevard Client+Admin
GraphQL APIs, public portal developers.joinblvd.com (5,000+ businesses, $5B payments/yr; verified primary);
Vagaro Enterprise API V2, approval-gated (docs.vagaro.com; ~100K US businesses); Mindbody public + consumer APIs
(~60K businesses); Zenoti partner-mediated (30K+ locations); Fresha 140K businesses / $1.4B/mo volume but API
unconfirmed. Failure modes: 71% of regulars skipped booking because unreachable (Zenoti 2025; measured); the gap
is after-hours access and changes, not first booking. Fragmented: no player >~15% of the long tail.

**Auto repair** — Demand: $1,656/yr maintenance+repair (AAA 2025, 15K mi; measured); per-visit $95–$600
(J.D. Power; measured). Standardization: good for maintenance, poor for repair (diagnosis needed). Price: partial
— RepairPal instant ranges if you know the repair; true all-in price needs shop diagnosis + DVI photo approval.
Supply: Tekmetric 15,000+ shops (Jul 2026 PR) but API partner-gated only; Shopmonkey/Shop-Ware/Mitchell 1 counts
not found. Failure modes: 69% of dealer service visits scheduled by phone — but that stat is Cox 2018 (dated,
flag); 45% of non-online schedulers unaware the option existed (2024; measured).

**Medical / dental** — Demand: 37% of adults see a dentist yearly (ADA n≈15K; measured); dental spend $492–$598/yr;
cleaning ~$110. Standardization: good for routine care (specialty + provider + time + insurance), poor for
symptom-driven visits. Price: worst of all five — rarely published, quotes after exam, insurance rates opaque.
Supply: Zocdoc 200K+ providers with Care Access Network (2026) and Gemini connected-app booking (Aug 2026 —
incumbents own the agentic layer); NexHealth Synchronizer API (10K+ dental practices). Failure modes: 71% of
medical groups report <25% of patients self-schedule (MGMA Jul 2025; measured); blockers are closed panels,
referrals, insurance verification — structural, not rail-solvable.

**Restaurants** — Demand: 56% of US consumers dined out in the past week (NRA Q2 2026; measured). Standardization:
best of all five (venue + date + time + party size). Price: booking free; menus public. Supply: consolidated and
closed (see weakest-wedge above). Failure modes: first-time callers hit 60–80% answer rates in service hours
(vendor analysis, directional); no solid US stat on phone-vs-online *reservation* share (gap).

### Market sizing (proxies — no direct source exists)
- "On-demand home-services booking software" market size: **no source found** (stated gap). Proxies — global FSM
  software: $4.99–5.63B in 2025 → $9.2–13.3B by 2031/32 (TechSci/GIIR, Verified Market Reports, Research and
  Markets); HVAC FSM alone $3.89B → $12.72B by 2034.
- Restaurant reservation software estimates **conflict**: $6.6B (2024, The Market Intelligence) vs $1.2B (2024,
  Market Research Intellect) vs $499M (2025, Global Info Research) vs $90M (2025, GIR narrow definition) —
  definitions differ (platform revenue vs SaaS license); treat as directional.

### 2024–2026 trends
1. ServiceTitan IPO (Dec 2024) validated the trades rail as a public-company-scale business.
2. Restaurant supply consolidated into Amex / Booking Holdings / DoorDash poles; multi-homing persists.
3. API posture **hardened everywhere** — write access stays partner-gated except Boulevard, Jobber, Housecall Pro,
   Mindbody.
4. Incumbents ship their own agentic layers (Zocdoc × Gemini, OpenTable voice AI, Jobber AI receptionist) — a
   third-party rail competes with platforms' roadmaps.
5. Unverified rumor (single blog, Sep 2026): Jobber runs an unannounced, mostly-read-only MCP server. Flagged,
   not relied on.

---

## 5. Convergence check — where the two parts agree

My Prompt 1 (n=1 user) independently lands on **home-services booking as the first-pick category** — the same
category the market research ranks #1. The failure I actually experienced (2-week stall on a plumber booking for
want of a structured path) is the same failure the market data quantifies at scale (27–48% missed calls, 85% no
callback, 97%/31% pricing gap). Two independent angles, same answer: that is the convergence signal your prompt doc
describes. Salon/spa as #2 is the "easiest build" hedge if home-services intake proves too hard.

---

## 6. Data gaps (explicitly not found — not interpolated)

- US phone-vs-online share of **restaurant reservations** specifically (takeout-ordering stats don't transfer).
- Average restaurant per-cover spend from a primary source.
- Annual auto-repair visit frequency per household (only per-visit costs and annual spend).
- Medical appointment frequency per household.
- "On-demand home services booking software" market size (only broader FSM proxies).
- Kickserv, Shopmonkey, Shop-Ware, Mitchell 1, AutoLeap customer counts.
- Fresha public API status.
- Jobber unannounced MCP server (single-blog rumor).

---

## 7. Sources

**Home services**
- Angi State of Home Spending Report 2025 (press release Jan 2026):
  https://www.globenewswire.com/news-release/2026/01/20/3221830/0/en/Millennials-Are-Driving-the-Future-of-Home-Spending-According-to-Angi-s-State-of-Home-Spending-Report.html
- Jobber Home Service Economic Report Q3 2025: https://www.getjobber.com/home-service-reports/november-2025/
- SearchLight contractor benchmark via bmmagazine (Feb 2026):
  https://bmmagazine.co.uk/business/google-will-charge-for-missed-calls-from-october-1-why-us-contractors-are-turning-to-an-ai-answering-service/
- Housecall Pro homeowner study (n>1,000, 2025) via Contractor Magazine:
  https://www.contractormag.com/around-the-web/news/55340108/homeowners-prioritize-experience-over-price-alone-new-housecall-pro-study-finds
- EC&M industry survey (2025):
  https://www.ecmag.com/magazine/articles/article-detail/residential-services-businesses-experience-growth
- ACHR News / myCLEARopinion HVAC pricing (2026) via marketersmedia: https://news.marketersmedia.com/should-you-put-prices-on-your-website-25-pre-hire-questions-answered/89205052
- Decision Analyst flat-rate pricing survey (10,000+ homeowners) via Contracting Business:
  https://www.contractingbusiness.com/archive/article/20867313/the-problem-with-flat-rate-pricing
- Housecall Pro API overview (official docs): https://help.housecallpro.com/en/articles/8505035-api-overview
- Jobber Developer Center (official): https://developer.getjobber.com/docs/
- ServiceTitan partner API (official): https://partnerapis.servicetitan.io/docs/overview/
- Invoca call data (2025/2026) via bmmagazine:
  https://bmmagazine.co.uk/business/google-will-charge-for-missed-calls-from-october-1-why-us-contractors-are-turning-to-an-ai-answering-service/
- ServiceTitan missed-call study via Medium vendor analysis (directional):
  https://medium.com/@jahanzaibai/ai-voice-agents-for-home-services-stop-losing-calls-and-revenue-in-2026-a6fe9bcfc103

**Restaurants**
- NRA Quarterly Consumer Insights Survey Q2 2026: https://www.restaurantnewsresource.com/national-restaurant-association-quarterly-consumer-insights-survey-q2-2026
- TouchBistro 2024 Diner Trends Report: https://www.businesswire.com/news/home/20240326938992/en/TouchBistro%E2%80%99s-2024-Diner-Trends-Report-Shows-U.S.-Diners-are-Looking-for-Savings-Convenience-and-Connection/
- OpenTable partner API / data debate: https://hospitalitytech.com/debate-who-owns-restaurants-data-heats-opentable-makes-changes
- Resy partner API (community mirror): https://github.com/api-evangelist/resy
- Tock reservations API, read-only (community mirror): https://github.com/api-evangelist/tock-reservations
- Amex completes Tock acquisition ($400M): https://www.finextra.com/pressarticle/102756/american-express-completes-the-acquisition-of-tock
- Amex–TheFork $700M (Jun 2026): https://www.pymnts.com/acquisitions/2026/amex-looks-to-spend-700-million-to-buy-thefork-from-tripadvisor/
- Resy+Tock merger: https://www.fastcompany.com/91496951/amex-resy-tock-restaurant-reservation-wars
- DoorDash / SevenRooms / Deliveroo: https://www.primointeractive.com/blog/restaurant-reservation-apps-booking-wars-uk
- WSJ on restaurant multi-homing (Aug 2026): https://www.wsj.com/business/restaurant-reservation-apps-30a29e6b
- OpenTable AI tools / voice partners (+270%, 3M diners): https://ecommercenews.com.au/story/opentable-launches-ai-tools-to-help-restaurants-fill-seats

**Salon / spa**
- SQUIRE barbershop industry data (2026) via YouTube: https://www.youtube.com/watch?v=haqrWj5cWco
- Zenoti Salon & Spa Consumer Survey 2025 (PDF):
  https://cdn.sanity.io/files/10yku790/production/32b6218c4685baf90c70c89e012caef68134b8ab.pdf
- Zenoti Medspa Survey 2025 (PDF):
  https://cdn.sanity.io/files/10yku790/production/51dfb5e937abdb02530d9872a1a550becfa208d0.pdf
- ISPA 2024 Consumer Study: https://www.spaopportunities.com/spa-news/2024-ISPA-Consumer-Study-reveals-spa-goer-trends-and-preferences/352914
- Boulevard API (official): https://www.joinblvd.com/features/api?slug=data-security and
  https://www.joinblvd.com/legal/api-license-agreement
- Vagaro Enterprise API V2 (community mirror): https://github.com/api-evangelist/vagaro
- Mindbody Consumer API infographic (official, 2023):
  https://mindbodyonline.com/sites/default/files/public/education/learning-assets/2023-07-CONT-consumer-api-infographic.pdf

**Medical / dental**
- ADA Health Policy Institute oral-health survey (n≈15,000): https://www.drbicuspid.com/dental-practice/article/15372246/ada-survey-adults-value-oral-health-but-dont-see-a-dentist
- ADA fee / dental insurance brief: https://www.drbicuspid.com/dental-practice/article/15372249/ada-brief-is-dental-insurance-worth-it
- Zocdoc Care Access Network (Fierce Healthcare, Sep 2026):
  https://www.fiercehealthcare.com/health-tech/zocdoc-power-bookings-payer-tech-platforms-enterprise-offering
- Zocdoc × Gemini connected app (PR, Aug 2026):
  https://www.prnewswire.com/news-releases/zocdoc-brings-seamless-real-time-appointment-booking-to-gemini-302849229.html
- NexHealth Synchronizer API via Wellspoken PR (Sep 2025):
  https://news.delawarenewsreporter.com/story/561161/wellspoken-launches-dental-practice-growth-program-through-nexhealth-synchronizer-api-integration.html
- MGMA Stat polls (Jul 2025 / Sep 2026 / Apr 2025): https://www.mgma.com/mgma-stat/third-party-booking-capacity-vs-demand

**Auto repair**
- AAA Your Driving Costs 2025 via Traders Union: https://tradersunion.com/news/financial-news/show/3330687-us-car-ownership-costs-2024/
- J.D. Power service costs via ConsumerAffairs: https://www.consumeraffairs.com/automotive/car-repair-statistics.html
- Tekmetric built-in marketing / survey (PR, Sep 2025):
  http://business.kanerepublican.com/kanerepublican/article/bizwire-2025-9-30-tekmetric-unveils-built-in-marketing-solution-to-help-auto-repair-shops-drive-repeat-business
- Tekmetric platform expansion (PR, Apr 2026): https://www.businesswire.com/news/home/20260413784822/en/Tekmetric-Expands-Platform-to-Help-Auto-Repair-Shops-Get-Found-and-Handle-Customer-Calls
- Cox Automotive 2018 Maintenance & Repair Study (dated — flagged):
  https://www.fixedopsdigital.com/wp-content/uploads/2018/08/MaintenanceAndRepairStudyBrochureFinal.pdf
- Pied Piper 2026 Service Scheduling Effectiveness (PR, Sep 2026):
  https://www.businesswire.com/news/home/20260913162934/en/Volkswagen-Ranked-Highest-in-2026-Auto-Industry-Service-Scheduling-Effectiveness-Study

**Market sizing**
- FSM $4.99B→$9.65B (TechSci via GIIR, 2026): https://www.giiresearch.com/report/tsci1953901-field-service-management-market-global-industry.html?
- FSM $5.1B→$9.17B (Verified Market Reports, Apr 2026): https://www.verifiedmarketreports.com/product/field-service-management-fsm-software-market-szie-and-forecast/
- FSM $5.63B→$13.3B (Research and Markets): https://www.researchandmarkets.com/reports/6086629/field-service-management-market-global
- Cloud FSM $9B→$28.4B (Research and Markets, Oct 2025): https://www.researchandmarkets.com/reports/6186049/cloud-field-service-management-market-outlook
- HVAC FSM $3.89B→$12.72B (Growth Market Reports, Jun 2026): https://growthmarketreports.com/report/hvac-field-service-management-software-market
- Restaurant reservation software (conflicting): https://www.themarketintelligence.com/market-reports/restaurant-reservation-software-market-3890 ·
  https://www.openpr.com/news/4251484/restaurant-reservations-software-market-witnesses ·
  https://pdf.marketpublishers.com/globalinfo/global-restaurant-table-reservation-software-market-gir.pdf

**Research working notes (per-batch evidence):** `notes/batch1-demand.md`, `notes/batch2-supply.md`,
`notes/batch3-api-consolidation.md` in the research directory; full per-category brief in `report.md`.
