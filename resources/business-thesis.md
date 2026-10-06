# Homebase business thesis

Working hypothesis · 2026-10-06

**Personal agents are becoming a new way people buy services. Homebase would make fragmented local businesses discoverable and reliably bookable through one interface, while those businesses keep using their own software.** The company would offer the same participating supply network to multiple consumer agents, rather than asking each agent to recruit and integrate every business itself.

## Why now

Personal agents are moving from answering questions to completing tasks. [Meta's Muse](https://ai.meta.com/tools/muse/) and [OpenAI's Dots](https://openai.com/index/introducing-dots/) launched in September 2026. [Instinct announced a $1 billion round](https://www.businesswire.com/news/home/20260928153437/en/), [Town a $55 million Series A](https://www.town.com/press/series-a), and [Hark more than $700 million](https://hark.com/articles/hark-announces-usd700-million-fundraising-round) for personalized AI. This shows activity and investor interest; agent-driven local bookings remain unmeasured.

Structured categories show what is possible: [Booking.com's partner API](https://developers.booking.com/demand/docs/getting-started/overview) supports travel search, availability and orders; [DoorDash has agent-ordering tools in limited beta](https://developer.doordash.com/en-US/mcp/); and [Gemini has previewed selected ride and food tasks through apps](https://blog.google/innovation-and-ai/products/gemini-app/android-multi-step-tasks/). Access varies, but structured inventory and a reliable transaction path help agents finish tasks.

Local supply is large and fragmented. [Harvard's 2025 housing report](https://www.jchs.harvard.edu/press-releases/remodeling-soars-new-heights-industry-struggles-address-labor-shortages-and-urgent) put U.S. home improvement and repair spending at **$611 billion in 2022** and projected it above $600 billion through 2025. That includes materials and large projects, so it is **not** Homebase's addressable booking market or a sizing estimate for cleaning. Other local categories include pet care, automotive service, beauty, wellness and tutoring.

Business software increasingly holds the supply-side data: [Jobber documents merchant-authorized API access](https://developer.getjobber.com/docs/getting_started/), while [MaidCentral documents a quote → availability → booking API flow](https://support.maidcentral.com/apidocs/online-booking-to-api-workflow). Digitization is uneven, as are supported booking actions.

## The gap

For many local tasks, an agent still searches listings and reviews, inspects websites, calls providers, and negotiates scope, price and availability. Consumers may not know which quote is appropriate. Agents can reason about options, but often lack permissioned, current service definitions and bookable capacity. Repeated calls make broad selection slower and more expensive.

Fragmentation spans **consumer agents**, **independent service businesses**, and **their varied booking software and optional front offices**. [Angi already offers instant booking in selected home categories](https://www.angi.com/landing/how-it-works). Homebase's proposed gap is a **shared, agent-usable route across providers**, whose coverage must be proven.

## What Homebase would build

One agent-facing API would let agents **discover, filter, quote, book and manage** participating providers. It would return supplier-approved scope, price and slots, then an accurate confirmed or pending status. Homebase would enroll each business, obtain authorization, connect its software and handle exceptions. The provider's system remains authoritative.

This is the “Stripe for local services” analogy: one integration for agents, many authorized businesses, standard transaction states. Service scope, pricing and fulfillment are harder than payments. A calendar may lack instant-booking rights; a front office may still approve the job. The product is **permissioned supply plus normalized booking operations and reliability**, beyond OAuth connections.

The proposed flywheel: more usable providers improve agent choice and completion; more agent demand attracts providers; completed jobs reveal matching and booking failures. It compounds only with repeatable onboarding, rights to use outcome data, and better completion. Wajo could integrate directly, so Homebase must provide coverage and execution worth its share.

## The first commercial proof

For a completed, paid **new-to-provider** job, test a supplier-funded acquisition fee shared with the agent company. The cleaner gets a profitable customer, the agent is paid for demand, and Homebase is paid for usable supply and execution. The fee and split are unagreed; Homebase's share must cover onboarding and support. Existing-customer changes require a separate business case.

Use a bounded residential-cleaning pilot in Boston **only if** an agent partner has actual requests there and one or two willing cleaners have capacity. Compare its existing process with Homebase on confirmed-booking time, agent token cost per completed booking, suitable choices, fulfillment, human intervention and total contribution. The proposed performance target for an eligible standard clean is **15 minutes → 1 minute or less; agent token cost indexed at 100 → 10 or less; better verified selection**. These are targets, not measured results. Include failed requests and ask both sides to continue at agreed economics.

**Decision:** pursue a network business if repeated demand, reliable bookings, positive unit economics and repeatable supplier onboarding make Homebase the preferred route for multiple agents. If value depends on constant manual rescue or one agent could cheaply reproduce the supply, the result may be a service or feature rather than a venture-scale company.

**Visual story:** agents are multiplying → travel/delivery have transaction rails → local service supply and software are fragmented → Homebase creates one permissioned booking route → faster, cheaper, better-matched outcomes. Show the supplier software and optional front-office layers beneath that story.
