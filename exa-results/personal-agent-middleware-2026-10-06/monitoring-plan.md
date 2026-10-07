# Personal agent middleware monitoring plan

Prepared October 6, 2026. Proposed monitoring only; no automated runs or subscriptions are active from this work.

The purpose is to detect changes in what we should build, whom we should sell to and why we can retain value. Track business consequences rather than collecting every AI announcement. The source inventory is in [watchlist.csv](watchlist.csv), initial findings in [evidence-ledger.csv](evidence-ledger.csv), and strategic assessment in [research.md](research.md).

## Three reading rhythms

| Cadence | Reading | Deliverable |
| --- | --- | --- |
| Weekdays at 9 a.m. America/New_York | Changes to protocol releases, platform distribution rules, relevant product launches and production customer evidence | Alert only for a material change, with a primary link, evidence status and affected decision. Remain quiet otherwise. |
| Friday at 3 p.m. | Review the week's evidence, competitive overlap and concrete workflow examples | A short decision brief: changed facts, thesis strengthened/weakened, best opportunity to investigate, next evidence to obtain. A quiet week should not create a forced recommendation. |
| First working week of each month | Reassess the shortlist against actual buyer/access/usage evidence | Proposed changes to the thesis and opportunity ranking. Archive before applying any requested revision. |

One weekday scan with a Friday synthesis is sufficient initially. A monthly review can be manual. The weekly cadence is for synthesis; it should not repeat daily alerts.

## Six trackers and actionable triggers

| Tracker | Capture | Trigger for a decision |
| --- | --- | --- |
| Standards and interoperability | Versions, independent implementations, conformance, discovery, auth, action semantics, notifications and lifecycle support | Several independent platforms can execute the same workflow: reduce integration investment and test whether outcome work remains valuable. Monitor PAP v0.1 through October 31. |
| Real personal-agent demand | Eligible tasks, actual completions, repeat users, observation period, category and failure denominator | A reachable buyer has recurring workflow volume and an operating budget: prioritize customer diligence. Vendor traffic claims without a denominator remain leads. |
| Platform distribution and control | Submission rules, recommendation documentation, default availability, guest flows, write permissions and commercial restrictions | A new native route or partner program changes how users reach us, or a policy blocks our intended transaction. Distinguish a listing from a routing commitment. |
| Incumbent expansion | Decagon, Sierra, Auth0, Composio, Temporal, Stripe, Shopify and Cloudflare releases | A product bundles the proposed wedge: narrow the product, use it as infrastructure, or stop. An announcement is a watch signal; verified equivalent buyer outcomes are stronger evidence. |
| Vertical access and economics | Production API rights, seller/merchant participation, write operations, fees, support, integration reuse and paying customers | Access becomes commercially usable or uneconomic; buyer willingness to pay covers full delivery cost; a workflow is repeatable across customers. |
| Failures and unresolved work | False success, authorization failures, duplicate actions, stuck refunds, loops, manual escalations and disputed outcomes | Repeated costly failures across buyers reveal a possible wedge; absence of such failures after standardization weakens it. |

## What to read first

Read original specifications, release notes and named customer evidence before commentary. The highest-priority reading queue is PACT's repository/specification; Sierra's Personal Agent Protocol updates; Decagon's gateway/product updates; official OpenAI, Claude, Muse and Instinct developer/product announcements; then Stripe/Shopify, Auth0/Composio/Temporal and the chosen vertical's API documentation.

Use the supplied Decagon and Sierra X accounts as fast alerts to original releases. An X post is not the implementation specification. Broad technology news is a discovery layer: follow a relevant story to its primary source before adding a capability claim to the thesis. Avoid buying several generic AI newsletters before this targeted reading queue proves insufficient.

For source changes, use official release/RSS notifications where the publisher offers them; otherwise compare the current page with the last recorded text. Do not assume every site exposes an RSS feed. Observe robots/access rules and use supported fetch tools. Record inaccessible pages as an evidence gap rather than inferring a release.

## Evidence record

Each event should have observed date, actual event date if known, entity, change, primary URL, evidence class, what it supports, what it does not support, affected hypothesis and next check. The seeded CSV uses those columns. Append a superseding event when evidence changes; preserve the original entry.

For our own opportunity comparisons, also record buyer, task, frequency, permitted systems, current handling cost, price willingness, manual work, reuse across customers and paid continuation. Leave unknowns empty. Do not transform illustrative acquisition costs or revenue shares from earlier drafts into measurements.

## Reusable weekday monitor prompt

Read this workspace's AGENTS.md and current research index. Use the personal-agent middleware watchlist and evidence ledger under exa-results/personal-agent-middleware-2026-10-06. Check for new primary-source developments since the last successful run across PACT and Personal Agent Protocol; OpenAI/dots, Claude, Muse and Instinct distribution; Decagon/Sierra gateways; competing identity, connection, commerce and durable-execution infrastructure; and candidate vertical transaction workflows. Distinguish announcements, code/specifications, availability, deployments and measured commercial outcomes. Verify important claims on original sources. Preserve source dates and prior evidence; append material new observations to the ledger and link a dated research note in the local research index. Do not rewrite the short thesis or online Page merely because news appeared. Identify the business decision affected, the strongest disconfirming evidence and the next fact needed. Remain quiet when there is no material or actionable change. Notify only when a development changes product scope, buyer, access, distribution, defensibility, economics or the pursue/no-pursue view, or when monitoring cannot run. Do not contact people, transact, subscribe, spend money or change external settings.

## Reusable weekly synthesis prompt

Review this week's new primary evidence and our existing middleware research. Produce a concise decision brief with changed facts, implications, evidence gaps and one recommended next investigation. Compare the proposed workflow with newly shipped incumbent capabilities. Give an honest pursue, narrow, defer or stop recommendation where the evidence supports one. Propose exact thesis edits only when the conclusion has materially changed; preserve prior versions using AGENTS.md before any authorized revision. A quiet week can conclude that no thesis change is warranted. Never turn a demo, listing, fundraising event or partner logo into production demand.

## Immediate checkpoints

- By October 31: check for Sierra's promised PAP v0.1, its implementation and whether PACT mechanics converge with it. This is a monitoring checkpoint derived from “later this month,” not a separately promised October 31 launch date.
- On each relevant platform release: check whether business discovery and guest actions reduce installation friction, and whether local service transactions are permitted in the intended host.
- Before selecting a sector: obtain a real workflow, a budget owner and permitted access. News cannot substitute for these.
- Before expanding: verify that delivery is reusable and paid continuation covers integration, support and exception handling.
