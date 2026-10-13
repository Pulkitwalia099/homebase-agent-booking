# ChatGPT customer-to-supplier test

Verified October 13, 2026. The actual ChatGPT agent flow passed: customer OAuth → supplier search → exact offer → customer approval → pending request → supplier acceptance → a separate ChatGPT MCP status read showing confirmed. No service, vendor job or payment occurred.

## Open the completed demonstration

- [ChatGPT conversation](https://chatgpt.com/c/6acde1b6-29ac-83e9-9185-5e3c3857fdd1)
- [Connected private GoLocal app](https://chatgpt.com/plugins/plugin_asdk_app_6acde11c769c819190f47c0d5dfe0f0b)
- [Request page](https://camryn-mechanomorphic-ellis.ngrok-free.dev/assisted/bookings/booking_89f3b5d3-3e95-44a1-8132-ebbb8a5805f1)
- [Structured verification](../../../output/golocal-assisted-chatgpt-e2e-verification.json)

The request page shows customer status or supplier review according to the signed-in account. It does not grant access merely because someone has the link. The supplier is signed into the in-app browser; the customer ChatGPT conversation is open in Chrome.

## What passed

| Step | Actual result |
| --- | --- |
| Connection | Private GoLocal custom MCP app, OAuth DCR, only `golocal:assisted`; customer account `pulkitwalia099@gmail.com` |
| Supplier search | Two participating test suppliers returned for plumbing diagnostics in ZIP 84101 |
| Exact offer | Demo Plumbing A — Test Only; $95 diagnostic; October 16, 2026, 2–3 p.m. America/Denver; scope and cancellation terms displayed |
| Customer approval | Exact quote approved, with synthetic name/phone/address and an explicit retry key; ChatGPT's data-sharing prompt approved with **Allow once** |
| Submission | `booking_89f3b5d3-3e95-44a1-8132-ebbb8a5805f1`, verified `pending_supplier` |
| Supplier review | Supplier A account `pulkitwalia099+golocal-supplier-a@gmail.com` saw that exact request and accepted it using the test-only checkbox |
| Final agent read | ChatGPT separately read `confirmed`, `confirmationSource=supplier_portal_acceptance`, `testOnly=true`, `amountCharged=0`, `vendorSync=not_connected` |
| Notifications | Supplier pending-request email and customer confirmation email both delivered to the founder-controlled Gmail inbox |

Quote: `quote_10ca9459-760d-41b3-8431-f45fb65f5306`. Retry key: `chatgpt-assisted-e2e-20261013-01`. One request submitted; no extra confirmation retry was run in this live test. Automated tests cover idempotency and isolation. The frozen offer is illustrative, not live crew availability.

## Repeat the flow

1. Use the connected **GoLocal** app in ChatGPT. The older **GoLocal Connector Test** connection still carries the demo scope and cannot authorize assisted customer access. No old app was deleted or broadened.
2. Ask: “Use GoLocal to find participating test plumbers in ZIP 84101 and prepare a diagnostic offer for Demo Plumbing A at [a future date/time] in America/Denver. Show the exact price and terms before submitting.” Choose a time more than one hour ahead, within 90 days.
3. Approve the exact offer and sharing the customer details. For a synthetic demonstration, use `555-0100` and a clearly fake test address. Google/email identity supplies the verified account email. Expect a one-time ChatGPT permission prompt for sharing contact information; use **Allow once**.
4. Submit through the agent with a new retry key. Preserve that key for any retry of the same request. The result must be pending supplier, not confirmed.
5. In the separately signed-in supplier account, open **Requests for your business**, review the request, check the test-only acceptance box and select **Accept request**.
6. Ask ChatGPT to fetch that booking ID's status again. Success requires a returned confirmation source from supplier acceptance and the same booking ID. Emails notify both sides; they do not replace the status read.

For a new personal-agent account, add a custom MCP server named **GoLocal**, URL `https://camryn-mechanomorphic-ellis.ngrok-free.dev/mcp`, OAuth, Dynamic Client Registration and scope `golocal:assisted`. Sign into the GoLocal account and approve the customer grant. The app created in this test is private to the founder; no directory listing or broad public distribution was submitted.

## What the test taught us

- Cached OAuth settings matter: the old demo app requested `golocal:demo`. The new assisted app discovered the correct scope and linked successfully.
- Google removes the sign-in email step for customer identity. This run reused the already signed-in verified customer session; live Google was tested separately. A fresh Google sign-in nested within ChatGPT authorization remains verified by automated HTTP tests only.
- ChatGPT paused once to confirm sharing the synthetic name, phone and address. No standing permissions or global defaults were changed.
- The current tool response calls the shared role-aware request page `statusUrl`. ChatGPT could not identify a distinct supplier review link, while the supplier email and portal correctly opened the owner review. A clearer tool description or supplier-review field would reduce this ambiguity in a later refinement.
- Supplier sign-in used an email alias because Gmail aliases are not separate Google identities. Real suppliers can use their own Google account, subject to the app's current testing configuration.

All 57 connector tests passed in the preceding implementation turn. This live verification changed no application code. It establishes this explicitly invoked synthetic ChatGPT workflow, not unaided agent selection, representative demand, real fulfillment, CRM scheduling or paid continuation. The machine, local process and ngrok tunnel must remain running. The business thesis and working Page are unchanged.
