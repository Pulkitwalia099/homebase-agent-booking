# Personal agent middleware opportunity and protocol assessment

Research checked October 6, 2026. This is a proposed strategic update for GoLocal/Homebase, reflecting the founder's focus on durable, venture-scale middleware for personal agents. The user-edited business thesis, Word/PDF and working Page remain unchanged.

Personal agents are expanding the ways people discover and purchase services. Execution still often involves fragmented websites, forms and calls. Uber, DoorDash and Booking.com illustrate the value of organized supply and reliable transactions. The new announcements suggest that businesses and agent platforms are now building common access and permission mechanisms themselves. That strengthens the market premise while narrowing the work an independent middleware company can defensibly own.

**Recommendation: pursue discovery for a vertical transaction execution business; do not commit to a generic connector, consent gateway or universal agent directory.** Keep local services as one candidate, alongside workflows outside local services. Choose a recurring, costly task with an identifiable buyer, permitted access and measurable outcomes. Neither protocol adoption nor a working integration establishes a venture-scale business.

## What the supplied updates establish

Both supplied X posts were read directly in the browser. The Decagon post's embedded video was not reviewed; its text and the linked primary documentation were read. The posts announce the same initiatives detailed below: [Decagon post](https://x.com/decagonai/status/2107544569340694705), [Sierra post](https://x.com/SierraPlatform/status/2107531483837862324).

| Development | Verified status on October 6 | Strategic implication |
| --- | --- | --- |
| Decagon and Instinct PACT | Public specification, open-source implementation and tests. PACT combines A2A with delegated authorization and action receipts. | Basic identity, consent and message plumbing are becoming reusable infrastructure. |
| Meta and Sierra Personal Agent Protocol | Announced with Genesys, Instinct, Rocket, Shopify, Stripe and Walmart. Sierra plans a v0.1 specification later in October. | Website, API and business-agent access may converge around common sessions; the announced design is not yet a published final standard. |
| Decagon Personal Agent Gateway | Product announced October 1 for identification, routing, permissions and resolution. | A generic gateway already faces a company with business-side distribution. The reviewed announcement does not establish uniform GA, pricing or measured production adoption. |

