Scope and reliability

I cannot provide a platform-wide booking-demand dataset. I do not have access to other users’ conversations or an aggregate execution log. I searched the retained history available for this account for July 6 through October 4, 2026. That retrieval is not an exhaustive export of every conversation.

The retrieved records contain two service-booking capability inquiries from the same one user, but no verified service-booking execution attempt. They also contain one explicit request to schedule an email, which I show separately because scheduling a message is not booking a provider.

Those distinctions matter: “Can you book this for me?” is evidence of interest, not evidence of an attempted transaction, a provider-side failure, or abandonment. An assistant’s statement that it cannot book also does not establish that the provider lacks an API.

Labels: M = measured within the retrieved records only; E = estimated judgment, with its basis stated; U = unavailable, not zero; N/A = not applicable. A third label is necessary because missing evidence is neither a measurement nor a defensible estimate. Scores run from 1, low, to 5, high; failure severity would run from 1, minor, to 5, blocking. I leave scores unavailable rather than manufacture them.

Parts A–C: Retrieved request universe and missing-rail evidence

The two service categories are tied by retrieved inquiry count. The email-scheduling row is outside the service-booking ranking. Unique users are not additive: all rows concern the same user.

Rank / category	Requests found	Unique users	Verified booking execution attempts	Share completed without a phone call	Share requiring a phone call	Share abandoned because of friction	One-off or recurring per user	Scope standardization, 1–5	Price transparency, 1–5	Household frequency, 1–5	Typical ticket, dollars / ticket score	Provider software / software score, 1–5	Actual choke point / severity score, 1–5	Phone fallbacks used to finish, count	Web-browsing fallbacks used to finish, count	Manual-form fallbacks used to finish, count	What a structured booking API would have changed
Tied: Hotel reservations	1 M capability inquiry, July 16: asked whether I could book a hotel directly. No property, dates, or reservation instruction was subsequently recorded in the retrieved exchange.	1 M	0 M found	U. No executed booking with a known outcome.	U. No evidence that a telephone call was necessary.	U. No explicit abandonment attributable to friction.	U. One retrieved inquiry does not establish one-off demand.	5 E, conditional on the user selecting an offering: property, room/rate, dates, guests, and permitted total can be expressed as fields. This is task-structure reasoning, not a tested integration.	U. No actual rate or all-in quote was retrieved.	U. No household repeat-frequency evidence.	U / U. No transaction value recorded.	U / U. No provider booking engine identified in this exchange.	M: the prior assistant stated it could not complete the reservation or enter payment information. Severity U: a stated capability limitation, not an observed provider or checkout failure.	U. No completed fallback recorded.	U. No completed fallback recorded.	U. No completed fallback recorded.	E: an authorized availability, quote, and booking interface could have enabled execution after collecting the missing details, but the record cannot establish that an API alone would have resolved payment and authorization.
Tied: Telehealth appointments	1 M capability inquiry, July 16: asked whether I could book directly, following discussion of telehealth apps. No selected provider, appointment time, or completed booking recorded.	1 M	0 M found	U. No executed booking with a known outcome.	U. No evidence that a telephone call was necessary.	U. No explicit abandonment attributable to friction.	U. No repeat booking episodes recovered.	3 E, conditional on appointment type and eligibility already being resolved: patient, provider, visit type, and time can be fields, but the retrieved request did not establish the required intake.	U. No actual cash price, coverage determination, or all-in quote retrieved.	U. No household repeat-frequency evidence.	U / U. No transaction value recorded.	U / U. No provider scheduling system identified in this exchange.	M: the prior assistant stated it could not connect to the apps or confirm an appointment. Severity U: no attempted integration or provider-side failure recorded.	U. No completed fallback recorded.	U. No completed fallback recorded.	U. No completed fallback recorded.	E: an authorized scheduling interface could have exposed bookable appointments and returned a confirmation, subject to obtaining the required patient information and consent.
Outside service-booking ranking: Scheduled cancellation email	1 M execution request, August 24: asked to schedule a Gmail cancellation message for 7:30 a.m.	1 M	N/A. This was a message-scheduling task, not a provider reservation.	U. Successful scheduling or delivery was not recorded.	U. No call requirement recorded.	U. No explicit abandonment recorded.	U. One retrieved task.	5 E for the scheduling operation: recipient, message, send time, and time zone are structured fields. Any conditional-send requirement needs separate handling.	N/A	N/A	N/A / N/A. Not a paid service booking.	M: Gmail was explicitly named. Software score N/A: not provider booking software.	M: the prior assistant said it could not set Gmail’s scheduled send. Severity U: no successful or failed scheduling tool execution recorded.	U. No completed fallback recorded.	U. No completed fallback recorded.	U. No completed fallback recorded.	E: a scheduled-message action could have addressed the execution gap; a provider booking API would not have addressed the requested operation.

