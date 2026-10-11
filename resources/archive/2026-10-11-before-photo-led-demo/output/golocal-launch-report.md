# GoLocal website launch — October 11, 2026

The website is live at https://getgolocal.com. Public HTTPS and the www redirect were verified October 11, 2026 at 04:36–04:37 UTC. Earlier DNS observations below are retained as launch history.

## Release

- Repository: https://github.com/Pulkitwalia099/homebase
- Main commit: `a51b5aa` (branding cleanup), following `3f970a7` (website launch).
- Project: `homebase-agent-booking`, team `pulkitwalia099s-projects`.
- Production deployment: https://homebase-agent-booking-bp2hima45-pulkitwalia099s-projects.vercel.app
- Deployment ID: `dpl_Am43jR86bgbvt3iBLhnmaZ7D9BkR`, READY.
- Intended public domain: https://getgolocal.com
- www.getgolocal.com redirects to getgolocal.com with HTTP 308.
- Vercel project root: `apps/web`; framework Next.js; connected source repo corrected to `Pulkitwalia099/homebase`.

## Delivered

- New GoLocal logo and deck-based forest, cream and sage palette; deck neighborhood illustration.
- Responsive homepage, business / agent / channel partner pages, registration and privacy pages.
- Interactive connection diagram and clearly labeled illustrative booking walkthrough.
- Official-source connector setup guide at `/connectors` and research in `docs/connector-research-2026-10-10.md`.
- Real registration persistence in private Vercel Blob store `golocal-registrations`.
- GoLocal social preview, favicon, canonical homepage, sitemap and robots metadata.
- Old public booking prototype routes redirect to the illustrative demo.

## Validation

- Local and Vercel production builds passed; TypeScript passed; npm audit reported zero vulnerabilities.
- Desktop and mobile browser checks passed, including mobile menu and form submission.
- All three audience submissions persisted; duplicate email/audience submissions are idempotent.
- Invalid audience and missing consent returned HTTP 400.
- Hosted homepage and connector guide returned HTTP 200 using Vercel authenticated verification.
- Hosted registration returned HTTP 201 and was verified in private storage.
- The four synthetic verification records were removed. Real registrations were not changed.
- No error logs were returned for the verified launch deployment during the post-deployment scan.

## Operations

Review incoming registrations under Vercel → Storage → golocal-registrations → registrations. Records remain private; no automated email notification is sent. The first registration for an email/audience is retained rather than overwritten.

Registration starts onboarding. No live MCP booking endpoint, customer account system or authorized business-software booking integration was represented as deployed.

## Domain status

Vercel records a successful domain purchase and the production deployment has both custom aliases. The initial public DNS checks returned NXDOMAIN and Vercel showed intended nameservers ns1.vercel-dns.com / ns2.vercel-dns.com with no public nameservers. Direct HTTPS could not complete while activation was pending. Final registrar check is recorded below.

A separate manual update to the legacy vercel.app alias was rejected by automatic approval review; no manual update was performed. The existing Git integration subsequently assigned its configured project aliases automatically during the authorized source deployment.

The existing Git integration automatically assigned https://homebase-agent-booking.vercel.app to the new production release. This address was verified publicly with HTTP 200 and a browser, without authentication. The registration endpoint accepted that origin and returned the expected validation error for an empty request. A production screenshot is saved as `golocal-website-preview.jpg`.

Final check at approximately 2026-10-11 04:11 UTC: Vercel registrant verification returned `verified: true`. No registrant email action was indicated. The authoritative .com nameserver still returned NXDOMAIN, so getgolocal.com was not yet publicly reachable. The remaining dependency is registrar/DNS publication, followed by automatic HTTPS issuance. Public Vercel production URL remains available.


## Conversational demo release · October 11, 2026, 04:37 UTC

- Live website: https://getgolocal.com
- Interactive demo: https://getgolocal.com/demo (also embedded in the homepage).
- Production commit: `e58767f4d7f06323369b7fdb0deb5aacbd55d6f5`.
- Deployment: https://homebase-agent-booking-dv30r9a3o-pulkitwalia099s-projects.vercel.app
- Deployment ID: `dpl_EMB23YCEwg8CgiH6A448YmighmLo`; target production; status READY; Next.js.

The booking walkthrough now unfolds as an approximately 30-second conversation with typing indicators, provider comparisons, customer approval, a booking receipt and a closing agent reply. Visitors can select a fictional provider, approve an example visit, pause, replay or step through each message. Playback pauses outside the viewport, when the browser tab is hidden, or when visitors scroll the transcript. Reduced-motion preferences suppress automatic playback. The conversation explicitly identifies fictional providers and prices and does not send real booking requests.

Validation: production build and TypeScript passed. Desktop and 390-pixel phone layouts were checked; no horizontal overflow was measured. Provider selection carried the correct name, price and time through approval and confirmation. Pause/replay and automatic progression worked. The public custom-domain browser showed the new interface; Canyon Plumbing’s $95 example was selected and approved on the deployed page. Post-deploy Vercel error scan returned no logs.

Domain activation: nameservers now resolve to ns1.vercel-dns.com and ns2.vercel-dns.com. Vercel reports configured correctly and verified for this project. https://getgolocal.com returned HTTP 200 with valid HTTPS; https://www.getgolocal.com returned 308 to the apex. This supersedes all pending DNS/certificate observations above. No further user action is needed to launch this release.

Project files: refreshed `golocal-website-source.zip` (96 source/assets/research files; no environment credentials or generated dependencies), plus `golocal-live-demo-preview.jpg`. Before and completed artifacts are preserved in resources/archive.
