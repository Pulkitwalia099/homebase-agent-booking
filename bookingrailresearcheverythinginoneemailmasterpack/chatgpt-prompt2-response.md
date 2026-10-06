Result: partial validation, with a failed execution setup

I did not complete 15 interactive booking attempts to the checkpoint you specified. I completed 15 timed, read-only probes of booking paths. None reached a selected live slot, a filled booking form, or a checkout cart.

The limitation was my execution environment: the local browser could not access the network, and the available web tool could follow links but could not operate booking forms. Some responses were cached. Most stops therefore measure a limitation of my tools, not a failure of the provider’s booking process.

I have preserved those failures below rather than reporting them as evidence of missing booking rails.

Scope and measurement

Metro: Greater Boston, including Cambridge and Somerville. Execution date: October 4, 2026, approximately 5:39–5:46 p.m. Eastern. This date and metro apply to every row.

The earlier table contained only two service-booking categories, hotels and telehealth. Restaurants, haircuts, and home cleaning are exploratory additions, not categories supported by the earlier demand records.

The intended scenarios were a hotel stay October 14–15 for one adult; dinner October 14 at 7 p.m. for two; a standard adult haircut October 14; a one-time, one-bedroom/one-bathroom cleaning in Boston ZIP 02116 on October 14; and a self-pay telehealth visit for an adult hypothetically located in Massachusetts. These scenarios were not successfully configured in the booking systems.

All elapsed times are measured time to stop, including retrieval latency and my tool-operation overhead. They exclude initial tool setup and provider discovery. They are not time-to-book measurements or website-speed benchmarks.

Per-attempt log

“Dead end” below means a dead end for this tool during this run. “Abandoned” means an intentional research stop, not observed customer abandonment. Every proposed API improvement is a hypothesis, not a measured saving.

Category / provider	Measured time to stop	Channels used	Choke points in order, and exact stopping point	Final state	What an authorized structured API might remove
H1. Hotel: citizenM Boston Back Bay	12.0 sec	Website	Official hotel page → availability/date/guest controls visible → tool could not operate them. Stopped at the availability form; no dates entered or room selected. 
Marriott
	Dead end: tool-limited	Replace the interactive date-and-guest search with a structured availability/rate request.
H2. Hotel: The Revolution Hotel, Boston	12.4 sec	Website → SynXis booking page	“Book Now” → SynXis → security iframe/resource → retrieval failed. No dates, room inventory, or quote reached. This was not a verified CAPTCHA challenge or provider outage. 
The Revolution Hotel
+1
	Dead end: access/tool-limited	An authorized SynXis integration could avoid this browser-rendering/security-resource path. It would use an existing rail, not create one.
H3. Hotel: The Godfrey Hotel Boston	11.3 sec	Website → TravelClick-linked booking path	Room page displayed loading rate information → followed King-room booking link → redirected booking page could not be opened by the tool. No dated rate or reservation selection reached. 
The Godfrey Boston
	Dead end: tool-limited	Return dated room availability and prices without requiring the redirecting booking interface.
T1. Telehealth: Mass General Brigham 24/7 Virtual Care	15.0 sec	Website → care-intake page	Scheduling link → location eligibility, care terms, and financial-responsibility screen → stopped before acceptance. A guest route was visible, so this was not a demonstrated mandatory-login wall. 
Mass General Brigham
+1
	Abandoned: intentional consent boundary	Structure eligibility and intake. It could not remove legitimate patient consent, location requirements, or financial authorization.
T2. Telehealth: Teladoc	10.9 sec	Website → registration application	Self-pay landing page → “Get care now” → registration application returned no readable content. No registration fields, provider choices, or availability could be operated. 
Teladoc Health
+1
	Dead end: tool-limited	Replace an opaque registration/booking application with authorized eligibility and scheduling calls, while preserving necessary identity checks.
T3. Telehealth: Sesame	19.3 sec	Website → directory → clinician page	Telehealth directory → clinician link containing a Nevada location parameter → cached page marked ten months old, without usable appointment inventory. Boston eligibility was not verified; this is not a valid Boston availability trial. 
Sesame Care
+1
	Dead end: tool-limited; metro unvalidated	Supply live, state-filtered clinician availability rather than an unscoped directory result.
R1. Restaurant: Estella, Boston	14.5 sec	Website → OpenTable	Official reservation link → JavaScript-dependent OpenTable page with a cached September 3 default → attempted October 14/two-person URL → retrieval returned “Cache miss.” No available time selected. 
Estella
+1
	Dead end: tool-limited	A live availability endpoint would avoid the rendered search form and cached default date.
R2. Restaurant: Sarma, Somerville	21.0 sec	Website → Resy	Official reservation link → Resy returned a template shell → dated/two-person URL returned “Cache miss.” No inventory response or table hold reached. 
Sarma
+1
	Dead end: tool-limited	Return bookable tables as structured availability instead of requiring the Resy application to render.
R3. Restaurant: Alden & Harlow, Cambridge	12.4 sec	Website → OpenTable	Official reservation link → JavaScript-dependent page with an October 3 default → October 14/two-person URL returned “Cache miss.” No slot selected. Cached defaults do not establish stale provider inventory. 
Alden & Harlow
+1
	Dead end: tool-limited	Query the requested date and party size directly, without interpreting cached page controls.
B1. Haircut: Tweed Barbers of Boston	13.0 sec	Website → Mindbody	“Book Appointment” → Mindbody consumer-booking page → no readable booking controls returned. No service, barber, date, or slot selected. 
Tweed Barbers
+1
	Dead end: tool-limited	Expose services, staff, and availability independently of the Mindbody widget.
