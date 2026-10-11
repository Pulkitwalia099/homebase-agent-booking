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