Exclusions: I did not count appointment or travel confirmations as assistant-made bookings without a corresponding assistant task. I also excluded meeting-cancellation drafting, promotional invitations, and research about booking infrastructure. A drafted cancellation is not an executed cancellation.

Part C conclusion: I found no verified case in the retrieved records where I completed a booking by falling back to a telephone call, web browsing, or manual form submission. That does not establish a zero fallback rate over the period. The records do not supply the necessary execution coverage or outcome denominator.

In particular, I cannot substantiate voicemail rates, quote ping-pong, missing live availability, phone-menu failures, login-wall incidence, payment-handoff failure rates, or stale-confirmation incidence from this sample.

Part D: Constraints that shape what a rail could remove

These are current-session capabilities and constraints, not an assertion that the same capabilities existed during the July and August exchanges. App availability and permissions can differ by account, interface, workspace, and provider connection. 
OpenAI Help Center

Telephone calls. No callable telephone action is exposed in this session’s tool inventory. Consequently, my inability to place a call cannot be used to infer either that a supplier required one or that telephone booking is forbidden across every configuration of the platform.

Bookings and calendar changes. The Google Calendar tools exposed here support availability checks and authorized event creation, updates, cancellation, and invitation responses. Those are calendar operations. Creating an event on the user’s calendar does not reserve a provider’s capacity. A booking rail would need an authorized action against the provider’s system and a provider-issued confirmation. Connected-app permissions govern use of available actions; they do not create additional provider access. 
OpenAI Help Center

Payments. Payments are not categorically forbidden across the platform. Supported cloud-browser transactions require confirmation for consequential actions such as bookings and payments. In the specific DoorDash connector contract exposed here, checkout is triggered through the user-confirmed interactive widget, not directly by the model. Neither capability establishes a generic ability to charge a card for an arbitrary service provider. 
OpenAI Help Center

Account creation and authentication. I do not have a generic consumer-account signup action exposed here. A new integration would still need a supported authorization or account-setup path. The platform’s documented cloud-browser flow asks the user to complete secure sign-in and any required verification; a middleware interface does not eliminate those identity requirements. 
OpenAI Help Center

Third-party messaging. Gmail exposes actions to draft and send authorized email, and Calendar can send invitations. The Gmail tool schema I inspected does not expose a native scheduled-send action. No WhatsApp or SMS sending action is exposed in the current inventory. Messaging and other consequential actions remain subject to the relevant tool, provider, and platform permission controls. 
OpenAI Help Center

Implication for your decision: this sample primarily exposes assistant-side execution limitations, not measured supplier-side booking friction. It would be a mistake to treat those limitations as evidence that a particular service vertical needs new middleware.

Ranked missing-rail list

A measured top 10 is not supported by my records. I have only two service-booking categories with explicit capability interest, and neither has an observed provider-side booking failure. My provisional preference among those two is:

Hotel reservations — E, preference rather than measured pain. Explicit interest is recorded, and a selected hotel offering has a booking scope that is comparatively straightforward to represent as structured fields.
Telehealth appointment scheduling — E, preference rather than measured pain. Explicit interest is recorded, but the request leaves more unresolved prerequisites before an appointment can be committed.

Ranks 3–10: unassigned. Naming eight additional categories would introduce hypotheses that do not come from my retrieved task history. The scheduled-email request is not a third provider-booking category.

The single category I would want a booking API for first: hotel reservations, provisionally, based on the explicit inquiry and structured transaction scope, not demonstrated demand volume or measured booking pain.

