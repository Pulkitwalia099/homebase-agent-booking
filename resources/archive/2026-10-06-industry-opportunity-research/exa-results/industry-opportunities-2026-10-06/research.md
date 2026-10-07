# Where to build middleware for personal agents

Research checked October 6, 2026. U.S. market assumed for initial investigation, consistent with the existing project. Examples below are hypothetical customer journeys. Product capabilities are supported by primary documentation; proposed opportunities, buyers, pricing structures and rankings are hypotheses.

## The implication in plain language

Personal agents give people another way to ask for a service. Businesses still need to decide what is available, who can buy it, what it costs, who may approve it and whether it was actually delivered. Uber, DoorDash and Booking.com illustrate the value of organizing supply and transactions. Agent protocols make communication easier; the underlying commercial work does not automatically disappear.

PACT provides a common way to identify an agent and verify a customer's permission. The proposed Personal Agent Protocol spans websites, APIs and company agents. Their existence makes a startup built only around connecting two agents harder to distinguish. Neither announcement gives an independent startup access to every business, resolves all business rules, or guarantees a completed transaction. [PACT](https://decagon.ai/blog/introducing-the-personal-agent-consent-trust-protocol-pact), [Personal Agent Protocol](https://sierra.ai/blog/introducing-personal-agent-protocol).

The business to investigate would let an agent request a complete industry task: get an authorized appliance repair, complete a supported travel change, or arrange a clinician-ordered appointment. Behind that interface, the company would manage necessary permissions, participating providers, business rules, progress and exceptions. It would return an accurate result, including unresolved steps. The interface can be an API while the underlying advantage is operational access and dependable completion.

There are two related models. A transaction network organizes participating suppliers and makes their offers usable, as GoLocal proposes. A workflow provider completes a recurring task using existing suppliers and systems. The second often has an existing business buyer whose operating costs can justify a fee. Both can become middleware; both can also become expensive service businesses if each customer requires custom work.

**Recommendation:** investigate appliance/after-sales repair coordination and a tightly bounded travel-servicing task first. Healthcare administration is worth exploring only with an experienced operating partner. Do not build a general-purpose version of all three. Broad property maintenance, ordinary returns and utility purchasing already face substantial product coverage; investigate a specific documented gap or partnership before entering them.

This is an order for discovery, not a claim that appliance repair is a validated superior market. A buyer with recurring cases, permitted access and budget should outrank an attractive sector without those assets.

## The closest existing model to study

Updater explicitly positions itself as infrastructure for apps, websites, call centers and AI agents to discover and purchase complex services. Its site describes address-level availability, eligibility, provider-specific rules and operational steps across categories such as internet, utilities and home security. This is unusually close to the founder's stated ambition. [Updater](https://updater.com/).

The lesson is that middleware may need commercial relationships and the ability to transact, not merely software adapters. A consumer can ask for internet at a new address, but someone must establish which offers are actually available, which customer qualifies, which terms apply and whether installation and activation happened.

