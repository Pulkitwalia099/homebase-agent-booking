# GoLocal assisted multi supplier MVP

Built locally on October 12, 2026 in the existing Express MCP connector. Customers sign in, compare participating plumbing suppliers and request a diagnostic visit. Each supplier reviews only its own requests and accepts or declines. The operator approves new supplier listings. A machine-hosted, test-only pilot is now running through the existing HTTPS tunnel. See [Pilot testing guide](pilot-testing.md). Durable cloud hosting remains deferred.

This mode records real participation and decisions when used with actual accounts. It does not reserve CRM capacity, create Housecall Pro jobs, synchronize Zapier, collect payments or prove service fulfillment. `confirmed` means the supplier accepted the unchanged request in the GoLocal portal.

## Try the isolated preview

Requires Node 22 or later. From `connectors/golocal`:

```sh
npm ci --ignore-scripts
npm rebuild better-sqlite3
npm run preview:assisted
```

Open [the local preview](http://127.0.0.1:8791/preview). Its role picker switches between one synthetic customer and two synthetic supplier owners. Supplier A starts with a pending request. Accept or decline it, then switch to the customer to see the result. Search ZIP 84101 to compare both suppliers and submit another request. Supplier B cannot view Supplier A's requests.

The preview reads no existing `.env`, sends no email and calls no vendor APIs. Its temporary data is deleted when stopped with Ctrl-C. The role picker exists only in this separate preview script, never in the regular server. Set `ASSISTED_PREVIEW_PORT` if 8791 is occupied.

## Customer onboarding and booking

1. Open `/assisted/login`, enter a name and email, and redeem the single-use sign-in link. Email verification creates the account; links expire after 15 minutes. Sessions last up to seven days.
2. Use the account portal or connect a supported agent to `/mcp`. Agent authorization opens the same customer sign-in and consent flow. Grants belong to that customer, rather than a shared founder credential.
3. Search a ZIP code for `plumbing_diagnostic`. Only operator-approved suppliers appear. Each listing provides diagnostic scope, price, cancellation terms, time zone and response deadline.
4. Select a supplier and request a time at least one hour ahead, within 90 days. Review the exact offer and contact details; approve both the request and sharing those details with the selected supplier. Offers expire after 15 minutes.
5. The request becomes `pending_supplier`. The customer can check status or withdraw it while pending. An unanswered request expires at the earlier of the supplier's response deadline and the requested start time.
6. Supplier acceptance changes it to `confirmed`; refusal changes it to `declined` with a reason. Confirmed changes and cancellations require direct coordination with the supplier in this MVP.

There is no automatic reassignment after decline. The customer chooses another supplier and approves a new offer. No money is charged by GoLocal. Repairs are quoted separately from the one-hour diagnostic visit.

## Supplier onboarding and decisions

1. Sign in with a verified email, then open `/assisted/supplier/new` or **For suppliers**.
2. Enter the business name, diagnostic scope, ZIP coverage, USD price, time zone, cancellation terms and response hours. Declare existing software if useful; that field does not connect the CRM.
3. Confirm authority to represent the business and participation under the listed terms. The profile remains `pending_review` and hidden from customer search.
4. The operator signs into `/operator` using the separate `ADMIN_TOKEN`, verifies business authority and participation, then activates the listing at `/operator/assisted`.
5. The owner signs into the supplier dashboard, opens a request and explicitly accepts its unchanged scope, price and time, or declines with a reason. The dashboard displays customer contact details only for that supplier's requests.

Owners can edit their profile or pause new requests. Edits require operator review again and invalidate old unused offers. Existing requests retain their original terms. Pausing leaves existing requests accessible; the operator reviews reactivation. One verified account can own one supplier profile in this MVP. Staff invitations and shared business administration are future work.

The test-only machine pilot sends supplier request alerts and customer decision updates through the restricted email relay. Other assisted deployments need their own notification configuration. SMS, agent push notifications and CRM reconciliation are not implemented.

## MCP tools and account boundaries

The assisted tool set is deliberately separate from the existing private demo and Housecall test modes:

| Tool | Behavior |
| --- | --- |
| `connector_status` | Reports assisted capabilities and limits |
| `search_providers` | Searches approved participating suppliers by ZIP and service |
| `prepare_booking` | Freezes one supplier's scope, price, requested time and terms into a short-lived offer |
| `request_booking` | Creates a pending request after customer approval; requires an idempotency key |
| `get_booking_status` | Reads an accessible request, including supplier decision and reason |
| `list_my_bookings` | Lists the authenticated customer's requests |
| `withdraw_booking_request` | Withdraws that customer's pending request |

Supplier acceptance is a signed-in browser action. Customer tools cannot accept on a supplier's behalf. The server resolves supplier, owner and connection from the approved offer; agents cannot supply arbitrary credentials or switch the route. A supplier owner can read requests addressed to its own business, but cannot inspect another supplier's requests.

Retries with the same customer, idempotency key and exact payload return the original request. Reusing that key with changed details is rejected; a second key cannot reuse an already submitted offer. Decisions and withdrawals serialize through the existing durable store. Only one terminal outcome wins a conflicting accept/withdraw race.

OAuth uses scope `golocal:assisted`, one-hour access tokens, rotating refresh tokens and a 30-day absolute grant lifetime. **Disconnect my agents** revokes that customer's grants. Operator/global bearer credentials cannot call assisted customer tools.

The current callback allowlist supports the existing ChatGPT callback paths only. Discovery, registration, consent, PKCE and an actual MCP SDK client are tested locally. Public ChatGPT linking for this new mode remains a deployment check. Muse and other agents need separately reviewed callback/authorization support; the old shared Muse relay credential must not be used for multi-customer access.

## Configure a persistent pilot

Keep the current Housecall trial deployment and its protected history intact. Use a separate service and empty persistent data directory for the assisted pilot. Do not replace an existing private `.env` with the sample.

For a fresh checkout, `npm run setup` generates separate operator, legacy agent, encryption and account-auth secrets and refuses to overwrite `.env`. Configure these additional values privately:

| Setting | Pilot value |
| --- | --- |
| `BACKEND` | `assisted` |
| `PUBLIC_BASE_URL` | Exact HTTPS origin of the new service |
| `ACCOUNT_AUTH_SECRET` | Independent random secret of at least 32 characters |
| `RESEND_API_KEY` | Private key for transactional email delivery |
| `ACCOUNT_EMAIL_FROM` | Sender authorized in the Resend account |
| `ASSISTED_DEV_MAILBOX` | `false` on public services |
| `ALLOWED_ORIGINS` | Exact origins required by the chosen browser/MCP clients |

For the existing hosted container convention, use `GOLOCAL_HOSTED=true`, `HOST=0.0.0.0`, `PORT=10000` and a disk mounted at `DATA_DIR=/var/data/golocal`. Set `ASSISTED_INITIALIZE_HOSTED=true` only for the first launch on the separate empty disk, then remove it. A persisted initialization marker prevents silently resetting lost hosted history. Do not use `GOLOCAL_BOOTSTRAP_STATE_BASE64` or Housecall hosted keys in this mode.

Run one persistent process and one replica. The file store and SQLite accounts do not support multiple application replicas. Business records and agent grants are encrypted in `state.enc.json`; Better Auth owns `assisted-accounts.sqlite`, a private file with permissions 0600. That account database is not application-encrypted, so protect the disk and backups. Stop the process and back up the complete data directory together with the original encryption and auth secrets. Restore matching account and business databases together; startup rejects missing or mismatched account history.

The Dockerfile includes the native SQLite build prerequisites. The container image has not been rebuilt for this revision because the local Docker daemon is unavailable. Production email sender verification, HTTPS, persistent storage, recovery and actual agent linking must be checked on the target service before inviting customers.

For a private loopback development server, `ASSISTED_DEV_MAILBOX=true` substitutes an operator-only inbox at `/operator/assisted/mailbox`. Startup rejects this mode on public HTTPS or hosted services. Never expose its links or preview role picker publicly.

## Verification and next work

`npm test` passes all 55 tests, covering previous modes plus verified account creation, single-use links, logout, CSRF, OAuth revocation, per-customer and per-supplier isolation, supplier review, request routing, duplicate retries, expired and changed offers, supplier acceptance and decline, persistence, competing decisions and hosted recovery checks. Browser checks verified comparison of two suppliers, request submission, rejection of another supplier's request access, supplier acceptance and the customer's confirmed status. Tests and screenshots use synthetic identities only.

The machine-hosted test pilot can be used for customer and supplier feedback without durable cloud hosting. Actual ChatGPT linking remains a separate check; browser testing uses the same request model. Before offering actual service fulfillment, configure durable hosting and verify supplier commitments, vendor access and operational follow-through.

The multi-supplier route already has an internal connection record and capability flags per supplier. Future Housecall Pro, Zapier or other adapters should attach credentials to that supplier connection, verify the merchant identity and replace only capabilities established for that account. Keep assisted acceptance available when APIs are insufficient. Moving beyond a single replica requires a transactional database, durable event delivery, reconciliation and staff roles.

## Implementation references

Authentication follows the official [Better Auth Express integration](https://better-auth.com/docs/integrations/express), [magic link plugin](https://better-auth.com/docs/plugins/magic-link) and [SQLite adapter](https://better-auth.com/docs/adapters/sqlite). Sign-in email uses the [Resend send email API](https://resend.com/docs/api-reference/emails/send-email). These are implementation references, not evidence of production fulfillment or vendor integration approval.
