I'll probe the one public category before reporting, so there's at least some real data here.

**Short version: I can't run these attempts.** In this environment I can't place calls, run booking widgets, fill forms, select slots, or keep a clock. So I have no wall-clock times or checkout funnels to report. Anything in that shape would be fabricated. What I could do was one desk probe of the only public category. Here's the honest log.

### Per-attempt log

| # | Category | Provider / metro / date | Time | Channels | Choke points hit (in order) | Final state | What an API would have removed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Government appointment | SSA, Boston, Oct 4 2026 | Not measured (no clock) | Web search only | **Verification wall:** the slot picker sits behind an application. You start the application online, self-schedule an appointment, then bring documents to the office. **Phone fallback:** if you can't use the online option or aren't offered online scheduling, you call 1-800-772-1213 to book | **Dead end for me.** Getting past the gate means filing a real federal application with your identity, which I won't do as a test. | A public availability query (office, reason, open slots) with no identity needed until the hold step |
| 2-3 | Government appointment | Not run | n/a | n/a | n/a | Not attempted | n/a |
| 4-6 | Institutional travel (Egencia) | Not run | n/a | n/a | Login wall: HBS SSO, plus booking needs a real trip and approver | Not attempted | n/a |
| 7-9 | Facility booking (HBS studio) | Not run | n/a | n/a | Only channel is email to a real staff member. Test requests would waste their time. | Not attempted | n/a |
| 10-12 | Meeting scheduling | Not run | n/a | n/a | Needs a real counterparty's link. Test bookings would put holds on strangers' calendars. | Not attempted | n/a |
| 13-15 | Travel disruption | Not run | n/a | n/a | Not a bookable category | Not attempted | n/a [ssa](https://blog.ssa.gov/a-faster-and-more-convenient-way-to-request-a-social-security-number-and-card/comment-page-4)[ssa](https://blog.ssa.gov/a-faster-and-more-convenient-way-to-request-a-social-security-number-and-card/comment-page-4) |

### Category summary

| Category | Median time to book | Most common choke point | Rail exists? |
| --- | --- | --- | --- |
| Gov appointment (SSA) | Not measured | Verification wall, then phone fallback | **Partial:** online self-scheduling exists, but only after an application, and not for everyone. A third-party blog comment exchange even shows SSA telling a user it had no online appointment scheduler and to call, so coverage looks inconsistent (this is a public comment thread, so weak evidence). |
| Travel / facility / meetings / disruption | Not measured | n/a | Not tested [ssa](https://blog.ssa.gov/a-faster-and-more-convenient-way-to-request-a-social-security-number-and-card/comment-page-4) |

### Two blunt problems with this test design

1. **These are the wrong 5 categories.** My Part A list came from one person's chats and contains zero home services. Validating it tells you nothing about where to build booking middleware.
2. **Wrong agent for the job.** For clocked, click-level funnel data you need an agent that can drive a browser. Claude in Chrome can do that, or you can run the attempts yourself while screen-recording. Either is a 1 to 2 hour job for 15 attempts.

### What I can actually do from here

I can run a **static booking-surface audit** of real Boston providers in the categories that matter: cleaning, lawn/snow, pet grooming, handyman, and plumbing, 3+ providers each. For each provider I'd check:

* Visible FSM or booking software (Jobber, Housecall Pro, Launch27, MoeGo, etc.)
* Whether an all-in price is shown publicly
* Whether a self-serve booking path exists, or it's "call for quote"
* Whether a login is required before seeing slots

That measures where a rail could plug in, not the time to book. Each row would be marked measured.

Want me to run that audit on those 5 home-service categories in Boston?
