# GoLocal for Dots, ChatGPT and Codex

October 11, 2026. The user requested a Dots connector and an end-to-end test in Codex. The private portable package is at `plugins/golocal`; the import archive is `output/golocal-dots-plugin.zip`. No credentials are included. **The actual personal Dot simulated lifecycle test has now passed**, superseding the earlier pending-execution observations below.

## Connection model

Dots uses supported installed/enabled account plugins. Its cloud computer and permissions differ from a local Codex thread. A repository plugin alone is not proof that Dots has access. [Official Dots guide](https://learn.chatgpt.com/docs/dots/computers-and-apps).

The account’s Plugins page exposes **Add custom MCP server**, with OAuth, No authentication and OAuth or no authentication options. It provides no fixed API-key input. GoLocal now uses the official MCP SDK’s OAuth routes for this private test, plus a narrow single-operator provider. A public production network should use an established identity provider and per-user/per-merchant authorization.

The OAuth grant is **`golocal:demo`** only. It cannot access supplier accounts. Changing the server to Jobber or Housecall mode disables these OAuth tokens. Access tokens expire in one hour; the grant expires one day after initial approval. Refresh tokens rotate, and reuse revokes their family. Tokens are opaque, bound to the exact MCP resource and issuer, hashed in encrypted state, and revocable on the operator page. Authorization codes require S256 PKCE, the registered redirect URI and one-time consumption. No arbitrary redirect origins are accepted.

## Private account install

The prepared connection uses:

- Name: **GoLocal Connector Test**
- URL: **https://camryn-mechanomorphic-ellis.ngrok-free.dev/mcp**
- Authentication: **OAuth** with dynamic client registration
- Requested scope: **golocal:demo**
- Visibility: private; no public directory submission

The user approved the custom-MCP warning and the demo OAuth grant. The private app was created and connected successfully. ChatGPT settings show the primary connected account, OAuth used, DEVELOPMENT review status, the exact MCP URL and its actual App ID. The plugin retains the account’s default **Allow low-risk** permission. No global permission was changed.

The plugin URL is `https://chatgpt.com/plugins/plugin_asdk_app_6acb14f577d481919971027ef1da3827`; the App ID shown in settings is `asdk_app_6acb14f577d481919971027ef1da3827`. The local package’s `.app.json` uses that actual App ID. Refresh tools in a new conversation if the active chat cannot load newly connected tools. Installation, connection and actual Dots execution are separate milestones.

## Repo package

`plugin.json` identifies the portable plugin and includes OpenAI display metadata and the registered-app mapping in `.app.json`. `skills/golocal-booking/SKILL.md` supplies the workflow and preserves approval/idempotency rules. The repo catalog `.agents/plugins/marketplace.json` points at `./plugins/golocal`. The separate `dots-mcp-template.json` documents how to configure OAuth DCR when registering the endpoint independently; it is not bundled alongside the existing account connection. [Packaging docs](https://developers.openai.com/plugins/build/plugins).

The repo marketplace was registered with `codex plugin marketplace add .`; `codex plugin add golocal@golocal-development --json` installed version **0.1.1** successfully at `~/.codex/plugins/cache/golocal-development/golocal/0.1.1`. Its mapping points at the connected account app. A new conversation or local app refresh/restart can be needed to load newly installed tools. Do not restart the app during an active user handoff without their instruction.

## Test prompts and acceptance

First prompt:

```text
Use GoLocal Connector Test. Confirm that it is in demo mode. Find simulated plumbing diagnostic availability in ZIP 84101 and prepare a quote for the earliest available slot. Show me the exact date, time zone, price and terms. Stop before confirmation.
```

After reviewing the returned quote:

```text
I approve that exact simulated quote. Confirm it, check its booking status, then cancel this simulated booking and verify the canceled state. Reuse the original idempotency key if confirmation is retried. No real services or charges.
```

Success requires actual GoLocal tool calls and returned IDs, a simulated confirmed status, a same-key replay without another booking, and canceled status. Natural-language claims without tool results do not establish a working connector. Preserve returned time zones.

## Verified so far

- 27 automated tests pass, including real HTTP OAuth metadata, DCR, operator login/CSRF, consent, PKCE, token exchange and official MCP SDK simulated lifecycle.
- Public HTTPS OAuth metadata endpoints were fetched successfully through the existing tunnel.
- Portable JSON parses and the booking skill passes its validator.
- Account plugin creation and OAuth linking succeeded; connected status was verified in ChatGPT settings and through the plugin permission tool.
- Codex installed local plugin version 0.1.1 with the actual registered-app mapping. This active chat does not yet expose the new GoLocal tool namespace.
- A browser form test caught `Referrer-Policy: no-referrer` producing an opaque Origin on form POST. The policy now preserves same-origin Origin and suppresses cross-origin referrers; foreign/opaque origins and invalid CSRF remain rejected. [Browser policy behavior](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy).
- Actual Dots execution awaits authorization to open and message a new test chat. The SDK lifecycle is not a substitute for that verification.

The temporary endpoint requires this Mac, connector process and ngrok to remain running. Dots itself being cloud-hosted does not make GoLocal’s local server persistent hosting. No additional spend, real booking or payment.

## Completed personal Dot test · October 11, 2026

The user explicitly authorized opening and messaging the Dots test. Dots uses its ongoing personal conversation at `https://chatgpt.com/dots/home`; a new test request was sent there rather than treating a regular Work chat as Dots. Dot reported nine successful actual connected MCP calls, with `isError=false`: status, search, availability, quote, confirm, booking status, same-key confirm retry, cancellation and final booking status.

- Provider: `demo-plumber`, GoLocal Test Plumbing (fictional).
- Quote: `demo-quote-dc3419c4-f800-4069-af0c-d87f94e15594`.
- Booking: `demo-booking-6855431f-5d40-48dc-a617-923425038394`.
- Key: `golocal-dot-e2e-20261011-a1`; the retry returned the same booking ID.
- Quote: USD 0.00; October 12, 2026, 10–11 a.m. America/Denver (MDT), equivalent to noon–1 p.m. Eastern. Terms specify simulation only, with no technician, repair, payment or messages.
- Final state: `cancelled`, `simulated=true`, `amountCharged=0`.

The tools were also available in the parent Codex chat on the subsequent turn. Its actual plugin calls independently verified that exact booking/quote/slot and canceled state. A post-cancellation confirmation replay using the same quote/key returned the same canceled record, with no reinstatement or additional booking ID.

[Structured results](../../../output/golocal-dots-e2e-results.json) · [Dot report](../../../output/dots-golocal-test-report.txt) · [Screenshot](../../../output/dots-golocal-e2e-passed.png). This verifies the personal Dot → connected OAuth plugin → temporary MCP server → simulated booking lifecycle. Supplier scheduling, fulfillment, payments and Muse execution remain unverified.

## Housecall test scope prepared · October 11, 2026

The live vendor MCP test is now verified; see `housecall-setup.md`. `golocal:demo` grants remain unable to access the Housecall backend. A new private GoLocal Housecall Test app form is prepared with DCR and `golocal:housecall-test`, awaiting human action-time approval. Only after that separate consent can a Dot use the bound synthetic test tools. Schedule removal must be described as unscheduling; it does not cancel the job. Current endpoint mode is Housecall, temporarily disabling the older demo grant. No completed actual Dot-to-Housecall run is yet recorded.
