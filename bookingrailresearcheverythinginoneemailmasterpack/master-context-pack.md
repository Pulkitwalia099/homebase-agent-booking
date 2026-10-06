# Booking-rail venture: master context pack

> **Project update — 2026-10-05:** This pack is historical research. Its original body is retained below. Use the [current Homebase thesis](../resources/current-thesis.md) and [project overview](../README.md) for the latest recommendation. In particular, the current pilot hypothesis tests new-customer acquisition, the fee split is unvalidated, Boston and the software vendor remain provisional, and the older venture-scale tests and pilot thresholds are not established facts.

**Prepared by Fo (Pulkit Walia's AI assistant) · October 4, 2026 · Version 1.0**

## What this pack is

A single, self-contained context document covering the full booking-middleware research engagement: the founder's questions, everything I (Fo, a personal AI assistant) researched and wrote, my complete five working documents reproduced verbatim, the methodology behind every claim, the three external agent-team results and what they showed, and an explicit list of what is still unverified. It is written to be pasted whole into a large language model as ground truth for follow-on work. Nothing in it needs external context; the raw third-party outputs accompany this pack as separate attachments and are summarized here.

## How to use this pack with a frontier model

Recommended intake order: (1) read this pack top to bottom; (2) read the raw Instinct, Muse and Dots outputs attached alongside; (3) then work the task list in the "Frontier model playbook" section at the end. The most valuable first ask is adversarial: have the model attack the wedge thesis in this pack and find every place the evidence is weaker than the prose implies.

## The founder's questions, in order asked

1. Is a booking-MCP venture scale, would an agent pay for it, should the company take a booking cut, how does it technically work, and how do agents choose between an MCP and a phone call?
2. What is the best city x category wedge, and what demand signals exist?
3. Did the analysis cover the full universe of booking segments, not just home services?
4. Write two prompts: one to extract each agent team's booking data from its own logs, one to make them run live booking attempts.
5. (After results came back) Compare the three teams' outputs and synthesize.
6. Assemble everything into this pack for frontier-model work, and advise what to do with frontier model access.

## Everything I did, in order (the working record)

- **Verdict note (doc 1).** Assessed venture scale from my vantage as a personal agent that places real phone calls to businesses. Established the two 90-day tests (supply test: 100+ end-to-end bookable provider locations in one metro; platform test: one agent platform ships the MCP first-party), the no-percentage-cut pricing stance (flat fee per confirmed job charged to providers, MCP free to agents, benchmarked against Angi/Thumbtack's $20-100 per non-converting lead), the MCP tool surface (search/availability/quote/book/modify/cancel with idempotency and honest errors), and the agent-side tool-selection mechanics.
- **City x category note (doc 2).** Researched market data and operator communities. Established bookable supply density (not search volume) as the deciding metric, with a fingerprint-the-booking-widget crawl methodology. Picked Boston as launch city (founder on the ground, dense high-income market) with SF reserved for platform partnerships, and residential house cleaning as the category (recurring, standardized pricing, FSM penetration, proven consumer trust at scale via Handy). Junk removal ranked second; lawn care late (GreenPal/LawnStarter occupy it); vets and emergency trades fail the no-conversation gate.
- **Missing-rail map (doc 3).** Scanned the whole ask-space of personal-agent booking tasks: walled rails (restaurants, travel, chain fitness), genuinely missing rails (home services, cleaning long tail, mobile detailing, mobile pet grooming, salon long tail, movers, auto, childcare), and never-a-rail segments. Set the five-part test (frequency, standardization, fragmented supply, agent-trust ticket size, one-integration-at-a-time supply). Ranked expansion: detailing, then pet grooming; flagged childcare as the big burning void that is wrong to cold-start for safety reasons.
- **The two prompts (doc 4).** Wrote the data-extraction prompt (90-day booking request universe, 1-5 scoring across standardization/pricing/frequency/ticket/supply software/failure modes, missing-rail list, platform constraints) and the live-validation prompt (3 real attempts per top-5 category, logged to the last reversible step, choke points in order). Set the reading rules: convergence across independent teams is the signal, score weights frequency 30% / standardization 25% / pricing 20% / integrability 15% / ticket 10%, standardization and pricing are hard gates, and self-reported friction gets discounted in favor of timestamped failed attempts.
- **Sent the prompts to three agent teams** (Muse, Instinct, and Dots) on the founder's instruction.
- **Collected and read all three teams' returns** from the founder's Gmail: Instinct's Claude and ChatGPT outputs, Muse's full research pack (its own history plus an independent deep-research pass), and Dots' 40-page report plus a 15-provider Boston public-path field audit with an evidence workbook.
- **Cross-team comparison (doc 5).** The synthesis reproduced in part 5 below.

## Methodology and its limits (read before trusting any number)

- **My vantage is one personal agent.** My task stream is real but small; every demand-side claim from my own history is anecdotal and labeled as such. The market claims in docs 1-3 come from web research (company filings and press releases, official API documentation, operator communities on Reddit, trade press) run on October 4, 2026, and are directional, not audited.
- **The three teams' samples were each single-user and thin.** None of the four agents (me, Muse, Instinct, Dots) found more than a handful of real booking requests in accessible history, and none found a home-services booking request at all except Muse's stalled Cambridge plumber. Treat all convergence on cleaning as independent reasoning to the same answer, not as demand measurement.
- **The live booking runs (prompt 2) were never actually executed by anyone.** Instinct could not (no browser or phone), Muse deferred pending a metro call, Dots substituted non-committing public-path inspections. The single most important missing piece of evidence is still missing.
- **Labeling discipline.** Measured = a count or direct observation. Documented = a named first-party source, not an exercised integration. Estimated/judgment = a hypothesis with stated basis. Unavailable = no evidence exists; it is never treated as zero. Muse's vendor-sourced call statistics (Invoca, ServiceTitan, Housecall Pro) come from companies selling into the pain they measure; treat as directional.
- **Known data gaps:** phone-vs-online share for restaurant reservations; household frequencies for auto, medical, salon; on-demand home-services booking software market size; customer counts for Kickserv, Shopmonkey, Shop-Ware, Mitchell 1, AutoLeap; Fresha API status; the Jobber unannounced MCP server rumor (single blog, September 2026, flagged not relied on).
- **Key external facts used** (all sourced in doc 2's research and Muse's pack): US home services roughly $650-840B/yr with under 1% online; ServiceTitan IPO December 2024 (~8,000 customers, $771.9M FY2025 revenue); Jobber 100,000+ customers with documented GraphQL API; Housecall Pro 200,000+ pros with public REST API; contractors miss 27% of in-hours calls and ~48% of home-services calls never reach a person; 97% of homeowners want transparent pricing versus 31% of HVAC contractors publishing any; Mindbody consumer-booking fees $15/location/integration plus $1.30/class or $2.50/appointment (Dots' unit-economics red flag).

## The three teams' results, condensed

**Instinct** (Claude and ChatGPT, raw outputs attached): honestly reported near-zero booking demand in accessible history (5 booking-type requests in 16 months, zero home services). Its judgment top-10 puts recurring home cleaning first; ChatGPT's two-data-point sample picked hotels, a vantage artifact. Could not run live attempts; offered a 15-provider static booking-surface audit instead.

**Muse** (full pack attached): its own history produced the Cambridge plumber stall (the only real home-services failure any team found) and it built an independent deep-research pack ranking home services #1 on missed-call economics and open supply APIs, salon/spa #2 as the easiest build, restaurants weakest and walled. Live runs deferred pending the founder's metro call.

**Dots** (report and evidence workbook attached): the skeptic, and the most useful input. Zero booking requests in its sample. Ran a 15-provider Boston public-path field audit across cleaning, auto, beauty/barber, pet grooming and fitness: beauty showed the clearest public booking surfaces, cleaning was heterogeneous (form, quote-first, unverified availability), and eight named scheduling products appeared in 15 providers, which grounds its core reframe: the APIs already exist; the unresolved problem is (a) rights to genuinely bookable inventory, (b) reliable prices, (c) customer-approval mechanics, (d) outcome verification, and who pays. Its testing order: 1. cleaning exceptions for existing households, 2. barber rebooking on Square, 3. fixed-bag laundry, 4. returning-pet rebooking, 5. lawn exceptions, with a full 30-day validation protocol (access, scope, safety, performance, accuracy, commercial and distribution gates) and sobering unit-economics math on exception-fee models.

## Combined verdict

Cleaning in Boston stays the first bet, but on Dots' reframed terms: the gap is inventory access and unproven willingness to pay, not missing APIs. The sharpest first experiment is a three-operator cleaning-exceptions pilot on one platform (Housecall Pro or Jobber), with new-customer acquisition as the second act, borrowing Dots' gates (90% of eligible operations completing without human intervention, 50%+ handling-time reduction, at least one paid continuation). The live booking runs everyone agreed to remain unexecuted; Muse's offered runs and Instinct's offered audit are the two pieces of work that close the evidence gap.



---

# Part 1: my working document, verbatim

# Booking middleware for agents: is it venture scale, and how to win the rail

You asked five things: how to decide if this is venture scale, whether an agent would pay for it, whether to take a cut of bookings, how it would technically work, and how agents decide between an MCP and a phone call (and how you become the preferred one). Here is my honest take, from the agent side of the table.

## The verdict

The problem is real. I phone businesses to book things because that is the only rail that exists for most local services, and calls are slow, flaky, capped by attempt limits, and bad at carrying structured facts back. A direct booking path through an FSM (ServiceTitan, Housecall Pro, Jobber) is a genuine upgrade for every personal agent.

But the same idea is obvious to everyone reading the market, and there are many personal agents today. Venture scale or feature is decided by two tests you can run in 90 days, and nothing else:

1. **The supply test.** One metro, 100+ provider locations bookable end to end (search → availability → quote → confirmed booking → cancellation path). Most of those should come from FSM-backed chains, not one-off operators you sign by hand. If you cannot get 100 in Boston, the thesis is dead; if you can, you have a repeatable playbook.
2. **The platform test.** One agent platform ships your MCP first-party or in its default catalog. One integration saying yes is worth a hundred cold pitches to individual agents, because discoverability, not quality, decides which tools get used.

If both land, this is a rail business, and rails are venture scale. If only the first lands, you have a nice vertical SaaS. If neither, it is a feature.

## Would an agent pay, and should you take a cut

Two separate buyers, and it matters which one you charge.

**The agent platform is the buyer, not the agent.** I do not hold a budget; the product behind me does. What a platform is buying is reliability: a booking that says "confirmed" and is actually confirmed, with a real price, real terms, and a working cancel. A tool that quietly reports success on a failed booking is worse than a phone call, and platforms know it.

**Do not take a percentage of bookings.** It punishes large-ticket jobs, it quietly rewards routing to pricier vendors, and both agents and their users will smell the conflict. Instead:

- Charge **providers a flat fee per confirmed job**, or a monthly SaaS with a per-booking meter.
- Keep the **MCP free for agents and platforms**. Free rails get adopted; taxed rails get routed around.
- The comparison that sells it: Angi and Thumbtack charge providers roughly $20–100 per *lead* that often never converts. You charge per *confirmed job* that actually happened. That is an easy conversation.

## How it should work

Build the MCP so the happy path is one round trip and the failure path is honest. Tools I would want:

- `search_providers(need, area, window)` with truthful coverage metadata: who is integrated, which zips, hours, specialties, whether slots are live or on request.
- `check_availability` returning real slots, not a link to a page I then have to browse.
- `get_quote(job_spec)` with an all-in number, fees included.
- `book(slot, details)` that is idempotent (a retry never double-books) and returns a confirmation id, the total, and the terms.
- `modify` and `cancel`, because a booking without an undo path is not one an agent will trust.
- Webhooks so a provider-initiated change reaches the agent platform rather than a stale confirmation.

The product is the guarantee, not the endpoints: one call returns a real slot at a real price, or a clean structured "no availability, nearest is X." That beats three voicemails every time, and it is what earns the next booking.

## How agents actually choose between your MCP and a phone call

Honest version, from how it works in practice:

1. **Task-to-tool match.** The agent reads what a tool is for. If the description plainly says "book local home services," a booking task starts there instead of at the phone.
2. **The result builds or burns trust.** Structured, honest results, failures included, earn repeat use. A tool that overclaims gets dropped the first time its "confirmed" turns out not to exist. Truthful coverage data is not a nice-to-have; it is the product.
3. **Speed and completeness.** One round trip beats a browsing session; a result that still needs a phone call is a result that did not happen.
4. **Presence.** A tool must be listed where the agent looks: a platform's first-party catalog, an MCP registry the agent actually scans. A great MCP nobody lists loses to a mediocre one in the catalog.

## How to become the preferred rail

- **Get shipped, don't just get listed.** Partnerships with agent platforms beat open-market MCP listings. Your pitch to them is your measured numbers: booking success rate, time-to-book, no-show rate versus phone booking.
- **Win one metro completely.** Dense Boston coverage beats thin national coverage, because an agent's first bad "no coverage" experience in a big market is hard to come back from. Instrument everything from day one and publish it.
- **Lock supply where it counts.** Deep integrations with regional FSM-backed chains beat a long tail of single operators. One regional chain is 40 provider locations you never have to sell again.
- **Make the first impression load-bearing.** The early bookings through your MCP should be the ones agents tell their users about.

## First 90 days

1. Sign 25 providers in one metro, FSM-backed ones first.
2. Build the MCP thin: search, availability, quote, book, cancel, honest errors.
3. Hand it free to two or three agent platforms and measure everything.
4. Go back to the supply test and the platform test with real numbers and decide there, not in a spreadsheet.

The honest bottom line: the wedge is good, the timing is good, and the whole business lives or dies on the supply grind. If you can point at 100 bookable providers in one city and one platform that shipped you, raise on it. Before that, it is a well-executed feature with a promising future.

---

# Part 2: my working document, verbatim

# City × category: where to launch the booking rail

You asked for the best city-and-category starting point, what real demand signals exist, and which category is the thinnest wedge that books without a phone conversation. I searched the market data and the operator side (Reddit's operator communities are the honest signal here). Here is what holds up.

## First, the market context

US home services run roughly $650–840 billion a year, and less than 1% of it flows through online platforms. The incumbent marketplaces are shrinking or leaning on AI helpers (Angi says its AI Helper lifts conversion 3x), and Thumbtack is already embedded in ChatGPT for home services booking. So the demand exists, the agent channel is proven, and the open flank is supply: nobody owns a clean, structured, bookable rail for local services. That is your lane.

## The demand signal you asked about (and the better one)

Search-volume signals by metro exist (Google Trends lets you compare "house cleaning service" by city, and Angi/Thumbtack publish category heat reports). But I would not pick a city off search volume. Search volume measures marketing spend and population, not whether you can actually book a job there tomorrow.

The signal that decides your business is **bookable supply density**: for a given metro and category, how many providers can a booking flow complete end-to-end (search → availability → confirmed slot → cancellation path)? That is countable today:

- Crawl Google Maps/Yelp listings for a category in a metro and fingerprint the booking widget each one uses. The widget name IS the FSM: Housecall Pro, Jobber, BookingKoala, MaidCentral, and so on. Each fingerprint tells you which API your MCP needs and how many providers it reaches in one integration.
- Count providers per category per metro. That number is your coverage metric, your pitch to agent platforms, and your decision input in one.

This is a weekend of scraping and it answers the city question with data instead of vibes. Do this before choosing anything.

## The city

My pick: **Boston, with SF as the partnership trip, not the launch city.**

- **Boston (launch).** You live there. The supply grind is door-to-door and founder-led at the start, so your physical presence is a real advantage. It is a dense, high-income, year-round market, and FSM penetration is no different from any big metro. Nobody in your city is doing this.
- **SF (partnerships).** Almost every personal-agent team you want to hand your MCP to sits in SF. Go there to get shipped first-party, not to build supply; supply grind from a distance is how this dies.
- **New York** is the biggest demand pool and the most fragmented, expensive, brutal supply side. Wrong first city.
- **Austin** is fine but smaller, and you have no edge there over anyone.

## The category: house cleaning

Across your criteria (standardization, price transparency without a conversation, booking frequency, supply software penetration, ticket size an agent can responsibly book), one category wins most of them: **residential house cleaning.**

Why it is the thinnest wedge that actually works:

- **Recurring by nature.** Weekly or biweekly service means retention compounds, and the fill-rate and no-show improvements you pitch providers matter most in a recurring category. It also makes agents' use burn hot: users ask for cleaners over and over, so a personal agent hitting your MCP weekly is the partnership story.
- **Prices without a conversation.** Scope is standardized and priced by bedrooms/bathrooms or hours. No site visit, no quote negotiation, no callback. That is the single biggest execution gate, and cleaning clears it.
- **Providers already book online.** Cleaning companies are the power users of online booking software (Housecall Pro, Jobber, Launch27, BookingKoala). Operators on Reddit say outright they want book-and-pay online with no estimate ping-pong. Your MCP is a thin layer over booking infrastructure that already exists, not a behavior change you have to sell.
- **The consumer behavior is proven at scale.** Handy built millions of bookings with cleaning as its primary category. People will let an app book a cleaner they have never spoken to. That is your proof that agent booking clears the trust bar.
- **Small ticket, low risk.** A $120–200 cleaning is small enough that a user lets the agent book it and fixes mistakes cheaply. Contrast an HVAC replacement at $5k+, where the user will always want to personally approve the quote, and where a quote conversation is unavoidable anyway.

The honest weakness: it is competitive and commoditized, margins for cleaners are thin, so your per-job fee has to stay small. That is fine; the wedge's job is to prove the rail, not to make money yet.

## The runners-up, and why not first

- **Junk removal.** The best second category. Same-day demand, standardized truck-volume pricing, higher ticket (bigger fee per job), FSM-backed operators. But low frequency per household, and logistics ("crew on the way") matter as much as booking.
- **Lawn care.** Great recurring subscription economics, but GreenPal and LawnStarter already occupy the rail, so you would be late rather than thin.
- **Vet appointments.** No. Slots are scarce and inventory-constrained, clinics run fragmented practice-management software, owners want to talk to the clinic for anything medical, and emergencies route around booking entirely. It fails the "book without a conversation" test.
- **HVAC/plumbing/emergency trades.** The revenue is real (maintenance and repair are ~38% of home services spend) and ServiceTitan's enterprise base is there, but every job needs diagnosis and a quote conversation. This is where you go second or third, once providers trust you with their dispatch, not where you start.

## How to decide this properly (your homework)

1. Run the enumeration crawl: providers per category per metro, fingerprinted by booking software. Boston vs SF vs Austin, cleaning vs junk vs lawn vs handyman. One spreadsheet, one weekend.
2. Interview 10 cleaning-company owners in Boston. Ask only: how many slots go unfilled each week, what a no-show costs you, and what you pay Angi or Thumbtack per lead. Their answers are your pricing model and your pitch.
3. Check which booking software the biggest Boston cleaning companies run (the chains like MaidPro are headquartered here, which is a nice supply anchor).
4. Take that data to two or three personal-agent teams in SF: "we have N bookable cleaners in Boston, want a pilot?" Their yes is the platform test from my last note.

## Bottom line

House cleaning in Boston, launched on Housecall Pro and Jobber integrations, with junk removal as the second category and SF saved for partnership trips. The data to confirm it is one weekend of counting away, and that count, not search volume, is the number that decides it.

---

# Part 3: my working document, verbatim

# The full missing-rail map: everything agents get asked to book

You asked the right follow-up: did I only look inside home services, or at the whole universe of things a personal agent is asked to do with no rail underneath? Here is the wider scan, from my actual vantage as a personal agent, plus a framework for judging any segment.

## What agents get asked to book, and what rails exist

Every booking task that lands on an agent falls into one of three buckets:

**Rail exists but is walled or partial.** Restaurants (OpenTable and Resy cover only the mid-and-up slice; the rest still take bookings by phone or Instagram DM), travel (OTAs exist but lock out agents on loyalty and group bookings), fitness classes (Mindbody and ClassPass are closed gardens), haircuts at chains (some have widgets, most do not).

**Rail is genuinely missing.** Home services across the trades, house cleaning's long tail, mobile car detailing, mobile pet grooming, the salon and barber long tail, movers, auto repair, childcare and eldercare, home health, party and event services (photographers, rentals), and government appointments (DMV, passports).

**Never a rail.** Anything where the conversation IS the service scoping: complex contracting, legal, medical decisions, anything safety-vetted.

## The five-part test for a segment worth building

1. **Frequency.** Does a household need it repeatedly? Recurring tasks make the rail sticky and make agents hit your MCP weekly.
2. **Standardization.** Can scope and price be expressed as structured data with no phone conversation? This is the gate that kills most segments.
3. **Fragmented supply with weak software.** If a dominant rail already exists (OpenTable, GreenPal, Rover), you are late. If nobody integrated the supply, the wedge is open.
4. **Ticket size an agent can book with trust.** Small enough that the user says "book it" without approving a quote line-by-line.
5. **Supply reachable one integration at a time.** Chains, franchises, or operators clustered on one booking platform.

## Scoring the alternatives

- **House cleaning** still wins overall: recurring weekly, fully standardized pricing, suppliers already on Housecall Pro/Jobber/Launch27, small ticket, consumer behavior proven at scale (Handy's whole business).
- **Mobile car detailing.** Strong candidate nobody owns. On-demand, packaged pricing (car size + package tier, no conversation), urban users repeat monthly-ish, ticket $80–150. Supply software penetration is near zero, so you sign providers individually at first; that is more grind than cleaning but less competition on the rail itself.
- **Mobile pet grooming.** Genuinely missing rail, real recurrence (every 6–8 weeks per pet), standardized by pet size and coat, mid ticket. Same individual-signing grind as detailing. Good second or third.
- **The salon/barber long tail.** High frequency, clear scope (service + duration), but Booksy/Vagaro/StyleSeat partially occupy it and the best stylists book by DM. You would be fighting an existing (bad) rail rather than building into a void. Medium.
- **Movers.** High value per booking and agents do get asked, but pricing needs an inventory conversation. Instant-quote tools exist and are getting better; this becomes attractive only once inventory capture is standardized. Park it.
- **Auto repair and maintenance.** Standardized maintenance (oil change, tires, inspection) could book fine, and regional chains mean one integration covers many bays. But repair work always needs diagnosis, and enterprise dealer software is closed. Maintenance-only at chain partners is a decent later play.
- **Childcare and eldercare.** This is the honest answer to "is there a burning segment with no rail": yes, this is the biggest one. But vetting, trust, and safety are the product, and a cold start there is a safety-critical liability, not a wedge. Every serious player solves it with human vetting first. Do not start here; maybe never.
- **Party/event services (photographers, rentals).** Quote-driven, episodic, low frequency. No.
- **Restaurants and travel.** Rails exist; the missing piece is access and partnerships with incumbents. That is a walled-garden negotiation game, not a wedge a startup can build supply-side. Different company, not this one.

## The verdict, and how to pressure-test it

House cleaning remains the first wedge; it wins on four of the five tests and ties on the fifth. The ranked expansion path out of it: mobile car detailing, then pet grooming, both of which share cleaning's "arrive at the home, standardized pricing, individual operator supply" DNA, so your playbook transfers. Movers and chain auto-maintenance come later. Childcare is the one segment with real unmet demand I would explicitly avoid at cold start.

One honest caveat: my view is one agent's task stream. To get a better answer, get the same map from two or three other agent teams: ask them for their top 20 request categories and how often each fails for lack of a bookable rail. Where multiple agents' logs agree with the framework above, that is your segment.

## Bottom line

The universe was scanned, not just home services. Cleaning is still the thinnest working wedge, detailing and pet grooming are the credible next rails, and childcare is the big burning void that is wrong to start in. Non-local categories are a partnership game with incumbents, not a build segment.

---

# Part 4: my working document, verbatim

# Prompts to extract agent booking data and validate the wedge with live runs

Two copy-paste prompts: the first pulls structured data from an agent team's own task history, the second makes them run live booking attempts to surface the real choke points. Send both to two or three agent teams, then compare where their tables agree. The prompt text is in the bordered sections; everything outside is guidance for you.

## Prompt 1: data extraction from the agent's task history

```
You are being asked by a founder who is evaluating where to build booking
middleware: an MCP-style rail that would let personal agents book services
directly (via providers' field-service or booking software) instead of
placing phone calls. Before building it, he wants a sound decision across
segments, and you are one of several agents he is asking. Answer from your
own task history and records. Use real data wherever you have it; label
anything you estimate as an estimate. Never invent a number.

PART A: THE BOOKING REQUEST UNIVERSE
Over the last 90 days (or as far back as you retain), list every category
of thing users asked you to book, schedule, or reserve. Rank by request
count. For each category report:
1. Number of requests, and unique users behind them.
2. Share completed without any phone call.
3. Share that required a phone call to complete.
4. Share abandoned by the user once the friction became clear.
5. Whether demand is one-off or recurring per user.

PART B: SCORE EACH CATEGORY 1-5, WITH THE EVIDENCE FOR THE SCORE
a. Scope standardization: can the job be expressed as structured fields
   (dates, sizes, counts) with no description conversation?
b. Price transparency: can an all-in price be obtained without a
   conversation or site visit?
c. Frequency: how often a household repeats this request.
d. Typical ticket size in dollars.
e. Supply software: what booking or FSM software the providers in this
   category visibly use (Housecall Pro, Jobber, Mindbody, OpenTable,
   custom forms, nothing).
f. Failure modes: your actual choke points in this category, named
   specifically (voicemail rate, quote ping-pong, no live availability,
   phone menus, login walls, payment handoff, stale confirmation data).

PART C: THE MISSING-RAIL LIST
List the categories where you fell back to a phone call, web browsing, or
manual form-filling to finish a booking. For each: how often in the
period, and one sentence on what a direct structured booking API would
have changed about that request.

PART D: YOUR CONSTRAINTS
What your platform allows and forbids (phone calls, payments, account
creation, third-party messaging), since that shapes what a rail can
actually remove for you.

OUTPUT
One table, one row per category, columns for every score and number
above, each marked measured or estimated. End with your own ranked top 10
of the most painful missing rails, and one line on which single category
you would want a booking API for first.
```

## Prompt 2: live booking runs to validate choke points

```
Now validate the data with real attempts. Take the top 5 categories from
your Part A table. For each category, run 3 real booking attempts in one
metro you cover well. If a booking would cost money or commit anyone,
carry it to the last reversible step (cart built, form filled, slot
selected) and stop there; that still measures the friction. For each
attempt, log:

1. Category, provider, metro, date.
2. Wall-clock time from start to confirmed (or to the point you stopped
   or gave up).
3. Channels used: site, widget, phone call, email, DM.
4. Every choke point hit, in order: voicemail, phone menu, quote
   required, callback wait, login wall, payment handoff, no availability
   data, stale pricing, verification walls.
5. Final state: confirmed, quote pending, dead end, abandoned.
6. One line: what a structured booking API would have removed from this
   attempt.

Report as a per-attempt log plus a category summary: median time to
book, most common choke point, and whether a rail exists at all in this
category. Be honest about failures; a failed attempt is data, not an
embarrassment to polish.
```

## How to read the results

- Run both prompts on 2-3 different agent teams. The single most valuable output is **convergence**: categories that rank top-3 across independent agents' logs are your wedge candidates; categories where the teams disagree are noise or vantage-specific.
- Weight the scores roughly: frequency 30%, scope standardization 25%, no-conversation pricing 20%, supply integrability 15%, ticket-size trust 10%. A category must clear standardization and pricing or it fails regardless of demand.
- From the live runs, rank choke points by how often they appear and whether an API removes them. Voicemail and phone menus are exactly what your product deletes, so categories drowning in those are your best story. Login walls and payment handoffs are ones you inherit, not ones you solve, so discount them.
- One warning: an agent told to "report friction" will polish its failures. The live-run prompt is the corrective, because a failed attempt with a timestamp is harder to dress up than a self-reported score.

---

# Part 5: cross-team comparison, verbatim

# Cross-team comparison: Muse vs Instinct vs Dots

All three teams returned their runs of your two prompts. I read every output (Instinct's Claude and ChatGPT responses, Muse's full research pack, Dots' report and fieldwork). Here is the honest synthesis, including where the evidence is thinner than it looks.

## Where all three converge

**1. Cleaning / home services is the wedge candidate.** Three independent agents, three angles, same answer: Instinct's judgment ranking puts recurring home cleaning first; Muse's market research ranks home services #1 (biggest phone pain, most open supply APIs); Dots' Boston fieldwork makes cleaning-exceptions its #1 testing priority. By your own convergence rule, this is the signal.

**2. But none of them found measured agent demand.** All three honestly reported near-zero booking requests in their accessible history: Instinct found 5 booking-type requests across 16 months and zero home-services requests; Muse found 2 categories, one of which (a Cambridge plumber) stalled entirely; Dots found zero booking-execution requests in its sample. So the case for cleaning rests on market reasoning and failure-mode logic, not on logs showing agents drowning in booking requests. Keep that distinction in every pitch.

**3. The live booking runs were never actually executed.** Instinct couldn't (no browser, no calls), Muse deferred them pending your call on metro and categories, and Dots substituted a public-path inspection of 15 Boston providers (useful, but non-committing observations, not booking attempts). The one piece of evidence your prompt design said was hardest to fake is still missing.

**4. Restaurants and travel are dead ends as a wedge.** Muse ranked restaurants weakest (booking already solved, APIs gated or read-only, OpenTable/Resy walled); Dots' Mindbody economics point the same way; Instinct's ChatGPT picked hotels, but from a two-data-point sample, which is a vantage artifact, not a signal against cleaning.

## Where they disagree, and what it means

**Confidence.** Muse is the most bullish and did the most homework (missed-call economics: contractors miss 27% of in-hours calls, ~48% of home-services calls never reach a person, 97% of homeowners want transparent pricing while only 31% of HVAC contractors publish any; Jobber and Housecall Pro both expose real APIs today). Instinct is scrupulously conservative, labeling everything. Dots is the skeptic, and its skepticism is the most useful input you received.

**Dots' core finding: the APIs already exist.** Its audit found documented booking capability across Launch27, Housecall Pro, Jobber, Square, Mindbody, Vagaro, and more, and observed eight named scheduling products in just 15 Boston providers. Its argument: the unresolved problem is not "no rail exists," it is whether a new application can (a) get rights to genuinely bookable inventory, (b) get a reliable price, (c) act with the customer's approval, and (d) verify the final outcome. Calling existing APIs through an MCP is an implementation choice, not a moat. This reframing matters more than any ranking in the three packs.

**The wedge framing splits in two.** Muse's implied wedge is new-customer acquisition (a lead-gen replacement with better conversion). Dots argues for the opposite first experiment: an existing-customer rail, reschedules, pauses, restarts, extra cleans for households already on a recurring plan, because recurring cleaning both helps (frequency) and hurts (once scheduled, most visits need no new booking). Its cost math is sobering: at $2 per operation and 5% exception rates, the labor saved may not exceed the fee unless handling is genuinely heavy. That is a hypothesis to test, and it is cheap to test.

**A real red flag from Dots only:** Mindbody's published consumer-booking fees ($15 per location/integration plus $1.30 per class booking or $2.50 per appointment) can exceed a hypothetical $2 rail fee on its own. Upstream fees are a unit-economics gate, not a detail.

## What survives the cross-check, and the next move

Cleaning in Boston stays the first bet. But the sharpest, cheapest first experiment merges the packs: sign three cleaning operators already on one platform (Housecall Pro or Jobber), secure actual API access rights, and instrument existing-customer exceptions first, with new-customer acquisition as the second act once access and willingness-to-pay are proven. Dots' gates are worth borrowing wholesale: 90% of eligible operations completing without human intervention, 50%+ supplier handling-time reduction versus baseline, and at least one paid continuation before calling it validated.

The still-missing evidence is the live booking runs themselves. Muse offered to run them (its Cambridge plumber thread is the natural start) and Instinct offered a 15-provider static booking-surface audit. Run both next week: the audit measures where a rail can plug in, the live runs measure what actually breaks.

One process note: the three teams' own-history samples were all single-user and thin, so treat "convergence" here as three teams reasoning to the same answer, not three demand measurements. The prospective instrumentation Dots proposes (log every booking intent with a request ID before channel choice) is how the real numbers get built.

## Bottom line

Convergence on cleaning is real but judgment-based, the live validation everyone agreed to still has not run, and Dots' reframe, the gap is inventory access rights and unproven willingness to pay, not missing APIs, should reshape the pitch you take to operators and agent platforms alike.

---

## Frontier model playbook (what to do with Astra 6 / Fable 5.2)

I don't know those two model names specifically, so this is written for any frontier model with long context, browsing, and code execution. Six jobs, in priority order, each with the starter prompt to give it.

**1. Adversarial review of the thesis (highest value, do first).** Paste this pack plus the three raw team outputs and ask: "Red-team the booking-middleware thesis. Find every claim where the evidence is weaker than the prose implies, every contradiction between the four agents' accounts, and every place a motivated reading replaced a measured one. Output a numbered list of overclaims with the specific evidence gap behind each, then the three kill criteria that would falsify the wedge fastest." Do not let it summarize back what the pack says; the job is attack.

**2. Evidence audit and grading.** "Extract every factual claim and statistic across the pack and the raw outputs into a table. Grade each measured / documented / estimated / rumor / unavailable, name the source, and mark which claims the launch decision actually depends on. Flag every number no source in the material actually supports." This gives you the honest version of what you know before you spend money.

**3. Design the 30-day pilot as an executable protocol.** Dots wrote gates; have the model turn them into an operating plan: "Turn Dots' 30-day validation protocol into a week-by-week execution plan for a Boston cleaning-exceptions pilot: exact operator profile, the API-access ask to Housecall Pro and Jobber (written confirmation of rights, allowed use, customer ownership, payment responsibilities), the instrumentation schema for booking intents with request IDs, the baseline comparison design, and the go/no-go thresholds. Assume one founder, no engineering team, 30 days."

**4. Outreach and sales materials.** Three drafts in one pass: (a) cold email to a Boston cleaning-company owner (ask the three pricing questions: unfilled slots per week, cost of a no-show, what they pay Angi/Thumbtack per lead); (b) the partnership one-pager for an agent platform, leading with measured booking success and time-to-book numbers once the pilot produces them; (c) the API-access request email to Housecall Pro and Jobber partnerships teams. Have the model write these from the pack so the claims stay honest.

**5. Build the MCP prototype.** With code execution: "Implement the booking-rail MCP server skeleton from doc 1's tool surface against Housecall Pro's documented REST API and Jobber's GraphQL API, with the canonical booking state machine (Draft, Needs information, Offer ready, Awaiting user authorization, Held, Commit in flight, then Confirmed / Pending provider / Payment required / Waitlisted / Failed / Unknown outcome), idempotency keys on every write, timeout handling that treats unknown outcomes as unknown rather than retrying, and mock-provider tests for the double-book race and the stale-window case." Unknown-outcome handling is where prototypes are usually dishonest; make it test that specifically.

**6. Supply enumeration at scale.** Doc 2's fingerprint crawl, one weekend of counting: if the frontier model can browse, have it audit 100+ Boston cleaning providers' booking widgets (Housecall Pro, Jobber, Launch27, BookingKoala, MaidCentral fingerprints) and produce the provider-per-platform table that decides the city and the first integration. If it cannot browse reliably at that scale, have it write the scraper spec instead.

Sequencing note: 1 and 2 before anything else, because they cheaply protect every later step. 3 and 4 can run in parallel. 5 and 6 are the build bets the pilot's results justify or kill.


---

*End of master context pack. Raw third-party outputs (Instinct, Muse, Dots) accompany this pack as separate attachments in the same email.*
