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


## Photo-led demo revision · October 11, 2026

Release `d099fef` changes the opening exchange to a photo request, an example customer attachment and a cautious visual assessment. The photo shows a drip at the end of a single-lever kitchen tap; the customer caption establishes continued dripping when turned off. The agent suggests the internal cartridge may not be sealing properly, prepares a service request with the photo, and leaves confirmation to the plumber. Provider selection, approval and confirmation retain the prior behavior.

The example image was generated with the built-in image_gen tool. The source image and exact prompt are included in `website/apps/web/public/demo/dripping-kitchen-tap.png` and `website/docs/photo-demo-asset.txt`. The latter records the official Moen troubleshooting source and distinguishes visible observations from a possible internal cause. These are scripted demonstration steps, not a deployed image-analysis or complaint-submission capability.

Local production build and TypeScript passed. Browser checks verified image loading, photo-to-assessment order, mobile width without horizontal overflow, and Canyon Plumbing selection through the $95 confirmation. The updated credential-free website source bundle contains 98 files.

Production deployment `dpl_FUr6d4VfnnPxyGNhKaFvNEUDQzrS` is READY and assigned to getgolocal.com. The public browser verified the new photo request, loaded image and diagnostic text. Published preview: `golocal-photo-demo-preview.jpg`.


## iMessage-style agent conversation · October 11, 2026

Release `bffa003` presents the booking journey as a conversation with Your local agent in an illustrative iMessage interface. It includes blue outgoing and gray incoming bubbles, an OpenClaw contact avatar, delivery status, a decorative message composer and the existing photo/assessment/selection/approval/confirmation flow. The phone-like treatment appears on the homepage and /demo.

A new agent ecosystem row shows Muse, Instinct, OpenClaw and Hermes. Original founder-supplied deck artwork is copied without alteration; Instinct uses a text wordmark as in the deck. Copy states that GoLocal integrations are in development and channel support varies. OpenClaw lists iMessage; Meta's Muse announcement lists its own app and WhatsApp. Sources and asset provenance are saved in `website/docs/agent-messaging-demo.txt`. No universal live compatibility or third-party endorsement is claimed.

Validation: final Next.js production build and TypeScript passed. Desktop and 390-pixel mobile browser checks verified the photo, contact avatar, readable provider options, approval card and agent-logo row; no horizontal overflow measured. An initial simultaneous build/dev-server check encountered missing generated type files; the final isolated build passed. Source bundle refreshed with 103 files, excluding secrets and build dependencies.

The founder requested ChatGPT Dots during deployment; follow-up release `8495e67` adds it to the ecosystem wordmarks and copy. The isolated production build passed again. Public browser checks of bffa003 confirmed the iMessage booking receipt and closing reply. Final source bundle contains the Dots addition.

Final production deployment: `dpl_73gPsXwxB2kstTd8iWCkezxTnHoJ`, READY, release `8495e67`, assigned to getgolocal.com. The public browser confirmed ChatGPT Dots in the agent row and body copy, alongside Muse, Instinct, OpenClaw and Hermes. Live screenshots are `golocal-imessage-preview.jpg` and `golocal-agent-ecosystem-preview.jpg`.


## Provider metrics, direct booking and availability labels · October 11, 2026

Release `093ac07` adds fictional provider ratings, review counts, bookings in the past seven days, distance and tags. Oak is the agent's My choice, Canyon is Most booked nearby, and Jordan has the lowest visit fee. All three example windows are in the morning. The cards explicitly identify the data as example metrics.

The conversation scopes a dripping kitchen tap, displays a simulated GoLocal MCP search_providers/get_availability call, and presents the provider cards. Selecting one flows directly into a simulated prepare_booking/confirm_booking call and confirmation. The approval chapter and separate approval screen were removed. Diagnostic visit fees remain distinct from repairs quoted separately. These are scripted visuals, with no actual website-triggered MCP request, charge or service booking.

At the founder's direction, only Muse and Instinct have a small asterisk and Coming soon footnote. Dots, OpenClaw and Hermes remain unmarked. The blanket statement that all integrations are in development was removed. This updates website positioning based on the founder's availability clarification, not an independent production booking verification.

Validation: isolated production build and TypeScript passed. Browser checks verified the MCP search call and metrics, and a single click on Canyon flowed automatically into its $95 confirmation without an approval screen. At 390 pixels the transcript and page had no horizontal overflow. The Muse/Instinct stars and footnote were visually checked. Duplicate generated .next/dev type-cache files were moved aside to resolve an initial local build collision; source files were not removed. Source bundle refreshed.

Production verification: deployment `dpl_4aSWUdCh8M9yadWxUz5vv4CNRMQB` is READY and assigned to getgolocal.com and www.getgolocal.com. The public homepage showed the updated three-stage demo, provider metrics, and Muse/Instinct-only asterisks. One click on Canyon Plumbing progressed through the simulated GoLocal MCP booking call to the correct $95 confirmation and closing message, without another approval action. Screenshots: `golocal-provider-metrics-preview.jpg` and `golocal-agent-availability-preview.jpg`. No further user action is needed to publish this release.
