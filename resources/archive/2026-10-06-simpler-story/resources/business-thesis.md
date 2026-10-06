# Homebase business thesis

Discussion draft for friends and advisors · 2026-10-06

For years, Google was the default starting point for many people looking for a local service: search for a cleaner, compare results, visit websites and contact businesses. Now personal AI agents are creating more ways to start that journey. People can ask their assistant, “Find me a cleaner before Friday,” and expect help getting it done. As these assistants become more capable, they could become an important new source of customers for local businesses.

**Booking a ride through Uber, ordering food through DoorDash or reserving a room through Booking.com is straightforward. Booking a local service can still be a broken journey.** An agent may have to search Google, bounce between websites, piece together prices, fill out forms, make calls or request a callback. One cleaner lists a starting price, another needs to inspect the home, and a third asks you to call for availability. The assistant takes on the work, but the underlying process remains fragmented.

Uber, DoorDash and Booking.com have organized the supply and the transaction: what is available, what it costs and how to buy it. That gives agents a clearer route to completing a task. [DoorDash already offers agent-ordering tools in limited beta](https://developer.doordash.com/en-US/mcp/), and [Booking.com provides a partner API for search, availability and orders](https://developers.booking.com/demand/docs/getting-started/overview). Local services span independent businesses, different booking systems and front offices. Although [some marketplaces already offer instant booking](https://www.angi.com/landing/how-it-works), many requests still require coordination across those separate systems.

**Homebase would provide a shared booking layer between personal agents and participating local businesses.** We would recruit suitable providers, agree their services and booking rules, and connect the software they already use. An assistant could then find suitable options, get a price, check availability and book through one connection. We would also support changes and handle booking problems, keeping requests visibly pending until the supplier has accepted them.

The opportunity is to organize useful supply once and make it available to multiple agents, so each agent company has less supplier recruitment, integration and coordination to do itself. We would start with one specific service, audience and location, then expand if the approach works. Each business must agree to participate; a software connection alone does not make its services bookable.

An **MCP connector** is the standard connection that lets a compatible assistant use Homebase's tools. The intended experience is simple: connect Homebase once, then ask your usual assistant for help. The central business question is how we get that connection into people's hands and become a route their agents choose.

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

My recommendation is to **pursue a focused demand and distribution test before building broad supply**. Choose one audience, one task, one location and one plausible route to customers; recruit enough suppliers to serve those requests. Boston cleaning and Wajo remain examples, not commitments.

A connector alone may be a useful feature. Persistent manual coordination could support a service business. A repeatable solution for one audience could become a vertical software business. A venture-scale opportunity would require economical expansion across suppliers and demand partners, with reliable bookings and margins after operating costs. Representative agent demand, paid continuation and production booking reliability remain unproven.