B2. Haircut: Bostonian Barber Shop, Fenway	15.5 sec	Website → Squire	Location-specific booking link → redirect rejected by retrieval tool → clean Squire booking URL returned no readable controls. Stopped before staff/service/date selection. 
Bostonian Barber Shop
+1
	Dead end: tool-limited	Replace the redirect/widget path with authorized location, service, barber, and slot queries.
B3. Haircut: Boston Barber & Tattoo Co., North End	20.7 sec	Website → booking instructions → Square	Booking instructions disclose cash-only haircuts with a card securing against no-shows → selected North End booking link → Square returned no usable controls. No card-entry or appointment-selection step reached. 
Boston Barber & Tattoo Co.
+2
	Dead end: tool-limited	Retrieve Square appointment inventory and represent the card guarantee separately from the eventual cash payment.
C1. Cleaning: Unmess, Boston	137.0 sec*	Website → BookingKoala	One-time cleaning booking link → BookingKoala → no readable booking form returned. No address, cleaning configuration, date, or slot submitted. 
Unmess
+1
	Dead end: tool-limited	Expose service configuration, pricing, and availability without rendering the BookingKoala form.
C2. Cleaning: Cambridge Maids, Boston service area	17.2 sec	Website → booking-page link	Landing page presented a rough-estimate form requiring home dimensions and service type, and described subsequent scheduling coordination → “Book Online” returned “Cache miss.” No estimate or booking request submitted. 
Cambridge Maids
	Dead end: tool-limited	A quote-and-capacity interface could remove form entry and potentially coordination, but only if the provider exposes dispatch capacity.
C3. Cleaning: The Maids, Boston branch	9.2 sec	Website	Quote form required contact information, full address, and cleaning details → submission would authorize quote-related follow-up → stopped without submission. No quote pending, price obtained, or appointment selected. 
Maids
	Abandoned: intentional no-contact stop; also tool-limited	A no-contact quote plus live-capacity API could avoid initial lead submission. A lead-creation API alone would not solve booking.

* C1 includes an interruption in my measurement workflow. I retained the actual wall time rather than adjusting it. It is not a clean performance observation.

Across this run, no telephone calls, emails, or direct messages were sent. No accounts were created, payments authorized, consent agreements accepted, or quote requests submitted. Consequently, voicemail, phone menus, callback waits, actual payment handoffs, and quote turnaround times remain untested, not zero-friction.

Category summary

Median time to book is unavailable in every category. The separate time-to-stop column summarizes only the measured probes above. It must not be used to rank consumer booking speed.

Category	Probes	Median time to book	Median measured time to stop	Most common observed choke point or pattern	Does a booking rail exist?
Hotels	3	Unavailable	12.0 sec	All three stopped at forms, rendering, or access limitations of this tool. No repeated provider-side failure established.	Yes, at category level. SynXis documents availability/pricing and reservation-creation APIs. Access requires credentials; I did not test access to the sampled hotel through those APIs. 
Developer Portal
+1

Telehealth	3, including one unvalidated metro result	Unavailable	15.0 sec	Two stopped on unreadable or unsuitable retrieved content; one at patient-consent terms. No common supplier-side failure demonstrated.	Digital intake/scheduling paths exist. An agent-usable booking API was not verified. The consent flow and Sesame partnership page do not establish an externally callable booking endpoint. 
Partners Patient Gateway
+1

Restaurants — exploratory	3	Unavailable	14.5 sec	All three stopped at JavaScript-dependent booking applications or failed dated-page retrievals.	Yes. OpenTable documents availability and reservation APIs. Integration-partner approval and authorization are required. Resy was observed as a booking interface, not validated as an accessible API. 
OpenTable Docs
+1

Haircuts — exploratory	3	Unavailable	15.5 sec	All three reached existing booking software but returned no usable booking controls to this tool.	Yes. Square documents availability search and booking creation with appropriate authorization scopes. This does not give me access to the sampled merchant’s account. 
Square
+2

Home cleaning — exploratory	3	Unavailable	17.2 sec*	Two landing pages presented quote-first flows. Tool limitations prevented testing whether either could progress to immediate booking.	A BookingKoala booking interface was observed; a usable availability-and-book API was not verified. Its documented event-trigger integrations are not, by themselves, evidence of a consumer booking API. 
Unmess
+3
What this changes for the founder’s decision

The strongest verified finding is that “my agent cannot book it” and “there is no booking rail” are different problems. Hotels, restaurants, and haircuts have documented booking APIs through systems encountered in these probes. For those systems, the next commercial question is authorized access and integration coverage, not whether the basic reservation operation exists. 
Developer Portal
+2

Cleaning produced the clearest provider-workflow signal, but not enough to select the category. Cambridge Maids described an estimate followed by scheduling coordination; The Maids exposed a contact-and-address quote form rather than an immediately visible price and appointment. That supports investigating whether a provider can supply an executable quote and actual capacity. It does not establish that a call is required, how long booking takes, or whether customers abandon. 
Cambridge Maids
+1

The earlier provisional preference for hotels remains unvalidated. This run found existing booking systems and specific access boundaries, but it did not produce the live, interactive evidence needed to compare category friction or estimate time saved by middleware.

The complete records include exact start/stop timestamps, navigation routes, measured durations, limitations, and API-documentation references: 
readable attempt log
 · 
structured JSON log
.

boston_booking_probe_log_2026-10-04.md
Document
boston_booking_probe_log_2026-10-04.json
Code
