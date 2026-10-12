# GoLocal website launch — October 11, 2026

Current release: `b665bd4`, live at https://getgolocal.com. Business, agent and channel-partner registrations now email pulkitwalia099@gmail.com automatically and are starred/marked Important. All three public forms and actual Gmail delivery were verified October 11, 2026 at approximately 1:50 AM Eastern. See the final activation entry and `golocal-email-verification.json` for evidence.

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


## Photo and tap-age scoping dialogue · October 11, 2026

Release `daf501e` asks for a photo and approximate tap age in the first agent reply. The example customer supplies the existing photo, says the tap is about five years old and notes that it drips when turned off. The shorter assessment refers to both the visible drip and the reported age/symptom, suggests a worn cartridge as a possibility and moves to finding plumbers for tomorrow morning. A plumber still checks the cause on the visit. Provider selection and booking behavior are unchanged.

Validation: production build and TypeScript passed; source bundle refreshed with the exact dialogue update.

Production deployment `dpl_EyaH2288xv7pik8Tb8mn7soKnojq` is READY with getgolocal.com and www.getgolocal.com aliases. The public /demo browser verified the combined photo/age question, customer photo plus five-year age reply, and shortened assessment based on both inputs. Published screenshot: `golocal-two-input-demo-preview.jpg`.


## Email notification setup · October 11, 2026 — awaiting provider approval

The owner requested personal-email notifications for website inputs, marked important or otherwise easy to find. Connected Gmail profile confirms the personal account is pulkitwalia099@gmail.com. Business, agent and channel-partner registration forms share /api/waitlist, which currently saves private Blob records without sending email.

Vercel Marketplace discovery returned Resend email. Its CLI lists a free $0 plan and required sending domain/region. Proposed configuration: existing getgolocal.com domain, US East region, free plan, sender notifications@getgolocal.com, sole alert recipient pulkitwalia099@gmail.com, reply-to set to the registrant email. Alerts would include audience, name, email, company and submitted service/location/software/use-case details. Existing private storage would remain. SMTP/API configuration and end-to-end delivery have not been set up or tested.

Automatic approval review rejected the Resend installation: it creates a production provider account/integration and secrets, with possible billing/delivery consequences; specific provider/provisioning approval is required. No installation occurred and no source change or new deployment was made. An explicit approval request for the free setup is pending. Official setup reference: https://resend.com/docs/guides/vercel-marketplace-integration .

Completed independently: Gmail filter from:(notifications@getgolocal.com), actions Star it and Mark it as important. Gmail confirmed Your filter was created and showed the saved rule in Settings. Screenshot: golocal-email-rule-preview.png. Existing Gmail filters remain in place. This rule is ready for the planned sender; website notifications are not yet live.


## Email notifications prepared · October 11, 2026 — awaiting restricted credential approval

The founder approved free Resend setup and acceptance of the provider/Marketplace terms. Terms were accepted, but Vercel Marketplace rejected the free plan as disabled and offered only paid plans. No paid plan was selected and no paid provider resource was created. The existing direct Resend account is on Free (observed 100 transactional emails/day and 3,000/month; quota shared with its other applications). GoLocal was added as its third domain. The exact required DKIM TXT and send/rsend CNAME records were added through Vercel DNS; public DNS and Resend verified getgolocal.com. Existing website routing records were preserved.

The notification implementation is committed locally as `b665bd4`, not pushed or deployed yet. All three public registration audiences email pulkitwalia099@gmail.com from notifications@getgolocal.com, with registrant Reply-To, every submitted field, consent and timestamp. Changed details generate a new notification; identical retries are deduplicated. The immutable private registration is a durable outbox, successful sends receive private receipts, and an authenticated daily Vercel cron retries outstanding emails. CRON_SECRET is installed in Production as Sensitive. The privacy notice describes Resend/Gmail processing, and website contact links now point to the personal inbox in the prepared release. A pre-existing legacy payment route's params type was updated to the Next.js 16 Promise form to pass full build checks.

