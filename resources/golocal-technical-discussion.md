# GoLocal middleware discussion

Local services and the path to completed transactions

Personal agents are becoming another starting point for service discovery. Booking local services still involves fragmented websites, forms and calls. Uber, DoorDash and Booking.com show the value of organized supply and a transaction layer. GoLocal would bring that model to participating local businesses.

I want to pressure-test where that shared layer is needed, what existing providers already solve, and which use case gives us the strongest business. Local services are the starting hypothesis; the broader question is how agents complete work across businesses.

## What GoLocal could own

GoLocal would turn a service request into an accepted booking and manage supported changes through completion. The product needs supplier-approved scope, pricing, availability and booking authority. An API response alone may not establish that a provider has committed to the job.

The business could organize a supplier network, execute workflows across existing networks, or provide agent access through vertical software. These are different routes with different buyers and distribution needs. We should decide which one gives us a reason to exist beyond a connector.

## What already exists

Composio handles connected accounts and authentication. PACT provides a published pattern for delegated customer permissions and signed action receipts. Meta and Sierra have announced Personal Agent Protocol, with its first specification planned later in October. These solve parts of access and trust; they do not establish universal service coverage. [1, 2]

Updater already markets infrastructure for purchasing complex services through apps and AI agents. Square exposes booking operations for authorized sellers. Openbay offers automotive service partnerships and booked appointments. A third-party starting point may therefore exist for a chosen category. Coverage, permitted operations and commercial access need to be checked. [3, 4, 5]

## How the first requests reach us

A personal-agent partnership could route agreed requests to GoLocal. Marketplace distribution still requires users to find, enable and choose it. Neither route establishes request volume by itself.

A B2B starting point could use a company's existing queue of service requests. It would reduce dependence on consumer plugin adoption. Success there would validate the business workflow; personal-agent demand would remain a separate question.

<!-- pagebreak -->

## The B2B use cases to investigate

**Stalled appliance repairs.** The proposed buyer is a retailer or service-network operator with one recurring bottleneck: missing warranty approval, an unconfirmed return visit, or incomplete claim paperwork. The workflow connects the customer, repairer and approving business. ServicePower already covers substantial dispatch, claims and reimbursement work, so we need examples its customers still struggle to resolve. [6]

**Travel cancellation and refund follow-through.** The proposed buyer is a travel seller with unresolved cases across booking and payment systems. Duffel documents that a cancellation refund returns to the seller's original payment method; the seller then refunds its customer. That is a concrete boundary between a successful supplier action and a completed customer outcome. Existing servicing products may already cover it. [7]

**Deadline-driven property service exceptions.** The proposed buyer is a property operator who needs a failed service recovered before a move-in or inspection. This keeps GoLocal close to local supply, but broad maintenance coordination is already served by products such as Latchel. The opportunity would need a narrower unresolved task. [8]

My proposed discovery order is stalled repairs first, then one travel-servicing task. A reachable buyer with a repeated, costly problem should outweigh this ordering. Faster B2B monetization depends on access and paid demand; enterprise procurement can still be slow.

## The broader middleware opportunity

The direction worth exploring is execution across businesses: carry permissions, apply each business's rules, recover interrupted work and verify the final outcome. Reusable workflows could serve several agent platforms and software companies.

Three possible products are a vertical execution API, a service that resolves recurring exceptions, or a reconciliation layer that checks whether the booked job, refund or claim actually completed. Each needs a specific buyer and a measurable improvement over existing products.

## Questions for our discussion

1. Which real task still fails after existing connectors, protocols and vendor APIs are used?
2. Can we use an existing supplier network, or must we recruit businesses ourselves?
3. Who controls the request, grants permission and pays for completion?
4. Which steps require human judgment, and does that work repeat enough to become software?
5. What remains valuable as agents and vendor APIs improve?

A thin adapter may remain a feature; bespoke coordination may become a service business. Reusable workflows with renewing buyers could support vertical software. A venture-scale case also needs repeatable distribution and economics across customers. The next decision is which real workflow deserves that test.

## Sources checked October 9 2026

[1] Composio authentication — https://docs.composio.dev/docs/authentication

[2] PACT — https://decagon.ai/blog/introducing-the-personal-agent-consent-trust-protocol-pact · Personal Agent Protocol — https://sierra.ai/blog/introducing-personal-agent-protocol

[3] Updater — https://updater.com/

[4] Square Bookings API — https://developer.squareup.com/docs/bookings-api/use-the-api

[5] Openbay partnerships — https://app.openbay.com/partner-with-openbay

[6] ServicePower — https://www.servicepower.com/solutions/overview

[7] Duffel cancellations — https://duffel.com/docs/api/order-cancellations

[8] Latchel maintenance — https://latchel.com/property-management-maintenance-software/
