# GoLocal connector pilot

Built October 11, 2026. Test **Dots or Muse → GoLocal → a synthetic test business** first. Jobber signup is blocked; the user has selected Housecall Pro’s free-trial fallback. This is a private prototype for one operator, not an approved directory connector or a multi-merchant production network.

The authenticated endpoint is running temporarily at **https://camryn-mechanomorphic-ellis.ngrok-free.dev/mcp**. The local computer, connector process and ngrok process must stay running. See [Dots setup](docs/dots-setup.md), [Muse setup](docs/muse-setup.md) and [build plan](docs/build-plan.md) for connection prompts and remaining work.

## Current capability

| Mode | Implemented | Verified |
| --- | --- | --- |
| Demo | Simulated provider search, availability, quote, booking, status and cancellation; zero charges | 27 total tests and complete demo MCP client smoke flow over public HTTPS |
| Jobber | State/PKCE authorization, account binding, encrypted token persistence, serialized refresh, account/jobs reads, operator-approved fixed fake-client write | Automated tests with mocked Jobber responses; **not verified against a live business account** |
| Housecall Pro | Read-only API-key adapter, exact company binding and first-ten job ID/status reads; no customer contact fields | Five additional mocked-response tests pass; live trial API access pending |
| Agent | Standard Streamable HTTP MCP, equivalent REST tools, private bearer key and demo-only OAuth; portable Dots/Codex plugin | Official SDK OAuth lifecycle tested; ChatGPT app connected through OAuth; Codex package installed; actual Muse and Dots execution **pending** |

Your Jobber Developer Center account and private “GoLocal Connector Test” app were created. Its generated credentials were saved directly to private `.env`. Clients read/write and Jobs read-only scopes are selected; other scopes are off and refresh-token rotation is on. The separate business developer signup returned a generic error in both the in-app browser and Chrome. A business account remains required.

No live appointments, customer messages, invoices, repairs or payments are implemented or tested. Switching to Jobber mode removes the simulated booking tools. Account data is never presented as a public provider marketplace or real availability.

## Run

Requires Node 22+. In this directory:

```sh
npm ci --ignore-scripts
npm run setup
npm start
```

`setup` refuses to overwrite an existing `.env`. It generates different agent and operator tokens plus a 256-bit encryption key. Defaults are demo mode and loopback port 8787. Open `/operator`, enter `ADMIN_TOKEN` from local `.env`, and keep this token separate from the agent key.

For a temporary cloud-agent test using an existing free ngrok account:

```sh
ngrok http 8787 --inspect=false
```

Set `PUBLIC_BASE_URL` in `.env` to the exact tunnel origin and restart the connector. Do not rewrite the Host header: the server validates it. Disabling request inspection avoids storing credentials and OAuth codes in the local ngrok inspector. ngrok remains the HTTPS intermediary. Use only synthetic test data for this pilot.

```sh
npm run access
npm test
npm run smoke
```

`access` creates `.data/muse-key.txt` with only the agent key, never the admin token or Jobber credentials. Tests require permission to listen on loopback. Smoke runs the demo flow and cancels its simulated booking; in Jobber mode it only reads account/jobs; in Housecall Pro mode it reads company/jobs. Smoke does not invoke a real vendor write.

## Connect Jobber when the business account exists