Validation: eight notification tests pass, including all audiences, fixed recipient, plain-text/header safety, provider outage, receipt-write outage, duplicate suppression, missing records and provider response/idempotency handling. Webpack production build and TypeScript pass. Local Turbopack was prevented from binding a subprocess port even with escalation; no app source error was reported in that attempt. Cloud deployment and actual delivery verification remain pending.

A sending-only key dialog is prepared and restricted to getgolocal.com. Browser security rules require confirmation before creating this persistent credential; an explicit approval question was sent. No key has yet been created, RESEND_API_KEY is not installed, and the existing live release daf501e continues serving the website. Email alerts are not yet active. After approval: create/store the restricted key securely, push the prepared commit to main, verify production deployment and submit a clearly synthetic registration to confirm Gmail delivery plus IMPORTANT and STARRED labels.

The Gmail filter from:(notifications@getgolocal.com) → Star it, Mark it as important is already saved. No spam/security bypass rule was added. Proof: output/golocal-email-rule-preview.png. Restricted-key preview: output/golocal-email-key-approval.jpg.

Operational limits: direct Free provider limits apply; saved pending messages retry daily. The launch retry scan is bounded to 45 seconds and needs a paginated worker if volume grows. A delivered message whose receipt cannot be stored for over Resend's 24-hour idempotency window can be duplicated. Provider acceptance does not guarantee future inbox delivery. Earlier registrations are preserved and not retroactively emailed; the illustrative booking demo makes no real submissions. Details and official references: website/docs/registration-email-notifications.md.

The source bundle was refreshed with the prepared notification implementation, excluding credentials, dependencies and generated builds. This bundle is ahead of the currently deployed release until activation. Exact before/after artifacts are archived locally; the working Page was not changed.


## Email notifications activated · October 11, 2026 — live and verified

The founder approved the prepared domain-restricted sending key. It was created in the existing direct Resend Free account with Sending access for getgolocal.com only, then installed in the GoLocal Vercel project as Sensitive RESEND_API_KEY. CRON_SECRET is also Sensitive; neither secret appears in source, report, screenshots or bundles. No paid plan or overage option was selected.