Sources: [Decagon PACT announcement](https://decagon.ai/blog/introducing-the-personal-agent-consent-trust-protocol-pact), [PACT specification](https://openpactprotocol.org/spec), [reference code](https://github.com/openpactprotocol/openpactprotocol), [Sierra announcement](https://sierra.ai/blog/introducing-personal-agent-protocol), [Decagon Gateway](https://decagon.ai/blog/personal-agents-are-here).

These are related efforts, not evidence of an entrenched standards war. Decagon explicitly says it is joining the Personal Agent Protocol working group. Instinct participates in both. A partner logo establishes participation in an announcement, not merchant coverage, live transaction volume or a commercial routing agreement.

Sierra describes guest access for public tasks and customer sign-in when account access is needed. Its proposed OAuth session spans web, API and company-agent channels. Finer permissions, notifications and payments extensions are future possibilities in the announcement. This is materially different from assuming every business interaction begins with a user finding and installing a marketplace plugin. It still leaves the business in control of available operations and the customer in control of authorization. [Sierra](https://sierra.ai/blog/introducing-personal-agent-protocol).

## What PACT solves and what remains

PACT separates the identity of the calling agent platform from its customer's permission. A customer authenticates with the business and approves scopes; the resulting grant is specific to that agent, customer and brand. More permission can be requested during the conversation. The business's agent executes under business policy. Signed receipts record authorized actions. [Decagon's walkthrough](https://decagon.ai/blog/introducing-the-personal-agent-consent-trust-protocol-pact).

Several details matter commercially. Registration is per provider; it does not confer access to every merchant. Providers can restrict accepted agents. Brands define their own scopes. The specification does not define a universal discovery registry or shared vocabulary for every commercial action. It already specifies handling repeated message IDs, and its repository includes conformance tests. A new company should not mistake elementary retries, receipts or protocol testing for untouched territory. [Normative specification](https://openpactprotocol.org/spec), [repository](https://github.com/openpactprotocol/openpactprotocol).

**Inference:** a signed record that a tool ran is not independent evidence that the customer's intended outcome occurred. An airline cancellation and a refund reaching the traveler can be different steps. A protocol session also does not coordinate all the consequences of changing a flight, hotel and rental car. Those business semantics, reconciliation and exceptions are a more promising place to investigate. They are not automatically missing from every incumbent product.

For example, Duffel already documents cancellation quotes and confirmation. Its documentation says money returned to the seller's payment method can still require a separate refund to the customer. That is a concrete distinction between an API operation and the customer's completed outcome, while also demonstrating how much travel infrastructure already exists. [Duffel cancellation documentation](https://duffel.com/docs/api/order-cancellations).

## Proposed changes to our thesis

| Earlier emphasis | Proposed update | Evidence still needed |
| --- | --- | --- |
| Personal agents need connectors to fragmented businesses | They need permitted, dependable completion; connection standards may be supplied by platforms | Tasks that remain costly after standard access is available |
| Win demand through plugin distribution or an agent partnership | Also investigate distribution through software vendors and transaction intermediaries that already serve businesses | A partner willing to embed the workflow and pay or route production requests |
| Local service booking is the starting product | Local services is one candidate; compare it with other repeatable transaction workflows | Recent task examples, an accessible buyer, production rights and willingness to pay |
| Integration breadth is a potential moat | Favor domain rules, operational state, outcome evidence, distribution and repeatable onboarding | Reuse across customers and retention after direct access becomes easier |
| A personal-agent company might outsource integration | It might outsource an expensive operational outcome | A concrete buy-versus-build decision with a budget owner |

The earlier Instinct research found no public listing or recommendation rules. Today's participation in PACT and Personal Agent Protocol adds substantial interoperability evidence. It does **not** disclose Instinct's recommendation algorithm, grant a GoLocal integration, or prove it will route tasks to us.

For local services, organized, authorized supply may retain value even when connections become easier. But if vertical software companies expose complete booking and change operations across their customers, the integration advantage shrinks. Conversely, fragmented scope, actual capacity, acceptance and service recovery may remain hard. We need evidence about those operations, not an assumption that agent companies will avoid all local integrations.

## Where the infrastructure is already occupied

| Layer | Primary evidence | Consequence for a new company |
| --- | --- | --- |
| Enterprise agent ingress and policy | [Decagon Gateway](https://decagon.ai/blog/personal-agents-are-here) | A broad gateway pitch overlaps an incumbent product and its customer channel. |
| Identity, delegated credentials and policy | [Auth0 Agent Gateway beta](https://auth0.com/blog/auth0-agent-gateway-beta/) | Auth0 covers organization-aware access, credential handling, policy and audit for customer-facing SaaS agents. This is adjacent infrastructure, not identical to personal-agent ingress. |
| Tool connections and routing | [Composio tool router](https://docs.composio.dev/reference/api-reference/tool-router/postToolRouterSession) | Generic tool discovery, connected accounts and connection management are existing capabilities. |
| Durable execution and human waits | [Temporal Durable AI](https://docs.temporal.io/ai) | Generic recovery, persistent workflows and approval waits are building blocks to use; wrapping them alone offers little differentiation. |
| Checkout and order lifecycle | [Stripe ACP](https://docs.stripe.com/agentic-commerce/acp) | Payments, delegated authorization and lifecycle webhooks are already within commerce infrastructure. |
| Catalog, purchase and postpurchase | [Shopify agent documentation](https://shopify.dev/docs/agents) | Shopify documents order management and lifecycle events. Universal Cart is early access; basic postpurchase tracking is not unexplored space. |
| Agent identification on the web | [Cloudflare agent registry](https://blog.cloudflare.com/agent-registry/) | Signature verification and agent discovery have established infrastructure participants. Agent identity is distinct from end-customer authorization. |

Stripe's broader protocol and payment capabilities do not establish that every transaction category is permitted in ChatGPT plugins. Keep each host's commercial and distribution policies separate, as covered in the [connector research](../connector-distribution-2026-10-06/research.md).

## Opportunities to investigate

This ranking uses five criteria: recurring economic pain, a reachable budget owner, access to real operations, reuse across customers, and resistance to being bundled by a platform. It is a judgment for customer discovery, not a measured market score or validated ranking of sectors.

| Priority | Hypothesis and first buyer | What we would actually own | What could defeat it |
| --- | --- | --- | --- |
| 1 | A vertical transaction execution and reconciliation service; sell to an agent platform, vertical software company or transaction intermediary | Domain-specific state, policy interpretation, permitted execution, verification, exceptions and reconciliation across providers | Low volume; a single incumbent already completes the workflow; buyer will not pay above API costs; delivery remains bespoke |
| 2 | Embedded agent access for an underserved vertical software vendor | Translate supported operations into useful agent tasks, enforce account boundaries and return reliable business outcomes through that vendor's existing distribution | The vendor adds it cheaply; implementation varies per merchant; gateway incumbents supply the same outcome |
| 3 | Independent transaction assurance across providers | Test real outcomes, reconcile mismatched records and payments, investigate failure patterns and supply evidence to operations teams | Becomes a small observability feature; no independent data rights; protocol checks are sufficient for the buyer |

These can be stages of one business. Start by completing a valuable workflow, add reconciliation and assurance because customers need them, and expand into adjacent operations. Starting with an abstract universal control plane risks building before identifying a budget.

### Candidate workflows beyond local services

**Travel changes and disruption recovery:** investigate changing a trip while coordinating airline, hotel and rental-car consequences, fees, credits and refunds. Potential buyers include travel intermediaries and personal-agent platforms. Existing Duffel change/cancellation APIs show both usable infrastructure and serious incumbent coverage. The wedge must be a demonstrated gap across the full journey, not a flight-booking wrapper. Partner access, seller responsibilities and permission to operate require diligence before implementation. [Duffel changes](https://duffel.com/docs/api/v2/order-changes).

**Complex returns, warranties and claims administration:** investigate cases involving proof of purchase, product eligibility, manufacturer/retailer responsibilities, shipping and eventual settlement. A personal agent can initiate the task while an operational buyer funds reduced handling cost. Ordinary order tracking, cancellation and refunds are already covered in commerce platforms; the unproven wedge is the difficult exception spanning multiple parties. Interview existing returns/service operators before assuming white space. [Shopify](https://shopify.dev/docs/agents), [Stripe ACP](https://docs.stripe.com/agentic-commerce/acp).

**Property and household coordination:** a move or maintenance incident can involve property management, access, appointments, vendors and evidence of completion. The buyer might be property software or an operator, giving access to existing demand. This is adjacent to GoLocal but changes the commercial hypothesis from supplier-funded customer acquisition to paid coordination. It may become vertical software rather than broad middleware; evaluate that outcome honestly.

**Freight and logistics exceptions:** potentially relevant to multi-company execution, but this is principally a business-agent opportunity rather than a personal-agent one. Keep it as a separate comparison if the founder wants the broader agent infrastructure market. This research did not establish its current competitive landscape or buyer access, so it should not displace a better-evidenced consumer workflow yet.

The first three are a discovery shortlist. No claim is made that they are underserved or that we have a right to execute transactions in them. Choose the workflow where the founder can obtain actual cases and an accountable buyer, rather than the largest top-down market number.

## What could make the business durable and large

An open protocol does not entitle an intermediary to a fee. Every transaction needs a reason to keep us in the path: reduced operating cost, better completion, difficult counterparties, reconciled outcomes or useful authorized supply.

Durability could come from reusable domain rules and integrations, accumulated operational state customers depend on, measured failure recovery, distribution through software partners, and permissioned outcome data that improves execution. None is established here. Nonexclusive APIs, prompt templates and a large connector count are weak evidence of defensibility. Data becomes an advantage only with contractual rights, quality and useful feedback.

Commercially, test a software subscription plus usage or a fee for resolved workflows. Price against the buyer's avoided cost and value of completion. An acquisition fee for bringing a new customer is a different product; do not mix its economics with changing an existing customer's booking.

For scale intuition only, $100 million annual revenue would require 500 customers paying $200,000 per year, or 100 million annual workflows generating $1 revenue each. Those are arithmetic scenarios, not forecasts, market estimates, prices or margin claims. A proposed wedge should have a credible route to sufficient customers or volume, after support, partner fees, integration maintenance and transaction losses.

| Observed outcome | Honest business classification |
| --- | --- |
| A helpful connector that a host can cheaply bundle | Useful feature |
| High fees but repeated custom engineering and manual exception handling | Service business |
| Reusable workflow, recurring paid customers and strong retention in one sector | Potential vertical software business |
| Repeatable adoption across a large buyer base, expansion, attractive delivery economics and a reason to stay in the transaction path | Candidate venture-scale middleware business |

**Pursue:** a narrow workflow whose operational burden persists after connection standards improve. **Do not pursue as the current venture thesis:** a protocol wrapper or generalized consent/connector layer without a distinct buyer and measurable advantage.

## Evidence to obtain before choosing the product

For each shortlisted workflow, inspect recent real cases with the person accountable for cost and outcomes. Record request frequency, current completion, elapsed time, human work, failure/recovery cost, supported systems and where authority is granted. Separate firsthand records from estimates.

Then test one bounded workflow through permitted access, including uncertain responses and downstream reconciliation. Compare total delivery cost and completed outcomes with the buyer's current process. Require evidence of recurring eligible requests, reusable delivery and paid continuation before expanding. An enthusiastic interview or successful demo alone does not clear that bar.

A particularly useful question for Instinct, Muse or another agent builder is: “Which recent customer tasks still fail or require people even when the business supports standard authorization and an API? Which of those would you pay another company to complete?” This is a proposed diligence question, not an authorized outreach action.

## Monitoring and decision rules

The accompanying [monitoring plan](monitoring-plan.md), [watchlist](watchlist.csv) and [evidence ledger](evidence-ledger.csv) turn news into specific decisions. Recommended cadence: a weekday material-change scan, a weekly decision brief and a monthly thesis review. No recurring automation or newsletter subscription has been activated.

The most immediate checkpoint is whether Sierra publishes the planned v0.1 specification by the end of October. More consequential signals are independently implemented protocols, named production workflows, disclosed successful-action volumes with denominators, paying customers and explicit distribution or access changes.

Do not treat funding, GitHub stars, directory listing counts, web crawler traffic or co-announcement logos as customer demand. Preserve an evidence ladder: announcement → specification/code → documented availability → named deployment → measured production outcome → independently corroborated commercial evidence. These are categories, not an assertion that every business must expose public metrics.

Update the thesis only when the evidence changes a decision: target buyer, task, access, distribution, pricing, competitive advantage or pursue/no-pursue. A new protocol extension can be valuable engineering news without changing the commercial thesis.

## Research coverage and limits

Exa searches requested 55 result slots across four research areas: the supplied protocol announcements; adjacent infrastructure and competitors; operational gaps and candidate workflows; and monitoring signals. They returned 55 URL rows, deduplicated to 52 distinct search URLs. Relevant primary pages were fetched for verification; unrelated search hits were excluded from conclusions. Direct reads and the two browser-read X posts supplement those counts. The preceding connector-distribution report supplies platform-specific discovery research.

Primary documentation establishes the announced design, published interface or vendor-reported product capability. It does not establish broad deployment, paid demand for this company, completed production reliability or an uncontested market. The opportunity rankings and proposed thesis changes are our inferences from that evidence.
