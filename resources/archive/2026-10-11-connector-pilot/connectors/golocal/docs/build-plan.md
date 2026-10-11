# First connector plan and decision

October 11, 2026. Recommendation: **pursue a private Muse + Jobber technical test**. Personal agents create more places to initiate local-service requests, while supply, prices and booking remain fragmented. This connector tests one part of GoLocal’s shared transaction layer. It does not yet validate agent demand, willingness to pay, provider participation or venture scale.

## Choose Muse and Jobber first

| Choice | Reason | Constraint |
| --- | --- | --- |
| Muse | Official private Custom Connector path can use API documentation and a secure credential prompt | Actual installation and tool execution still need a test in your account |
| Dots | Can reuse the same MCP tools through a supported installed plugin | Plugin permissions, authentication and cloud environment compatibility require separate checks |
| Jobber | Documented 90-day developer testing account and separate Developer Center; OAuth/GraphQL mechanics are documented | Business test signup currently fails; live scheduling mutations and semantics need an authorized schema |
| Housecall Pro | REST and merchant-issued API keys could simplify a later adapter | API access is MAX-only. The 14-day trial advertises MAX features without a card, but successful API-key issuance on a trial is not verified |

Sources: [Muse private connectors](https://www.meta.com/help/artificial-intelligence/1687253048996149/), [Dots apps](https://learn.chatgpt.com/docs/dots/computers-and-apps), [Jobber development](https://developer.getjobber.com/docs/getting_started/), [Housecall Pro API entitlement](https://help.housecallpro.com/en/articles/8505035-api-overview), [Housecall Pro trial](https://www.housecallpro.com/pricing/).

Jobber is the cheaper sustained developer-test route on paper; its signup failure is a real execution blocker. Housecall Pro is not automatically easier within a $60 cap merely because it uses REST. Don’t buy a low-priced plan that excludes its API. Reconsider a verified free MAX trial if Jobber cannot supply a usable test account.

## Architecture

```text
Muse private custom connector ─┐
                              ├─ GoLocal MCP / REST tools ─ authorized supplier adapter
Dots supported private plugin ┘                           ├─ simulated provider (working)
                                                         └─ Jobber test business (pending account)
```

The agent key and business OAuth credentials are separate. The agent is never given the Jobber client secret, refresh token or operator approval credential. Adding another agent uses the same supplier adapter. Adding Housecall Pro later uses the same agent tools with a new supplier adapter and explicit merchant permissions.

## Sequence and acceptance criteria

1. **Private endpoint and simulations — built/tested.** Tool discovery → provider search → availability → exact quote → approval → simulated booking → status → approved cancellation. Test expired quotes, conflicts, duplicate retry and incorrect credentials. All results label simulation.
2. **Muse installation — ready to attempt.** Use the prepared prompt/key and verify actual tool calls from Muse. The public HTTPS MCP smoke test passed; Muse has not been tested yet.
3. **One real vendor account — partially built, externally blocked.** Developer Center account and private app created; app credentials saved locally. Business developer signup fails in two browsers. After account creation: bind exact account ID → OAuth → account/job reads → separate operator approval → one fake-client write → UI verification → repeat same key without duplication.
4. **Live test appointment lifecycle — not built.** Obtain the account’s current GraphQL schema. Determine whether supported APIs can create and schedule a diagnostic visit, retrieve its state, change/cancel it and report an authoritative result. Reading busy appointments does not establish bookable crew capacity. Verify business hours, assignments, travel buffers and merchant dispatch policies. Use only synthetic clients and no notifications, invoices or payment automations.
5. **Agent-to-Jobber lifecycle test.** Only after step 4 is mapped and tested: Muse obtains approved test offer → exact user approval → writes appointment → reconciles by vendor ID → checks status → approved cancellation → verifies in Jobber UI. Delays, errors and pending merchant approval remain pending/unknown rather than confirmed. This milestone has not been achieved.
6. **Dots reuse.** Add/install a permitted private plugin; verify auth and the same cases. Build agent-user OAuth only if required by the chosen connection path. Do not duplicate the vendor logic.

Planning estimate, not a delivery guarantee: account-ready read/write proof and Muse installation may each be completed in one focused session. The appointment adapter could require several development sessions; supported operations and signup/API access determine scope. Public marketplace approval has external timelines we cannot promise.

## Budget

- Build, local tests, existing-agent access and existing free ngrok endpoint: $0 additional spend so far.
- Preferred Jobber developer testing account: documented 90-day window without a subscription prompt; account creation currently blocked.
- Reserve the user’s $60 cap for a necessary verified test expense. No paid plans, add-ons, annual commitments or real service payments have been purchased.
- If a vendor requires a plan above the cap, stop that purchase path and use an approved test account or another vendor’s verified free trial. Hosting beyond this temporary private test is a separate decision.

## What the test establishes

A completed Muse simulation demonstrates agent/tool execution. A real Jobber test-client write demonstrates authorized vendor connectivity. A test appointment lifecycle would demonstrate a narrow technical booking flow. None demonstrates fulfilled plumbing service, commercial demand, successful customer acquisition, contribution margin or a venture-scale opportunity.

Local code and this plan are separate from the public website, the local business thesis and the working Page. Those copies were not updated by this connector build.