Release `b665bd4` was pushed to GitHub main. Vercel production deployment `dpl_BRnUEkmY1SrJaHz5XDpVX9XALVq4` (https://homebase-agent-booking-89xq4p6mg-pulkitwalia099s-projects.vercel.app) is READY and serves getgolocal.com and www.getgolocal.com. The cloud Turbopack build and TypeScript passed. Vercel confirms the daily retry cron definition at 09:00 UTC (5 AM Eastern Daylight Time, within Hobby scheduling precision). This supersedes the pending-credential and undeployed observations above.

All three public registration forms were tested through the deployed website with clearly synthetic Do Not Onboard entries using the founder's test-tagged Gmail address. Each showed a saved-registration success screen. Each delivered one alert to pulkitwalia099@gmail.com with the expected audience-specific details, consent and timestamp. Gmail independently reported IMPORTANT, STARRED and INBOX on all three messages. The visible inbox confirms the tags were applied by the saved importance filter. Reply-To uses the registrant's email. The business test message passed SPF and domain DKIM authentication.

Repeating the identical business test POST returned 200 success and produced no fourth email. An unauthenticated GET to the retry endpoint returned 401. Authenticated retry returned 200 with sent=0, pending=0 after all three form tests, confirming stored receipts suppress duplicate sends. The production project reports its cron definition enabled for this release. No real service, onboarding or booking was requested; the three test registrations remain clearly identified in private storage.

Proof saved in project files: `output/golocal-email-alerts-verified.jpg` (all three starred/important alerts), `output/golocal-email-delivery-proof.jpg` (full business notification details), `output/golocal-registration-success.jpg` (public form success), and `output/golocal-email-verification.json` (compact verification evidence). The 108-file credential-free website source bundle now matches the deployed notification release. README's website section is updated; exact before and completed artifacts are archived. The working Page and thesis were not changed by this activation.

Automatic notifications are active for future valid business, agent-company and channel-partner registrations, including changed details from the same registrant. Direct contact links open the personal Gmail address. Earlier registrations are not retroactively emailed. The scripted booking demo does not collect real booking inputs. The direct Free limits observed during setup remain 100 emails/day and 3,000/month shared across the Resend account; saved pending alerts retry daily if delivery is temporarily unavailable. No further action is needed to activate this release.

## GoLocal protected connector relay published · October 11, 2026

The founder approved publishing the reviewed REST relay and processing its existing one-day Muse GoLocal credential and synthetic test data through Vercel to the local backend. Release `780903cf0c4840895c476c39cc953ee61649bef9` was pushed to main; deployment `dpl_HDBzDG75852aYkLcDJThjvsmt4DL` is READY and serves getgolocal.com. The website source bundle now contains 111 files, including the three relay implementation/test files; secrets, dependencies and build outputs are excluded. The public UI and registration notification behavior are unchanged.

Live route checks at https://getgolocal.com/api/connector passed: public integration 200, unauthenticated and incorrect-key private schema requests 401, valid schema request 200, and bound-company read 200. Six relay security tests and the production build/TypeScript passed before publication. Only the existing GoLocal credential verifier and expiry are stored as Sensitive production configuration. Supplier credentials and encrypted state remain local. The seven fixed operations still require the local backend and ngrok to be online; this is not durable hosted supplier execution. Muse end-to-end execution remains pending at this observation. Evidence: `output/muse-golocal-relay-live-results.json`.

### Muse relay execution completed · October 11, 2026

The published relay was tested through actual Muse execution. Secure reconnect of the same GoLocal credential corrected its original host binding; sequential 90-second client timeouts accommodated per-request approvals. Muse completed the controlled lifecycle: one $0 synthetic Job #3, identical quote/key replay returning the same record, and schedule removal. Independent API and vendor dashboard checks confirm Unscheduled/needs scheduling, null timestamps, notifications off, total $0 and charged $0. All three pilot job operations are used; no further creates. This supersedes the pending-Muse observation above. Evidence: `output/muse-golocal-e2e-results.json` and screenshots/report. Credential expiry remains October 12, 1:48 a.m. Eastern. The relay still depends on the local backend/tunnel, and this test establishes no real service fulfillment or production multi-supplier routing. Spend $0; main theses and working Page unchanged.


## Animated hero published · October 11, 2026

Release `088ab38d60da09f4647b30492b582f8faa728634` is live on getgolocal.com and www.getgolocal.com. Vercel deployment `dpl_7uiJdXBcrBN7Ef4wztpFvhLBD6cF` is READY. The homepage now plays a continuously looping miniature neighborhood with the personal-agent message “Just take care of the house for me.” followed by a typing indicator and “On it. I’ll coordinate the right local pros.” The separate https://getgolocal.com/hero-preview page lets the founder switch between this version and the living-neighborhood version without the conversation.

Both clips were generated in Higgsfield using Kling 3.0, eight seconds, 4K, with the approved original artwork as start and end frames and audio disabled. Two confirmed generations quoted 48 credits each: 96 total against the founder’s 350-credit maximum, leaving 254 authorized credits unused. No subscription, upgrade or credit purchase was made. Final account balance was not independently verified. Original masters and exact prompts are retained in output/hero-masters and output/golocal-hero-generation-prompts.json.

The original scene and cream/forest-green style are preserved. The gardener makes a visible mowing pass; the roofer, van worker and technicians have smaller working motions. Generated tool handling is approximate. This is an illustrative brand animation, not evidence of a real coordinated booking. Website bubbles are HTML rather than rendered video text, keeping them readable on mobile. Silent H.264 exports are 1920 × 1082, 24 fps, approximately 797 KB each, with faststart. The homepage loads only its selected clip.

Validation: final webpack production build and TypeScript passed; Vercel cloud deployment is READY; both clips played on the actual custom domain without media errors; pause/resume and version switching passed; desktop and 390px mobile layouts were visually inspected. Loop, muted playback and duration were confirmed from the live player. Reduced-motion fallback, offscreen/hidden-tab pausing and video-error fallback were audited in the implementation; reduced-motion browser preference switching was not automated.

Project files now include the 117-file credential-free website source bundle, the original masters, prompts, live screenshot and output/golocal-hero-verification.json. README and this report were updated locally and exact completed artifacts archived. Existing registration email alerts and connector routes were preserved. The working Page and theses were not changed.
