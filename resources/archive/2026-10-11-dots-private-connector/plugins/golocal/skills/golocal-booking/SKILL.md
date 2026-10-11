---
name: golocal-booking
description: Use the private GoLocal connector to test simulated plumbing search, quotes, booking status and cancellation, or inspect an authorized supplier test connection.
---

Use the installed GoLocal MCP tools. Start with `connector_status` to determine mode and restrictions. The private Dots OAuth grant currently permits only demo mode; a local bearer connection may have different operator-selected supplier tools.

In demo mode, every provider, slot, quote and booking is fictional. State that clearly. Search uses ZIP `84101` and service `plumbing_diagnostic`. Get current slots, then prepare a quote for the chosen slot. Present its exact date/time, time zone, price, expiry and terms before confirmation. Treat the returned time zone as authoritative; do not assume the user's local time zone. Set `user_approved=true` only when the user has approved those details, or explicitly authorized the simulated test lifecycle. Never fabricate IDs or offer availability outside the tools' supported coverage.

Use a new idempotency key for a new confirmation and preserve it for retries of that same quote. A confirmed response must include a booking ID and the simulated state; retrieve status to verify it. Cancel only when requested or explicitly included in the test. Preserve unknown, pending, expired and conflict states and follow returned retry instructions. A timeout is not confirmation.

Supplier read tools report account/job data, not marketplace coverage or available appointments. Housecall Pro is read-only. The Jobber fake-client test write requires a separate operator approval URL and creates no appointment. Actual service booking and payment are unsupported.

If GoLocal tools are missing or authorization expires, report the connection issue and use the host's reconnect flow. Keep all bearer keys, operator credentials, supplier secrets and OAuth tokens outside conversation text. Do not fall back to unrelated plugins or scrape provider websites to imply a GoLocal booking succeeded.
