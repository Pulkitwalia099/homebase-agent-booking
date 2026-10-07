# How GoLocal can distribute an agent connector

Research checked October 6, 2026. Scope: OpenAI ChatGPT, Codex and dots; Anthropic Claude; Meta Muse; and Instinct at instinct.com. The product identities for Muse and Instinct were inferred from the project context and official sites.

Personal agents are becoming another starting point for service discovery, but they still need to navigate fragmented websites, forms and calls. Uber, DoorDash and Booking.com illustrate the benefit of organized supply and a transaction layer. GoLocal would offer that capability for participating local-service providers. The distribution question is whether an agent has a reason—and the permission—to choose it when a relevant request arrives.

**Recommendation: pursue a narrow distribution experiment, not a marketplace-only launch.** Use a reachable audience or an agent-company partner to establish initial usage. Seek directory approval and improve model selection in parallel. Treat featuring and unsolicited recommendations as potential expansion, not committed demand. A useful connector is established much earlier than a venture-scale network.

## What the evidence establishes

| Platform | Public route | Recommendation and featuring evidence | Main limit |
| --- | --- | --- | --- |
| OpenAI | Public plugin review and a shared ChatGPT/Codex directory. Dots uses supported installed and enabled plugins. | Tool metadata influences selection; real-world usefulness and user satisfaction can qualify plugins for enhanced placement or proactive suggestions. | No public weighted ranking formula, traffic guarantee, or separate dots recommendation formula found. Local-service commerce eligibility needs clarification. |
| Claude | Submit a remote MCP server to the Connectors Directory; custom connectors also work. Plugins have a separate, complementary directory. | All directory connectors are eligible for contextual Suggested Connectors. Directory rank has a published 30-day account-count definition. | Directory rank is not a published formula for in-chat suggestions. Custom connectors are not suggested. |
| Muse | Submit an API/MCP integration through the Muse Connector Platform for review. | Approved connectors are discoverable by the agent and in Settings. Featuring considers usefulness, completion, reliability and maintenance. | No numerical recommendation weights or minimum traffic thresholds published. |
| Instinct | Official site describes application/device connections and delegated tasks. | No official public connector submission, featuring, or recommendation specification found. | Treat access and distribution as a partnership question, not an established self-serve marketplace. |

