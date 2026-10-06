# Homebase business thesis

Discussion draft for friends and advisors · 2026-10-06

**Homebase would let people book local services through the personal AI assistant they already use.** We would start with one specific need and audience, recruit suitable service providers, and give assistants a shared way to find prices, check availability and make bookings.

For example: “Find a cleaner for my new apartment before I move in on Friday.” The assistant understands the request. Homebase supplies suitable, participating cleaners and a way to complete the booking.

## The opportunity and the gap

If people increasingly delegate everyday tasks to personal agents, those agents could become a new source of customers for local businesses. Homebase could serve several agents through the same supplier network, reducing the work each agent company needs to do to recruit providers and arrange jobs.

The gap is between **finding a business and being able to buy its service**. A listing may tell an assistant that a cleaner exists. Completing the task also requires an agreed service, a valid price, an available appointment and confirmation that the business will honor the booking. Businesses use different software and have different rules.

The hypothesis is that Homebase can make those steps reliable enough that agents prefer using it to browsing, calling providers or building their own connections. Existing marketplaces and booking software are alternatives; we need to earn a place alongside them.

## What we would build

Homebase would recruit providers for a narrow service and location, agree what they will accept, and connect their existing booking systems. It would give agents tools to find suitable offers, quote, book, check status and handle changes. When a provider still needs to approve a request, the agent would see that it is pending.

An **MCP connector** is the standard connection that lets a compatible AI assistant use these tools. The value behind that connection is useful supplier coverage and dependable execution. Each business must agree to participate; connecting its software vendor does not enroll every business using that software.

The intended experience is: connect Homebase once, then ask your usual assistant for help whenever the need arises.

## How customers would find and use it

**Distribution is the central question: how does Homebase become the route an agent actually uses?** Three approaches could complement one another:

| Route | How it could bring requests | What we need to establish |
| --- | --- | --- |
| Partner with a personal-agent company | It integrates Homebase into its booking experience and routes relevant requests to us. | Does it have relevant demand and a reason to partner instead of building directly? |
| Appear in agent directories and MCP marketplaces | Users or agent builders discover and connect Homebase while looking for a capability. | Does our audience use that directory, and do connections turn into completed jobs? |
| Reach a niche audience directly | We market a concrete outcome to a community, then help users connect Homebase to their assistant. | Can we acquire and activate users economically, and do their agents support the connection? |

Directories already exist: the [official MCP Registry](https://registry.modelcontextprotocol.io/), [Smithery](https://smithery.ai/) and [Claude's directory](https://claude.com/blog/build-plugins-for-claude) are examples. A listing creates a discovery opportunity; it does not establish demand or guarantee that an agent will choose us. A platform partnership could make Homebase feel built in while remaining an external service.

The direct pitch should be something like **“Arrange your move-in clean through your AI assistant.”** A shareable prompt could start setup: “Help me connect Homebase so you can find and book a cleaner for me.” One-line setup is a product goal to verify on each agent. For example, [Claude documents connection and authentication steps](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities); a prompt alone does not remove them.

## Possible starting audiences

These are use-case hypotheses, not established demand.

| Person | Example request | Suppliers needed | Possible way to reach them |
| --- | --- | --- | --- |
| Busy parent or professional | “Find a cleaner before our guests arrive Saturday.” | Cleaners offering standard cleans | Local parent groups, employer communities, household agents |
| Person moving into a new home | “Book a clean after I get the keys and before the movers arrive.” | Cleaners offering vacant-home cleans | Relocation services, apartment managers, moving communities |
| Host managing a few rental properties | “Our regular cleaner canceled. Find someone before check-in.” | Turnover cleaners with short-notice capacity | Host communities and property-management partners |
| Pet owner with a demanding schedule | “Find a groomer who accepts my dog's size and coat, with a Saturday opening.” | Groomers with explicit eligibility and slots | Pet-owner communities and local pet businesses |

Moving has a clear trigger but limited repeat use by the same person. Hosts may have recurring needs but tighter deadlines and more operational complexity. Households may offer repeat demand, although a regular supplier relationship can reduce the need to search again. The strongest niche combines a reachable audience, a painful task and suppliers able to fulfill it.

## The questions that matter most

1. **Who brings the first customers?** Identify a specific partner or community, the agent they use and the path from hearing about Homebase to making a request.
2. **Why will their agent use Homebase?** Establish how it discovers, connects and selects our tools, and where we improve on its current alternatives.
3. **Which task is worth delegating?** Look at recent requests, their frequency and what made them difficult. Separate finding a new provider from managing an existing one.
4. **Can we offer enough useful supply?** Determine whether participating providers cover the location, appointment times and service requirements customers actually ask for.
5. **Who pays, and what remains after costs?** A supplier could pay for an acquired customer; a user or agent company could pay for coordination. Test these separately. Include customer acquisition, partner shares, supplier onboarding and support.
6. **Why would this become a lasting business?** Test whether supplier relationships, coverage and reliable fulfillment become harder to reproduce as we grow. A niche listing alone does not give us ownership of the niche.

## What would make this worth pursuing

My recommendation is to **pursue a focused demand and distribution test before building broad supply**. Choose one audience, one task, one location and one plausible route to customers; recruit enough suppliers to serve those requests. Boston cleaning and Wajo remain examples, not commitments.

A connector alone may be a useful feature. Persistent manual coordination could support a service business. A repeatable solution for one audience could become a vertical software business. A venture-scale opportunity would require economical expansion across suppliers and demand partners, with reliable bookings and margins after operating costs. Representative agent demand, paid continuation and production booking reliability remain unproven.
