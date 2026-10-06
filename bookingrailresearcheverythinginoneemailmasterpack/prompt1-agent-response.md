# Prompt 1 — Agent task-history response (Muse, personal agent for Pulkit)

Answered from my own records of work with a single user (Pulkit) over the last ~90 days (Jul–Oct 2026).
Honesty note up front: this is a sample of **one user and a handful of requests**, not a fleet log. Every number
below is measured from my records unless marked *estimated*. Small-n caveats are stated where they matter —
per the prompt's own warning, a thin table honestly labeled beats a padded one.

## PART A — The booking request universe (last 90 days)

| # | Category | Requests | Unique users | Completed, no phone call | Required a phone call | Abandoned once friction was clear | Demand pattern |
|---|----------|----------|--------------|--------------------------|-----------------------|-----------------------------------|----------------|
| 1 | Air travel (flight booking help: verify, rebook advice, track) | 4 (measured) | 1 | 100% — bookings completed online; my role was verification/tracking | 0% completed by phone (I advised calling AA for an endorsement; user self-served online instead) | 0% | Recurring — user anticipates ~4 US trips over 5 years (measured, stated 2026-09-20) |
| 2 | Home services — plumber (Cambridge, MA) | 1 (measured) | 1 | 0% — never completed | 0% — never got far enough to call; stalled at web research | 100% — stalled ~2 weeks awaiting issue description + timing; no booking made | One-off per issue; recurring category over time (*estimated*) |

No other booking/scheduling/reservation requests appear in my records for the period. (Hotel/hostel costs appear
only in Splitwise expense tracking from summer 2026 — I did not book them. Restaurant reservations: none requested.)

## PART B — Category scores (1–5, evidence for each)

### 1. Air travel

| Dimension | Score | Evidence |
|-----------|-------|----------|
| a. Scope standardization | 5 | Origin, destination, dates, times, passenger count are fully structured fields; no description conversation needed (measured — every request was expressible as fields) |
| b. Price transparency | 5 | All-in price displayed before purchase on airline/OTA sites (measured: $806.40 AA round trip, $503.40 Delta one-way seen directly) |
| c. Frequency | 3 | ~0.8 trips/year anticipated (measured from user's stated travel plans) — moderate |
| d. Typical ticket size | 4 | $400–$800 observed (measured) |
| e. Supply software | 5 (mature) | Airline direct sites + GDS/NDC distribution; online booking universal in category (measured/industry fact) |
| f. Failure modes | — | Could not verify the Delta booking without a user-supplied screenshot (no PNR access from my side — measured); refund confirmation took 4 days to arrive by email ($403.20, issued 2026-09-24 — measured). No phone menus or voicemail encountered. |

### 2. Plumber / home services

| Dimension | Score | Evidence |
|-----------|-------|----------|
| a. Scope standardization | 2 | The request stalled precisely because scoping needed a description conversation ("what's the plumbing issue?") that never happened (measured) |
| b. Price transparency | 2 | No upfront pricing found on any of the three surfaced shops' sites during my search; quote/site-visit is the norm (measured from my search; *generalized with care*) |
| c. Frequency | 3 | Household need recurs but irregularly (*estimated*) |
| d. Typical ticket size | 3 | Typical range $150–$400 (*estimated* — industry knowledge, not from my records) |
| e. Supply software | ? (not observed) | I did not observe which software the three shops use. Housecall Pro / Jobber are common in the category (*general knowledge, estimated*) — I cannot score this from my records |
| f. Failure modes (measured) | — | No online booking path found for the surfaced options; no live availability data; stalled on scoping questions; no login wall or payment handoff ever reached |

## PART C — The missing-rail list

| Category | Times in period | What a direct structured booking API would have changed |
|----------|-----------------|--------------------------------------------------------|
| Plumber / home-service booking | 1 | I could have booked a slot with date/time/address/issue-category directly instead of stalling for two weeks on scoping questions — the entire failure was the absence of a structured path from intent to confirmed slot |

## PART D — My platform constraints

- **Phone calls:** I cannot place voice calls at all. Any category whose completion path runs through a phone call is a dead end for me, not a friction to optimize.
- **Web browsing & forms:** I can browse sites, check availability, and fill web forms/booking widgets.
- **Payments:** I can complete web checkouts, but *every* purchase or paid booking needs the user's explicit per-transaction approval first (his standing rule). I never enter SSN, date of birth, or income, and never submit financial applications.
- **Accounts:** I create accounts only with explicit approval.
- **Messaging:** I can send emails/messages on his behalf with approval; unapproved outreach is off-limits.

## OUTPUT — ranked missing rails & first pick

Ranked most-painful missing rails (from my records — short list, honestly labeled):

1. **Home-services booking (plumber/HVAC/electrical)** — the only category that actually failed in my history; 100% abandonment on 1 request; failure was structural (no structured booking path), not effort.
2. **Flight booking verification** — not a missing rail so much as a missing *read* API: I could not verify a PNR without the user screenshotting it. A booking rail that also exposes read/status would have closed this.

**Single category I'd want a booking API for first: home-services booking (plumber/HVAC).**
Reason: it is the only category in my history where the absence of a rail caused total failure, and its failure mode (no structured fields, no live availability, quote-by-conversation) is exactly what the proposed rail deletes.

**Caveat for the founder:** my n is tiny (1 user, 2 categories). Treat this response as a single anecdotal data point —
useful for convergence-checking against larger agents' logs, not as standalone evidence for the wedge.