Sources: [OpenAI plugin submission](https://developers.openai.com/plugins/deploy/submission), [OpenAI guidelines](https://developers.openai.com/plugins/plugin-guidelines), [dots connections](https://learn.chatgpt.com/docs/dots/computers-and-apps), [Claude directory](https://claude.com/docs/connectors/directory), [Muse guidelines](https://muse.ai/platform/docs), [Instinct](https://instinct.com/).

## Four different decisions sit between a listing and a booking

1. **Eligibility:** Is the integration approved, available in the user's country and plan, and allowed by the workspace?
2. **Discovery:** Does the user find it through marketing, a directory, an editorial placement, or an agent suggestion?
3. **Connection:** Does the user install or enable it and grant any necessary account access?
4. **Selection and execution:** Does the agent choose the right tool for this request, and does the operation actually succeed?

This is an analytical framework, not a claim that every platform implements the same internal pipeline. Improving a tool description can help selection without creating public directory impressions. Getting featured can create impressions without producing completed connections. A connection is not a completed booking.

## OpenAI and dots

The current documentation describes plugins as the distribution package for skills, MCP connections, or both. ChatGPT and Codex share a universal directory. The current submission guide covers package upload, automated checks, review and publication. An older Apps SDK submission page still describes an app-based submission route; use the current plugin guide when preparing an actual submission. [Submission](https://developers.openai.com/plugins/deploy/submission), [plugin usage](https://learn.chatgpt.com/docs/plugins).

Dots can use supported plugins already installed and enabled for the account, with the connected service's existing permissions. Messaging a dot does not itself connect a service. This makes dots another execution surface for supported plugins; the reviewed documentation does not establish a separate dots marketplace. [Dots connections](https://learn.chatgpt.com/docs/dots/computers-and-apps).

**What is disclosed about selection:** names, descriptions and parameter documentation influence whether tools are invoked. OpenAI recommends action-specific names, clear usage conditions and exclusions, documented parameters, and correct annotations. It recommends testing direct prompts that name the product, indirect prompts that only express the task, and negative prompts where the tool should stay inactive. These are documented developer controls, not a guaranteed public-recommendation algorithm. [Optimize metadata](https://developers.openai.com/plugins/guides/optimize-metadata).

The design guidance says the model can bring an app into a conversation when its capabilities fit the user's intent. It emphasizes a small number of concrete capabilities, immediate useful results, structured outputs, and clarity even when the user has no brand awareness. The troubleshooting guide also tells developers to update directory metadata when launcher ranking seems wrong. Neither gives weights or a ranking threshold. [App design](https://developers.openai.com/blog/what-makes-a-great-chatgpt-app), [discovery troubleshooting](https://developers.openai.com/plugins/deploy/troubleshooting#discovery-and-entry-point-issues).

**How to become eligible for featuring:** meet publication requirements, then demonstrate real-world utility and high user satisfaction. The guidelines explicitly identify enhanced directory placement and proactive suggestions as possible distribution benefits. They do not specify how satisfaction is measured, a minimum user count, an application for guaranteed featuring, or a purchase price for organic placement. Metadata that tells the model to prefer your plugin over competitors is prohibited. [Plugin guidelines](https://developers.openai.com/plugins/plugin-guidelines).

**What remains undisclosed:** candidate generation, ranking weights, whether particular retention or completion metrics affect a given recommendation surface, experiments by cohort, commercial preference rules, and how many recommendations a newly approved plugin receives. Do not turn reasonable hypotheses about these into factual claims.

**Source-version caution:** Exa returned an older official Apps SDK “User Interaction” page describing conversation history, memories, brand mentions/citations, linking state and past usage as discovery inputs. A direct web fetch of that address returned 404; the official documentation fetch resolved it to a different use-case planning page. Those detailed historical inputs are not treated here as a verified current algorithm. The current metadata guide and plugin guidelines support the narrower claims above.

## Claude

Claude provides the clearest public separation of directory discovery and custom installation. Directory connectors can be browsed, searched and suggested in chat. Custom connectors use the same underlying MCP runtime but are not eligible for Suggested Connectors. Every directory entry is automatically eligible; there is no separate opt-in. An entry in the open MCP Registry does not put a server in Claude's directory. [Directory versus custom](https://claude.com/docs/connectors/building/directory-vs-custom).

**The disclosed directory-rank rule is specific:** count distinct Claude accounts that sent the server any MCP message in the preceding 30 days, then rank published servers by that count. This includes handshakes and tool-list requests, even some attempts that never finished authentication. A Trending tag identifies the top ten by recent growth in the same message-based account count. The page does not give the exact recent-growth interval or normalization formula. [Listing metrics](https://claude.com/docs/connectors/building/managing-your-listing).

Consequently, directory rank is broader than actual usage. The separate “Tool call users” metric counts accounts that invoked at least one tool. Neither is a count of paying customers or successful transactions. Repeated calls by one account do not create additional distinct accounts. The documented rule supports recruiting genuine users; it does not justify fabricated connections or rankings manipulation.

**In-chat suggestions:** relevance to the user's task and directory inclusion are established. The reviewed docs do not disclose the complete retrieval/ranking system or prove that the directory's 30-day rule determines in-chat recommendation order. The same distinction applies to the health badge: Anthropic reports reliability metrics, but their existence does not establish a ranking weight.

**Verification and featuring are different:** the current checklist says submissions are automatically screened and normally listed as community connectors. Listings flagged as highly useful may be escalated automatically to a more extensive verified review. No separate action is required to request that escalation. Verification is a review label; it is not a promise of featured placement. The reviewed documentation did not expose a guaranteed editorial featuring route. [Review checklist](https://claude.com/docs/connectors/building/review-criteria).

**Practical promotion:** share the permanent directory URL through a “Connect to Claude” button, product documentation, onboarding or an existing customer channel. Custom installation links can prefill the connector name and URL but still require the user's confirmation. This is an officially supported activation route; its conversion rate is not published. [Install links](https://claude.com/docs/connectors/building/directory-vs-custom).

## Muse

Muse's public process is to describe the product, submit it for functional/security/legal review and end-to-end testing, then receive directory availability if approved. Editorial featuring is a separate decision. [Connector Platform](https://muse.ai/platform).

The detailed guidelines are unusually applicable to GoLocal. A service that supports booking should expose the relevant search, availability, full pricing and terms, authorization, checkout and confirmation steps. It should also handle supported status checks, changes, cancellations and refunds. A generic list of links is insufficient; handing the entire checkout back to the user fails Muse's completion requirement. Guest checkout should be supported when the underlying service offers it. [Muse guidelines](https://muse.ai/platform/docs).

**Discovery:** approved connectors can be discovered by the Muse agent and through Settings > Connectors. Meta states that wider connection and user value lead to wider discovery, but does not publish the formula.

**Featuring criteria:** usefulness beyond browser access; completion with few unnecessary steps or handoffs; accurate and reliable operation with recovery across supported contexts; and continued maintenance, documentation, support and improvements. There is no guarantee of placement, ranking or traffic. These are the criteria around which a GoLocal demo and evidence package should be built. [Guidelines, sections 7.1–7.2](https://muse.ai/platform/docs).

Meta also reports that it worked directly with providers on its initial connectors and wrote accompanying skills. That proves a direct integration relationship is possible. It does not establish a public entitlement to native/default routing for a new provider. Muse can also build custom connections to APIs or CLIs for individual users. [Meta engineering account](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse).

## Instinct

Instinct's official site says it connects to applications and devices and can perform tasks such as arranging rides or booking a handyman. That supports potential product fit for GoLocal. It does not establish an open plugin marketplace. [Official product](https://instinct.com/).

Targeted searches found third-party instructions from connector vendors, but no official Instinct developer program, listing submission rules, featuring rubric or recommendation formula. Those third-party instructions are not used as proof of Instinct's platform policy. Public absence is not proof that a private partner program does not exist.

For Instinct, the useful next business conversation would establish whether a remote MCP/API route is supported, who approves it, whether users must enable it individually, and whether the agent will route an identified class of requests to it. An integration invitation or demonstration is weaker than an actual routing commitment.

## Does every user need to authorize it

**No: OAuth sign-in is not universally required. But distribution, account authentication and permission to act are separate.**

| Situation | What the evidence supports |
| --- | --- |
| Public information, such as participating providers or public availability | OpenAI supports anonymous read-only operation; Claude supports authless servers. There may still be an install/connect step. |
| Private customer records or account-specific actions | OAuth or another supported authorization mechanism is needed. OpenAI advises authentication for private data or write actions. |
| Partner-built connector | Being built or promoted with the platform does not automatically waive account authorization or action approval. |
| Managed organization | Supported shared-account, admin-managed, or enterprise identity flows can reduce individual login steps. They remain permissioned access. |
| Consequential booking or purchase | The platform's action controls still apply. Muse explicitly requires approval every time for sensitive writes. |

Sources: [OpenAI authentication](https://developers.openai.com/plugins/build/auth), [OpenAI account and permission flows](https://learn.chatgpt.com/docs/plugins), [Claude authentication](https://claude.com/docs/connectors/building/authentication), [Muse permissions](https://muse.ai/platform/docs).

Claude's “Anthropic-held client credentials” option still uses an individual OAuth consent flow; it is not a machine-to-machine grant that silently grants every user access. Claude separately documents enterprise-managed identity and admin-supplied request-header credentials. Muse automatically connects certain Meta-owned accounts in the same Accounts Center, but that exception does not establish automatic connection for a third-party GoLocal integration. [Claude auth](https://claude.com/docs/connectors/building/authentication), [Meta connection help](https://www.meta.com/help/artificial-intelligence/1687253048996149/).

For GoLocal, there are also two different access relationships: the customer's permission to make or manage a booking, and each merchant's authorization for GoLocal to use its software and supply. A platform partnership does not provide the latter. A GoLocal-managed marketplace could, subject to platform rules and merchant agreements, keep supplier credentials behind its own service rather than asking the customer to connect every cleaner's CRM. That is a proposed architecture, not a verified integration.

## Which marketing routes are actually proven

The evidence supports the existence of distribution mechanisms much more strongly than it supports a repeatable, profitable acquisition playbook for a new connector.

**Strongest measured example found:** Canva says millions of people have used Canva within Claude and reports an 85% quarter-over-quarter increase in authenticated users connecting Canva to an assistant, with assistant-referred sign-ups increasing. Its account also describes launch partnerships and a broader distribution strategy. These are company-reported figures, span multiple assistants/surfaces, and do not isolate the contribution of directory search, featuring, existing brand awareness or recommendation algorithms. They do not establish paid conversion, acquisition cost or results attainable by a new local-services brand. [Canva's adoption report](https://www.canva.com/newsroom/news/claude-small-business/), [Canva–Anthropic collaboration](https://www.canva.com/newsroom/news/canva-claude-design/).

| Route | Evidence level | Practical use for GoLocal |
| --- | --- | --- |
| Existing customer or partner audience → connection link → useful first task | Officially supported installation/distribution mechanism; channel-specific return not established | Reach a community with a concrete service need and verify its agent usage. Use a specific outcome, coverage statement and setup path. |
| Directory search and browsing | Established platform surface | Necessary for discovery; especially important on Claude because custom connectors are excluded from suggestions. |
| Editorial or strategic platform launch | Real partnerships and large-brand adoption exist | Pitch a missing capability with verified completion evidence and useful supply. Treat selection as discretionary. |
| Contextual agent recommendations | Explicitly documented by Claude; possible enhanced distribution at OpenAI; agent discovery described by Muse | Make capabilities understandable and useful, seed legitimate usage, and measure unaided selection. |
| Tutorials, community demonstrations and targeted content | Sensible acquisition tests; no strong connector-specific causal benchmark found | Demonstrate a real task to the actual niche audience. Measure completed bookings, not views. |
| Broad ads or generic “AI SEO” | No reviewed evidence of predictable connector-level unit economics | Defer until activation, eligibility and contribution are known. Website visibility is not proof the tool is available to the agent. |

The user does need access to a compatible agent to use this channel. They do not need to be your existing customer first: an in-agent suggestion can introduce the service. Conversely, converting a non-agent user to both the host platform and GoLocal adds two adoption steps. For the initial test, existing agent users with a concrete task are the more plausible audience; this is a recommendation to test, not measured demand.

## A concrete distribution plan for GoLocal

1. **Choose the entry request and reachable audience.** An illustrative request is “Find a move-out cleaner available before Friday in our service area.” Confirm that the audience already uses a target agent. Boston and cleaning remain provisional.
2. **Recruit enough authorized supply for that request.** Publish accurate coverage, available services, price and status semantics. A broad listing that regularly produces no suitable provider will not demonstrate usefulness.
3. **Choose the channel by access.** A warm introduction to an agent company can be more valuable than a theoretically large directory. For self-serve distribution, Claude has the most explicit documented discovery mechanism; Muse has particularly relevant published booking criteria. This is not evidence that either has more qualified local demand.
4. **Create a complete first-use path.** Show useful public information before unnecessary login where supported; preserve progress through required authorization. Offer clear confirmation, status, cancellation and support. Validate separately on each platform.
5. **Submit a reviewable product.** Provide a clear task description, permissions, test account, representative success/failure cases and a short demonstration. For Muse, show the improvement over its browser. For OpenAI, use the current plugin submission requirements rather than an old tutorial.
6. **Recruit initial legitimate users through the audience or partner.** Use platform-specific setup instructions and a useful starter request. A tutorial audience or directory click is only an intermediate signal.
7. **Evaluate unaided selection.** Compare a prompt that names GoLocal, one that only describes an eligible task, an out-of-area request, an unavailable service, and an existing-customer booking change. Repeat across connection states and representative users; a single successful prompt is insufficient.
8. **Bring outcome evidence to platform discussions.** Report eligible requests, selection rate, offer coverage, confirmed and fulfilled jobs, exception rate, repeat use, and user feedback. These demonstrate the published quality criteria without claiming unpublished ranking weights.

Track: attributable audience reached → listing visit or partner routing opportunity → connection → eligible request → GoLocal selected → suitable offer → confirmed booking → fulfilled and paid job. For marketplace and direct channels, calculate acquired-paying-customer cost and contribution after fulfillment, support, refunds, supplier onboarding and integration costs. Keep new-customer acquisition separate from management of an existing customer relationship.

For a partner discussion, distinguish ordinary listing, co-marketing, default availability, routing for defined eligible requests, and any volume commitment. Ask what happens when multiple services match and whether users still need to connect GoLocal. These distinctions matter more than calling an integration “first-party.”

## Eligibility issue to resolve before implementation

OpenAI's current plugin guidelines say commerce is limited to physical goods and prescribe external checkout, with Instant Checkout limited to selected marketplace partners. A cleaner booking is not unambiguously covered by “physical goods.” The same guidelines restrict unofficial pass-through integrations. GoLocal should obtain a clear eligibility determination for its exact merchant-authorized service model and transaction flow before relying on public ChatGPT distribution. This is an unresolved product-policy question, not a claim that all service-related tools are prohibited. Muse, by comparison, explicitly specifies requirements for booking connectors and completing checkout inside the approved workflow. [OpenAI guidelines](https://developers.openai.com/plugins/plugin-guidelines), [Muse guidelines](https://muse.ai/platform/docs).

**Business judgment:** proceed with one audience/channel and one fulfilled-booking workflow. A connector without repeatable demand is a useful feature. Manual coordination may establish a service business; repeatable business workflows may support vertical software. Venture-scale potential requires repeatable distribution, enough supply to fulfill demand, positive contribution and a defensible advantage across agent platforms. This research establishes possible channels, not those commercial outcomes.

## Research scope and limitations

Four workstreams covered OpenAI, Claude, Muse/Instinct, and distribution outcomes. Exa searches requested 95 result slots across all calls; three initial searches failed, accounting for 30 slots. The remaining searches returned 65 result entries before deduplication, supplemented by direct primary-page reads and official OpenAI documentation retrieval. Result entries overlap and are not 65 independent supporting sources. Company documentation establishes product rules; company adoption reports are self-reported outcomes. No live account installation, recommendation experiment, booking, outreach or commercial negotiation was performed.

The older Apps SDK discovery page discrepancy is recorded above. Several guessed documentation URLs were unavailable and were not used as evidence. Current pages were preferred over older commentary. Search-result publication dates on updated company articles can lag their current contents; Canva's 85% statement is attributed to the page as retrieved, not assigned to an inferred quarter.

This is a local research brief. The business thesis, detailed working thesis, Word/PDF and online working Page were not revised. The local research index links this brief.
