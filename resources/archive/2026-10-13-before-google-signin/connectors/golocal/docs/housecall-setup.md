# Housecall Pro private trial setup

October 11, 2026. The user selected this fallback after Jobber developer and Google signup failed. Additional spend remains **$0**, with a $60 cap. No Jobber support email was sent.

Housecall Pro [advertises](https://www.housecallpro.com/pricing/) a 14-day MAX-feature trial with no credit card. Its [API help](https://help.housecallpro.com/en/articles/8505035-api-overview) requires MAX and describes read-only or full-access merchant keys. Successful API-key issuance on this trial is not yet verified. Do not purchase Basic or Essentials for API access, or buy MAX above the cap.

## Account handoff

The Chrome signup at https://pro.housecallpro.com/app/signup has the approved email and Pulkit Walia name entered. It requires a mobile number. The user completes remaining business details, password and final terms; use GoLocal as the test business. Do not enter a card, connect payments or import real customers.

## Verify API entitlement

After the dashboard exists, open **My Apps → All Apps → API Key Management**. Verify that key generation is available without a paid upgrade. If it is blocked, record the actual message and stop the paid path.

Create **GoLocal Read-only Test** with **Read-only** permissions. Creating a persistent credential through the browser requires action-time approval or the user can do it themselves. The key belongs only in `HOUSECALL_API_KEY` in private local `.env`; keep it out of chat, Muse, source bundles and screenshots. Muse uses its separate GoLocal key.

Bind `HOUSECALL_TEST_COMPANY_ID` to the exact synthetic company ID. Run `npm run inspect-housecall` after key setup, verify the returned name is your GoLocal test company, and privately save the ID. This operator-only command calls GET `/company` and prints only ID, name and time zone. The agent adapter deliberately refuses unbound requests. Do not relay vendor contact fields into the agent.

Set `BACKEND=housecall`, restart the connector and run `npm run smoke`. Refresh Muse tool discovery. The available tools become `connector_status`, `housecall_company` and `housecall_list_jobs`; demo booking tools disappear. The jobs list returns only ten IDs, invoice numbers and work states. It does not infer availability or book appointments.

## Implemented and pending

The read-only adapter is built. Five mocked-response tests cover exact company binding, credential header, GET-only endpoint selection, wrong-account refusal, bounded responses, contact-field omission and sanitized failures. All 21 connector tests pass. A live API call, actual Muse execution and the appointment lifecycle remain pending.

For a later booking test, map and verify customer creation, job creation, schedule updates, status and cancellation semantics using synthetic data and explicit approvals. A deleted schedule is not proof that the job itself is canceled. Busy jobs alone do not establish dispatchable capacity. Disable customer notifications and all invoice/payment automations before any test write. These vendor writes are not implemented by the current Housecall adapter.

## Primary API sources

- [Authentication](https://docs.housecallpro.com/docs/housecall-public-api/b87d37ae48a0d-authentication): merchant keys use `Authorization: Token <key>`; partner OAuth requires approval.
- [Get Company](https://docs.housecallpro.com/docs/housecall-public-api/24a5d891a80a8-get-company): GET `https://api.housecallpro.com/company` provides ID, name and time zone.
- [Get Jobs](https://docs.housecallpro.com/docs/housecall-public-api/6c97704da8bf3-get-jobs): GET `/jobs?page=1&page_size=10` provides paginated jobs and company IDs.

Documentation was inspected in the browser; the web reader returned only the JavaScript shell. Public docs establish supported interfaces, not successful trial access or production booking reliability.

## Signup advanced to final password step · October 11, 2026

The user authorized submitting their supplied mobile number and making up a synthetic test-business profile. The mobile number was entered directly in Housecall Pro and is not copied into project evidence. Company size **Owner operator**, primary industry **Plumbing**, company name **GoLocal Connector Test**, website **https://getgolocal.com** were entered. Signup is now at `step=5`, displaying **14-Day free trial—No credit card required**. The only remaining visible field is a new password, followed by **Start free trial**. Password creation and submission are a user handoff under browser-control rules; account creation and dashboard access remain unconfirmed. No paid option or payment details entered.

The earlier unsent-support observation is historical: the Jobber support email was subsequently authorized and sent, as recorded in `jobber-signup-help.md`.

## Live trial and MCP test verified · October 11, 2026

This dated update supersedes the earlier pending/read-only notes above. The user completed the password handoff. The 14-day trial dashboard opened without a card, and API Key Management was active. The user approved creating **GoLocal Connector Test** with **Full access** and saving the key privately in `.env`. The key is never bundled or passed to the agent.

GET `/company` verified **GoLocal Connector Test**, ID `4cd1c8ed-be46-46ea-a458-98b8063b82f3`, time zone `America/New_York`; the initial bounded jobs page was empty. Company binding and a verified test owner ID are configured privately.

Controlled writes are implemented separately in `src/housecall-test.js`, enabled by `ENABLE_HOUSECALL_TEST_WRITES=true` in Housecall mode. Seven MCP tools expose status, company/jobs reads, an exact $0 synthetic quote, confirmation, own-job status and schedule removal. Customer/addresses/prices/employees cannot be supplied by the agent. The fixture has no email or phone and notifications are disabled. Jobs are limited to three operations total, including uncertain writes. Pending writes persist before submission and are never blindly retried. The full vendor key is broader than these limited agent tools.

The live public-HTTPS MCP test created job `job_8ead1790a92c40e89c0294e6d1ed4359` (Job #1) for a fictional **GoLocal API Test - No Service** customer, October 12, noon–1 p.m. Eastern, $0. Housecall automatically assigned the account owner despite an empty employee array. The guard stopped; read-only inspection verified the bound owner, no on-my-way/start/complete timestamps, notifications off and $0 balances. An operator-only reconciliation associated this existing record with the pending operation; no POST was repeated. The corrected guard permits only that bound owner. Retries returned the same job, status was read, and DELETE `/jobs/{id}/schedule` changed the vendor state to **needs scheduling**. This is **unscheduling, not cancellation**. No fulfillment, dispatch-workflow action, payment or message was initiated.

The synthetic address explicitly says NO SERVICE LOCATION. Vendor geocoding can still map a placeholder to a real area; it must never be used for fulfillment.

All **34 tests pass**, including independent grant/account binding, uncertain-write handling, approval/expiration, duplicate quote/key protection, owner restrictions and notification/value guards. See [live MCP results](../../../output/housecall-live-mcp-results.json), [scheduled proof](../../../output/housecall-live-job-scheduled.png), and [unscheduled proof](../../../output/housecall-live-job-unscheduled.png). `scripts/reconcile-housecall.js` is operator-only and requires the server to stop before opening the encrypted store; it never repeats a vendor write.

A separate `golocal:housecall-test` OAuth grant is implemented and binds the exact company and MCP resource, with one-hour access and one-day absolute refresh lifetime. Existing demo grants cannot access Housecall mode. The existing ChatGPT demo app could not refresh; a separately named **GoLocal Housecall Test** custom MCP app is prepared, with DCR and the discovered Housecall test scope. Creation/connection and actual Dot execution await action-time approval. Endpoint currently runs Housecall mode, so the earlier demo grant is inactive until demo mode is restored.

Spend so far: **$0**. No upgrade, card or renewal commitment. Trial availability does not establish affordable ongoing API access, merchant-network rights or production reliability. Muse has not executed this live flow.

Primary write docs: [Create Customer](https://docs.housecallpro.com/docs/housecall-public-api/4e0bf8c4d65d7-create-customer), [Create a Job](https://docs.housecallpro.com/docs/housecall-public-api/2dcf481ed7d69-create-a-job), [Delete job schedule](https://docs.housecallpro.com/docs/housecall-public-api/7c3db70353a4f-delete-job-schedule). No documented job-cancellation operation was found in the Jobs group inspected.

## Actual Dots test completed · October 11, 2026

The private GoLocal Housecall Test app is now created and connected under the separately approved test scope. Dot initially stopped before any vendor write because the quote omitted explicit safety evidence. Quote preparation now verifies the existing vendor customer and returns contact/notification and unsupported-workflow flags; all **35 tests pass**.

The resumed actual connected-tool run created **Job #2**, `job_2e0d3b1c453b45dbab46441411a44f44`, from quote `0b29be64-8e3c-4437-8d14-063a076119ac`, USD 0.00 for October 12, noon–1 p.m. Eastern. It completed nine successful MCP calls without operator reconciliation. Retrying key `hcp-dot-e2e-20261011-b1` returned that same scheduled job with `idempotentReplay=true`. Dot then removed its schedule and verified needs scheduling with null timestamps. Unschedule explicitly returned `jobCancelled=false`.

Parent Codex plugin tools independently verified the bound company, both test-job IDs and final Job #2 state: $0, notifications false, no schedule. Housecall’s dashboard shows Unscheduled and Notifications off. Job #1 was left untouched. No invoice action, payment, customer message, work-start or service fulfillment was performed. Two of the three test-job operations are now used.

[Dot report](../../../output/dots-housecall-test-report.txt) · [Independent verification](../../../output/dots-housecall-e2e-results.json) · [Vendor screenshot](../../../output/dots-housecall-job-unscheduled.png). The temporary server/tunnel, one-day agent grant and trial entitlement remain prototype limits. Spend remains $0; affordable ongoing API access, multi-merchant rights, Muse execution and production booking reliability are not established.
