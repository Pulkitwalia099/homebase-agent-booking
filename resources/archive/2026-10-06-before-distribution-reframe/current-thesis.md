# Agent booking questions integrations and pilot

Updated project copy: 2026-10-05. Source: [current working Page](https://chatgpt.com/space/page_af46a0758c0481918b30bebe2a884596). This is a local snapshot of the Page, not a live sync.

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