Updater's positioning is also competitive evidence. It would be a mistake to present generic moving or utility setup as untouched territory. Its historical PG&E partnership illustrates business-side distribution: people starting utility service were offered complementary household services through the partner's existing channel. That is a documented historical arrangement, not a claim about current partnership scope or economics. [PG&E partnership announcement, 2017](https://updater.com/blog/updater-partnership-pge/).

Study its structure: aggregate usable supply, distribute through companies that already have customers, and support the actual purchase. Do not infer our unit economics or current agent usage from its company-wide claims.

## 1 Appliance and after-sales repair

### The industry and the problem

After-sales service is the work required after someone buys a physical product: warranty support, diagnosis, repair, replacement and sometimes reimbursement. A large appliance is a useful example because its repair may involve a home visit, particular parts, an authorized technician and a party other than the homeowner paying the bill.

A customer says, “My dishwasher has stopped working. It might still be covered. Arrange the repair and tell me what I need to pay.” There may be several different questions: who sold it, which coverage applies, which provider can service it, who authorizes the work, whether the part is available, and who pays the technician. Establishing the customer's permission to ask is only the first step.

The coordination problem is real enough to have established software buyers. ServicePower's Electrolux case study describes scheduling, dispatch, claims management and customer visibility as needs addressed by its products. This is vendor-reported evidence of an existing market, not evidence that its customers still have an unsolved problem for us. [Electrolux case study](https://www.servicepower.com/hubfs/Electrolux%20Case%20Study-1.pdf).

### Value chain and money

| Participant | Role | Economic interest |
| --- | --- | --- |
| Customer or household agent | Reports failure, supplies purchase/product details, approves access and any customer charge | Working appliance and predictable inconvenience/cost |
| Retailer or manufacturer | Has purchase or product records and may owe service under the applicable arrangement | Customer retention and lower support/service cost |
| Protection-plan or warranty administrator, where applicable | Checks contract eligibility and authorizes covered work | Apply agreed coverage and control claim cost |
| Dispatch platform or service network | Routes the job to an appropriate participating servicer | Network utilization and service performance |
| Repair business and technician | Diagnoses, estimates and performs work | Accept profitable jobs and get paid promptly |
| Parts supplier | Supplies the required component | Parts revenue and fulfillment |
| Responsible payer | Manufacturer, plan administrator or customer depending on the case | Correct payment for authorized completed work |

The exact structure varies. A manufacturer's warranty, a retailer's guarantee and an independently sold protection plan are different arrangements. Do not assume all parties participate in every case or that eligibility can be inferred from a receipt alone.

### Potential product

Offer a supported repair-request service to a participating retailer, service network or manufacturer. It could collect the right evidence, obtain an eligibility decision from the responsible party, identify an authorized servicer, coordinate the visit, track parts and approvals, and verify completion and payment status. It should preserve which party made each decision rather than inventing coverage or diagnosing a defect on its own.

A narrow first task could be processing incomplete repair requests that a particular buyer currently sends back for missing model numbers, evidence or authorization. Another could be resolving jobs stalled between an authorized estimate and a scheduled return visit. These are candidate tasks to find in an actual work queue; public research has not established their volume or that existing software fails to handle them.

The personal agent could be one entry point. Retailer support staff and a website could use the same backend today. Revenue from those channels would validate the workflow business; it would not by itself prove personal-agent demand.

### Existing suppliers and the remaining question

ServicePower already covers scheduling, dispatch, claims and contractor reimbursement. Its servicer APIs support claims, work orders, pre-authorizations and statuses. Servify connects product-lifecycle participants and exposes permissioned APIs. Rossware already connects repair businesses to multiple dispatch and warranty systems and automates status exchange. [ServicePower capabilities](https://www.servicepower.com/solutions/overview), [servicer APIs](https://intercom.help/servicepowerhub/en/articles/9617481-servicer-api-integrations), [Servify](https://integrations.servify.com/), [Rossware](https://www.rossware.com/integrations).

Therefore, a claim-filing adapter or generic multi-brand dispatch connector is insufficient differentiation. The question is whether a reachable buyer has a recurring class of incomplete or stalled jobs that these products do not resolve economically, and whether the same solution can serve several buyers.

### Buyer, distribution and where to look

Start with heads of after-sales/customer care at regional appliance retailers or product brands, operations leaders at service networks, and owners of repair businesses that work for several brands. A retailer or network can bring existing cases and counterparties, reducing the need to acquire households individually.

Proposed commercial model: software subscription plus a fee for a resolved case, benchmarked against avoided handling cost. The repair bill is not our revenue. Parts and technician payments are pass-through or supplier economics unless explicitly part of our contract. Avoid assuming a percentage of every repair is available to us.

Ask to trace recent delayed and rejected cases through existing software. Find the most repeated reason work stops, who spends time on it, who can authorize us, and whether resolving it saves a budget owner enough to pay. Reject the wedge if an existing feature fixes the issue cheaply, the cases are mostly unique, or physical repair capacity rather than coordination is the bottleneck.

**Judgment:** first discovery priority because it combines a consumer task with business-side service expenditure and several participants. It may become a strong vertical software business. A broader middleware case requires reusable coverage and distribution across multiple organizations, not simply a repair concierge.

## 2 Travel servicing after purchase

### The industry and the problem

Travel servicing is what happens after a booking: changing dates, dealing with cancellations, using credits, reissuing tickets and following refunds. The seller can be an airline, online travel agency, corporate travel company or bank travel portal. A technology provider may connect that seller to airlines through distribution systems or airline APIs.

A traveler says, “My outbound flight was cancelled. Move my trip to tomorrow, preserve my return flight, and adjust the hotel.” The journey sounds like one task, but the reservations may have different owners, rules and payment paths. Some actions are irreversible or change the price of later steps. The system needs an approved plan, correct sequence and a clear account of what did and did not complete.

### Value chain and money

| Participant | Role | Economic interest |
| --- | --- | --- |
| Traveler or personal agent | States preferences and approves changes/costs | Preserve the purpose of the trip with minimal disruption |
| Travel seller or corporate travel manager | Owns the customer relationship and services supported bookings | Booking revenue, account retention and lower service cost |
| Distribution/aggregation provider | Makes supplier content and supported operations available | Contracted software or transaction revenue |
| Airline, hotel and car company | Supplies service and applies its own change/cancellation conditions | Revenue, utilization and policy compliance |
| Seller/payment/refund operations | Charges differences and returns money or records credits | Accurate financial settlement |

Money can move through different participants. Duffel documents cases where a cancellation refund returns to the seller's payment method and the seller must separately refund the customer. Checking that both happened is what “reconciliation” means here. [Duffel cancellations](https://duffel.com/docs/api/order-cancellations).

### What makes the task hard

APIs already perform many changes. The difficulty can include unsupported actions, changing prices, carrier-specific rules and booking control. Duffel exposes which actions an order supports; its airline-change documentation describes cases requiring direct resolution. Travelport's NDC FAQ warns that changing certain bookings on the airline site transfers ownership and breaks subsequent updates through Travelport. This is evidence that accessing the right channel matters, not a rule that all travel bookings behave identically. [Duffel changes](https://duffel.com/docs/guides/changing-an-order), [airline-initiated changes](https://duffel.com/docs/api/v2/airline-initiated-changes), [Travelport servicing](https://support.travelport.com/webhelp/smartpointcloud/content/spc/NDCFAQs-Service.htm).

Customer consent alone does not establish an integration's commercial authority to service arbitrary bookings. A viable first product should operate through a seller's permitted systems and supported booking population.

### Potential product and competition

A first product might resolve one seller's recurring refund or schedule-change exceptions, with correct record updates and financial follow-through. It would expose a structured task to the seller's staff and authorized personal agents. It should begin with a defined carrier/source/task combination, rather than promising to rearrange any trip booked anywhere.

The broad version is strongly contested. TPConnects Iris already offers aggregated booking, changes, refunds and disruption handling. Spotnana describes APIs, automated servicing and specialized AI agents for tasks including refunds and schedule changes, with an architecture partners can extend. HTS sells travel infrastructure, disruption products and AI servicing to airlines and banks. [TPConnects](https://tpconnects.com/iris-travel-seller-solutions/iris-api/), [Spotnana](https://www.spotnana.com/blog/introducing-spotnanas-ai-architecture/), [HTS](https://hts.hopper.com/).

### Buyer, distribution and where to look

Look inside a travel seller's servicing and refund operations. Ask the head of operations, ticketing/refund supervisor and technology owner to show which cases still leave their existing automation and why. A partner seller can provide both recurring tasks and valid access. A personal-agent company may be a buyer, but its rights to act across booking channels must still be resolved.

Proposed pricing is a subscription or per-resolved-task fee against avoided support and processing cost. A refund reaching the customer is not revenue to us. Do not assume ticket commissions, cancellation penalties or recovered funds can be treated as our fee pool. Do not take on reimbursement guarantees as an incidental feature; that changes the business materially.

Reject the opportunity if the seller can enable the same workflow in its current platform, if we cannot service the relevant bookings, or if around-the-clock human handling overwhelms software economics.

**Judgment:** investigate second, and only with a seller willing to expose a real unresolved work queue. The public evidence supports a substantial existing servicing category and intense competition. It does not support a generic “AI travel middleware is missing” claim.

## 3 Healthcare appointment and referral administration

### The industry and the problem

This candidate concerns administrative follow-through after a clinician has decided what care is needed. A referral is a request from one clinician for another service or specialist. Successfully sending the referral does not necessarily mean the receiving practice has accepted it, the insurance requirements are satisfied, or the patient has a usable appointment.

Imagine: “My doctor referred me for an appointment. Find a participating location with an acceptable time, make sure it has the required paperwork, and confirm the booking.” The product should help execute the clinician's request and surface missing requirements; it should not choose treatment or claim a final coverage determination itself.

AHRQ's referral guidance explicitly covers information exchange, insurance participation, prior approval when required, appointment assistance and returning information to the referring clinician. It supports the multi-party problem, without measuring a new startup's addressable market. [AHRQ referral guidance](https://www.ahrq.gov/health-literacy/improve/precautions/tool21.html).

### Value chain and money

| Participant | Role | Economic interest |
| --- | --- | --- |
| Patient or authorized assistant | Shares preferences and permitted information | Obtain the ordered care with understandable cost and timing |
| Referring practice | Sends clinical order/referral and required records | Appropriate follow-through and less administrative chasing |
| Receiving practice or facility | Checks requirements and schedules the correct visit | Suitable appointments and usable capacity |
| Health plan and relevant administrators | Supply applicable benefit, network and authorization information | Covered, appropriate care and administrative efficiency |
| Electronic health record, scheduling and navigation vendors | Hold records and provide supported access/workflows | Software and service revenue |

The patient, medical provider and insurer can each bear different portions of the cost of care. Our hypothetical buyer pays for administrative software or completed coordination, not for a claim that we can guarantee insurance payment.

### Potential product and existing infrastructure

A bounded product could help a participating specialty group or navigation company turn incomplete incoming referrals into accepted, correctly scheduled appointments, with the approved records attached and status sent back. Start with one service and partner network. It must distinguish an appointment request from insertion into the clinic's authoritative system and from the patient actually attending.

NexHealth documents appointment creation, confirmation and cancellation, and explicitly warns that creation is asynchronous: an insertion webhook reports completion or failure. H1/Ribbon exposes eligibility and benefit information. Kyruus supplies provider-network discovery and scheduling capabilities. These are substantial existing components, not universal access to all providers. [NexHealth](https://docs.nexhealth.com/reference/appointments-1), [H1/Ribbon](https://ribbon.readme.io/docs/eligibility-check), [Kyruus](https://kyruushealth.com/solutions/kyruus-network-for-plans/).

A potential advantage would have to arise from actually completing a difficult administrative handoff across participating organizations. A provider directory or appointment API wrapper is unlikely to be enough. The competitive landscape of complete referral-management products requires further buyer-specific diligence before selecting this category.

### Buyer, distribution and where to look

Begin with referral coordinators and patient-access leaders at a provider group, or operations/product leaders at an established navigation company. Ask for referral cases that were abandoned, bounced back or delayed, and the specific administrative reason. The provider's own workflow can distribute the product; selling it to consumers first adds demand generation and provider-access problems simultaneously.

Health-information obligations depend on the service's actual role and relationships. HHS distinguishes a patient-designated app receiving data from a service acting on behalf of a covered entity; the latter can require a business associate agreement. Permission from a user is not a substitute for evaluating the operating arrangement. [HHS guidance](https://www.hhs.gov/hipaa/for-professionals/faq/3013/does-hipaa-require-a-covered-entity-to-enter-into-a-business-associate-agreement.html).

Measure accepted referrals, confirmed appointments, completion delays, staff effort and appropriately handled exceptions. Reject a first product if the dominant bottleneck is unavailable clinical capacity, the workflow requires us to make clinical decisions, or the necessary partnerships are unavailable.

**Judgment:** meaningful problem, but a conditional third priority requiring an experienced domain partner. It is an administrative healthcare business with personal-agent access as a possible channel. Technical documentation alone does not make it an easy infrastructure entry point.

## 4 Property maintenance coordination

### Problem and value chain

A resident reports a broken appliance or leak. The property manager needs to identify the right responsibility, obtain owner approval when necessary, dispatch an eligible vendor, arrange resident access, verify work and process the invoice. The chain is resident → property manager → owner/approval rules → maintenance vendor → property accounting. The property manager usually coordinates; the owner or responsible party pays the repair cost according to the arrangement.

An agent-accessible backend could let a resident's assistant submit a complete request, coordinate availability and track completion. The likely buyer is the property manager or its software provider, because it handles recurring requests across many homes. The outcome is lower coordination cost and completed work, distinct from acquiring a new cleaning customer.

### Why the broad opportunity is weaker than previously suggested

Latchel now advertises intake, troubleshooting, dispatch, scheduling, follow-up and invoice review, including policy/approval rules. Property Meld's AppFolio integration covers resident/vendor/owner communication, scheduling, approvals and bills. These vendor descriptions establish competitive coverage; their claimed automation rates are not independent benchmarks. [Latchel](https://latchel.com/property-management-maintenance-software/), [Property Meld and AppFolio](https://www.appfolio.com/partners/propertymeld).

AppFolio also operates a reviewed partner program. A listed integration and public API categories do not mean automatic access to every manager's portfolio. [AppFolio partner program](https://www.appfolio.com/stack/become-a-partner).

Look at managers' remaining exception queues, but do not pitch generic scheduling and chasing as novel. A product focused on a demonstrated expensive failure or new distribution partnership could still work. **Judgment:** useful accessible research comparison, but downgrade broad maintenance orchestration as a standalone recommendation. It is already a developed vertical software market.

## 5 Moving internet and utility setup

### Problem and value chain

A person moving home wants internet and relevant utilities active on the correct dates. The chain is mover → property/relocation/distribution partner → address and offer qualification → internet/utility supplier → installation or activation → billing. Not every utility is competitively selectable, and technical availability at an address differs from a completed order.

A potential backend would determine eligible offers, collect required customer information, place a permitted order, coordinate installation and report verified activation. A distributor with a moving audience or a supplier acquiring customers could pay under a negotiated arrangement. Acquisition compensation and ongoing account administration are separate hypotheses.

Updater already markets this infrastructure to apps and agents and offers complementary services through business partners. Arcadia and UtilityAPI provide other utility data capabilities; access to billing/usage data alone does not establish permission or an endpoint to start, stop or switch service. [Updater](https://updater.com/), [utility partner offering](https://updater.com/solutions/utilities/), [UtilityAPI endpoints](https://utilityapi.com/docs/api), [Arcadia Connect](https://platformsupport.arcadia.com/hc/en-us/articles/30724399288347-Connect-Unlock-your-customers-utility-provider-data).

**Judgment:** an excellent existing business model to study, and potentially a supplier/partner for a differentiated workflow. Avoid launching a general clone without exclusive or unusually useful distribution, supply or coverage. The most valuable diligence is which transactions these existing platforms cannot fulfill for a specific audience, not whether moving is annoying.

## Other sectors screened

| Sector | Problem and chain | Existing evidence | Recommendation |
| --- | --- | --- | --- |
| Ordinary returns and product-quality warranties | Shopper → merchant policy → return carrier/warehouse → exchange/refund systems; merchant pays for processing and bears relevant return costs | Loop supports warranty policies and cross-platform commerce integrations, including outgoing outcome execution. [Warranties](https://help.loopreturns.com/en/articles/1918209), [Loop Anywhere](https://docs.loopreturns.com/integration-guides/loop-anywhere) | Downgrade generic returns automation. Physical repair coordination is a different workflow and must be validated separately. |
| Routine auto service | Driver → service marketplace/shop → technician and parts → authorization/payment; shop wants profitable booked work | Openbay supplies estimates and confirmed service appointments plus partner programs; RepairPal documents API distribution through FIXD. [Openbay](https://app.openbay.com/), [partners](https://app.openbay.com/partner-with-openbay), [RepairPal case](https://blog.repairpal-partners.com/news/fixd-repairpal-case-study/) | Existing organized supply may be a partner. A new booking wrapper needs a distinct channel or missing operational capability. |
| Collision repair | Driver → insurer/repairer → estimate and approval → parts → repair/payment; insurers and repair networks already buy workflow infrastructure | CCC connects estimates, insurers, parts and payments. [CCC network](https://www.cccis.com/collision-repairers/estimating/repair-network), [payments](https://www.cccis.com/collision-repairers/payments) | Do not confuse this with routine service booking or assume the network is missing. |
| Freight exceptions | Shipper → forwarder/broker → carrier → consignee, with customs/documents/payments alongside; operations teams pay to reduce delays and handling | project44 markets agent workflows for carrier contact and exception resolution. FourKites' reviewed document-exception page explicitly labels that particular outcome as in active development. [project44](https://www.project44.com/ai-agent-orchestration/agentic-workflow-manager/), [FourKites](https://www.fourkites.ai/outcomes/autonomous-document-exception-resolution) | Separate B2B agent market. Do not broaden into it solely because its workflows have many participants. |

## Where to go looking first

The best source of product ideas is a repeated work queue with an accountable owner. Ask operators to show what staff actually do after their existing software has done everything it can. Relevant places are after-sales service desks, travel-servicing/refund teams, referral coordinators and maintenance exception teams. Technology vendors are also useful interview subjects, but a vendor's API cannot establish a customer's willingness to pay.

| Priority | Person to learn from | Ask them to show | First product decision |
| --- | --- | --- | --- |
| 1 | Retailer/brand after-sales leader and multi-brand repair operator | Delayed repair jobs, bounced authorizations, repeated visits and incomplete payment cases | Is there one recurring fix spanning customers and systems? |
| 2 | Travel seller operations leader and ticketing/refund supervisor | Tasks outside current automation, actions supported on those bookings and financial follow-through | Can we own a bounded case type with valid access? |
| 3, conditional | Healthcare referral/patient-access leader with a domain partner | Incomplete, rejected and abandoned administrative referrals | Can we complete a nonclinical handoff inside a participating network? |
| Comparison | Property manager maintenance lead | Exceptions remaining after Latchel/Property Meld/current tools | Is the gap real, costly and reusable or merely a configuration issue? |

Use the same questions in every category: What request started this case? Which party could act next? Why did it stop? Who chased it? How much work and cost resulted? What tools already exist? What permissions would a new provider need? Which budget would buy the improvement? Would the buyer pay for the result on the next batch?

Ask agent companies a complementary question: which customer tasks do they repeatedly fail to finish even when the relevant business offers an API or business agent? Compare their examples with the operating companies' queues. A matching failure on both sides is stronger evidence than either side's opinion alone. No outreach is authorized or performed by this research.

## From a useful workflow to venture-scale middleware

The first reusable unit is a complete, narrow task with an observable result. From there, the company could expand to adjacent tasks, additional business systems, more counterparties and multiple demand channels. Personal agents would become another source of work rather than the only possible source of revenue.

The durable advantage would have to survive better models and easier connections: valuable authorized supply, reliable domain rules, operations customers rely on, lower failure costs and distribution. Historical data helps only when we have rights to use it and it improves outcomes. APIs and prompts alone are not sufficient evidence of a moat.

There is no automatic network effect. Each new participant must improve useful coverage or outcomes for the others. If every new customer needs a unique implementation, growth may simply add service labor. If a platform can incorporate the product for little cost, it may remain a feature. If a repeatable workflow sells and retains customers in one industry, that can be a good vertical software business even before a broad infrastructure story exists.

For each candidate estimate reachable paying organizations × expected annual revenue per organization, then subtract support, integration maintenance, partner fees and any transaction/recovery costs. Do not use total travel spending, healthcare spending or repair bills as our revenue opportunity. The current research establishes no measured startup pricing, paid continuation or addressable fee pool.

**Decision now:** investigate a small number of actual operating queues before building. Start with repair/after-sales and travel servicing unless existing relationships give materially better access elsewhere. Commit to one workflow only when a buyer has recurring cases, can authorize access and will pay for an outcome its current providers do not deliver economically.

## Evidence and research scope

This pass used 97 requested Exa result slots across 23 search angles, followed by direct reads of relevant primary pages. Some searches returned extra or repeated URL references, so result slots are not a count of independently verified sources. Third-party generated API catalogs appeared in several searches; they were not used to establish technical access or product capabilities. Raw research output is preserved in source-captures.json.

The assessment changes the earlier broad suggestions: ordinary returns and general property maintenance receive lower priority; travel and appliance repair are explicitly conditional on an unsolved task and commercial access. No sector is established as uncontested. Vendor documentation shows interfaces and claimed product coverage; vendor case studies show named reported implementations; neither measures our demand or proves a gap.

This is a new supporting research document. Previous evidence, the user-edited thesis, Word/PDF and online Page remain unchanged.
