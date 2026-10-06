I'll check what's actually in your own chat history before answering, since that's the only booking record I have.

**Bottom line first:** I have no fleet-wide logs. I only see this account's chat history, and I've never completed a booking myself. In that history, booking-type requests are rare: 5 found across Mar 2025 to Jun 2026, and **zero in the last 90 days** (Jul 6 to Oct 4, 2026). That's too few to rank segments on. The most useful signal is a negative one: across all the HomeBase / home-services research chats, there is **not one actual request to book a home service**.

Treat everything below as n=1 user, n≈5 requests. My searches were keyword-based, so I may have missed a few.

### Part A + B + C: one table

M = measured from chat history. E = estimate or judgment, not task data. "Unk" = I don't know, so I'm not filling it in.

| Category | Requests (M) | Unique users (M) | Done w/o phone by me (M) | Needed phone (M) | Abandoned (M) | One-off vs recurring (M) | a. Scope std (E) | b. Price transp. (E) | c. Frequency (E) | d. Ticket $ | e. Supply software | f. Actual choke point (M) | Fallback used (M) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Institutional travel change (HBS trip, via Egencia) | 2 chats (Apr 2026) | 1 | 0% (I can't book) | 0 observed | 0 | One-off | 4 | 3 | 1 | **$889.89 (M)** | Egencia (M) | Approval chain + credit rules: budget approver separate from booking agent, credit expiry date | Drafted emails to approver and agent |
| Facility / room booking (HBS studio) | 1 (Jun 2026) | 1 | 0% | 0 observed | 0 | One-off | 5 | 5 | 1 | Unk | Email to studio manager (M) | Access gatekeeping: studio is for staff/faculty, needed an intro + program affiliation to qualify | Drafted email |
| Government appointment (SSA SSN) | 1 (Jun 2026) | 1 | 0% | Unk (I suggested scheduler or phone) | 0 | One-off | 5 | 5 (free) | 1 | $0 (application is free) | SSA scheduler / phone | No live availability shown across offices, so slot-hunting across locations | Gave guidance, user acted |
| Meeting scheduling (founder intro call) | 1 (Mar 2025) | 1 | 0% | 0 | 0 | Recurring type, one-off instance | 5 | n/a | High (E) | $0 | Email back-and-forth (M) | Time-slot ping-pong across time zones | Drafted reply |
| Travel disruption (UK transit ETA at check-in) | 1 (May 2026) | 1 | n/a, not a booking | 0 | 0 | One-off | n/a | n/a | n/a | n/a | Airline check-in | Airline site didn't recognize visa exemption | Advice only |
| Home services (plumbing, cleaning, etc.) | **0** | 0 | n/a | n/a | n/a | n/a | No task evidence | No task evidence | No task evidence | No task evidence | No task evidence | No task evidence | None |

**Part C, missing-rail list (all measured counts):**

| Category | Times in period | What a structured booking API would have changed |
| --- | --- | --- |
| Institutional travel change | 2 | Little: the blocker was a human budget approval, not booking. An API would need an approval-state field to help. |
| Facility booking | 1 | Real help if it exposed eligibility rules and open slots, since the email existed only to ask "can I, and when." |
| Government appointment | 1 | Big: cross-office availability in one query would have replaced manual office-by-office checking. |
| Meeting scheduling | 1 | Moderate: already solved by Calendly-type tools, not a gap worth building for. |

**Pattern across all of them:** the friction was **permission and policy** (who approves, who's eligible, what budget applies), not finding a slot. That's a design note for your rail. It needs to carry eligibility and approval states, not just availability.

### Part D: my constraints in this environment

| Capability | Status | Implication for your rail |
| --- | --- | --- |
| Phone calls | **Cannot** place or receive | Any category that needs a call is fully blocked for me. A rail removes 100% of that. |
| Payments | Cannot hold cards or pay | Rail needs a user-side payment token, a payment link, or pay-on-completion. |
| Account creation / login walls | Cannot create accounts or pass logins | Provider-side accounts must be handled by the rail. |
| Email | Can draft. Can send only through a connected Gmail, with the user in the loop | Email is my current fallback for every booking. |
| Calendar | Can create events through a connected Google Calendar | I can write a confirmed booking into the calendar if the rail returns structured confirmation data. |
| MCP tools | **Can call them directly** | An MCP booking rail is natively usable by me. This is the strongest point for your design. |
| Web browsing to fill forms | Not in this session (separate Chrome agent product exists) | Form-filling fallback mostly unavailable here. |

### Top 10 most painful missing rails

**This is judgment (E), not task data.** Only items marked ★ appear in my history at all.

| Rank | Rail | Why |
| --- | --- | --- |
| 1 | Recurring home cleaning | Structured scope (beds, baths, frequency), often flat pricing, recurring, FSM tools in use |
| 2 | ★ Government / civic appointments | Free, fully structured, availability is the whole problem |
| 3 | Lawn / snow recurring service | Structured by lot size, seasonal recurrence |
| 4 | Pet grooming / boarding | Structured (breed, size, dates), recurring |
| 5 | Salon / barber | Already well covered by Booksy/Vagaro-type tools, so this is aggregation, not a new rail |
| 6 | Medical / dental non-urgent | High value, but insurance and intake forms add a lot of friction |
| 7 | ★ Institutional / facility booking | Eligibility gating is the pain point |
| 8 | Handyman small jobs | Semi-structured, price usually needs a description |
| 9 | Plumbing / HVAC repair | Low scope standardization, price needs diagnosis, mostly one-off |
| 10 | ★ Policy-bound travel changes | Approval is the blocker, booking isn't |

**Blunt note:** on scope standardization, price transparency, and frequency, plumbing scores near the bottom. It's the hardest category for a pure booking rail, which cuts against a plumbing-first beachhead unless the fixed-price price book does the heavy lifting.

**First booking API I'd want:** recurring home cleaning (E). It has the fewest fields needing a conversation, the highest repeat rate, and the clearest all-in price of any home-services category.