1. Use [Jobber’s developer testing signup](https://www.getjobber.com/developer-sign-up/) for its documented 90-day testing window. Its failure is unresolved. Do not purchase a plan to work around this error.
2. In your separate [Developer Center](https://developer.getjobber.com/apps), use the saved “GoLocal Connector Test” app. Its callback is `https://camryn-mechanomorphic-ellis.ngrok-free.dev/oauth/jobber/callback`. Update it if the tunnel URL changes.
3. Use **Test in GraphiQL** with only your synthetic test business. Read `query { account { id name } }` and place its ID in `JOBBER_TEST_ACCOUNT_ID`. This initial ID discovery is needed before the connector accepts an OAuth connection.
4. Set `BACKEND=jobber` in `.env` and restart. App credentials are already stored locally. Sign into `/operator` and click **Connect Jobber test account**. Approve only the chosen app scopes. The exact account ID must match.
5. Run `npm run smoke` to verify account and job reads. Seed synthetic jobs through Jobber’s own UI if the list is empty.
6. Set `ENABLE_JOBBER_TEST_WRITES=true` only for your verified developer test account, then restart. Refresh Muse’s tool discovery.
7. Ask Muse to prepare the fake-client write. Open its approval URL yourself, sign in with the separate operator token, and approve the exact write. Muse can then commit it. Verify **GoLocal Connector Test** in the Jobber UI and retry with the same key: no additional client should appear.
8. Stop the connector before `npm run inspect-jobber`: the encrypted store permits only one process. This operator-only command saves a private schema and lists scheduling mutations. It makes no vendor mutations.

Jobber’s GraphiQL testing token lasts 60 minutes. A new Test in GraphiQL authorization invalidates previous refresh tokens for that app/admin. Once this connector is linked, explore GraphiQL using a separate app or expect to reconnect it afterward. [Getting started](https://developer.getjobber.com/docs/getting_started/).

## Reliability and limits

- Bearer authentication on every agent data/action route; separate operator session and CSRF checks for privileged forms. Origins, Host headers, input shape, body size and request rate are checked.
- Encrypted AES-GCM state stores quotes, bookings, approvals, operations and Jobber tokens. File writes are serialized, flushed and atomically replaced. A process lock prevents concurrent writers.
- A write is marked pending before contacting Jobber. A timeout or malformed response becomes unknown and is not automatically retried. Inspect Jobber before resolving it. This protects against duplicate replay but does not implement automatic vendor reconciliation.
- Agent-facing Jobber tools do not accept arbitrary GraphQL, client identities, email addresses or phone numbers. They can create only one fixed fake-client identity per operation key.
- A boolean approval is used **only for simulations**. Actual test-client writes require separate approval in the operator browser; the agent cannot grant it.
- One operator controls one bound supplier account. Optional Dots OAuth grants only simulated access, with one-hour access tokens, rotating refresh tokens and a one-day absolute grant lifetime. Codes require S256 PKCE and an exact registered ChatGPT callback. Supplier mode disables these grants. This is not tenant isolation or a production permissions system; actual Dots linking still requires testing.
- No Jobber disconnect webhook listener yet. A 401 or failed refresh disables stored access; operator **Forget** deletes local credentials. Revoke in Jobber separately. Add authenticated disconnect webhooks before merchant onboarding/publication.
- Losing the encryption key makes stored state unreadable. After an abnormal process exit, remove `.data/process.lock` only after verifying the old process is gone. Storage must be persistent; do not deploy this file store onto ephemeral serverless instances.
- Keep `.env`, `.data`, exported schemas and credentials out of Git, source bundles, prompts and logs. HTTP error text omits vendor response bodies. No request inspector is enabled on the temporary tunnel.

Stop with Ctrl-C in both running processes. Keep the connector in demo mode while the business signup is unresolved. Costs incurred by this build/test: **$0**; no paid plan, subscription or service booking was purchased.

## Housecall Pro free-trial fallback · October 11, 2026

The user reports Google signup also failed at Jobber and chose Housecall Pro instead of sending the support email. No support email was sent. Housecall Pro signup reached the required mobile-number step in Chrome; user password, remaining business details and terms are pending.

See [Housecall Pro setup](docs/housecall-setup.md). The running endpoint stays in demo mode until a usable trial key and exact company ID are verified. This adapter makes GET requests only; booking creation, scheduling and cancellation remain unimplemented.

## Dots and Codex private connector · October 11, 2026

The portable plugin is in `../../plugins/golocal`; its credential-free import archive is `../../output/golocal-dots-plugin.zip`. The repo catalog is registered locally as `golocal-development`, and version 0.1.1 is installed in Codex. The private account app is connected through OAuth, requests only `golocal:demo` and retains the default Allow low-risk permission. No supplier credentials are included. This active chat does not expose the newly connected tools; an actual Dots test chat remains pending. See [Dots setup](docs/dots-setup.md) for the exact prompts and acceptance criteria.
