# Homebase business thesis

Discussion draft for friends and advisors · 2026-10-06

## Personal agents are becoming a new way to buy services

For years, Google was the default starting point for many people looking for a local service: search for a cleaner, compare results, visit websites and contact a few businesses. Now a growing range of personal AI assistants offers another starting point. People can ask an assistant to understand what they need, find options and help get the task done.
Y

The opportunity is that a request such as “Find me a cleaner before Friday” can increasingly begin with someone's personal agent. Local businesses may need to reach customers across several assistants, alongside search engines and existing marketplaces.

## The booking journey is still fragmented

Starting with an agent does not automatically make the service bookable. The agent may still have to search Google, move between websites, compare incomplete information, fill out quote forms, call businesses or request a callback. It then has to reconcile the price, service details and availability before it can tell the customer the job is confirmed.

Imagine asking for a move-in clean before the movers arrive. One cleaner's website lists a starting price, another requires a form, and a third asks you to call for availability. The agent can do some of that work for you, but it still has to navigate the same fragmented process. Wajo's use of calls and human assistance illustrates one way agents bridge that gap today. [Wajo](https://wajo.ai/)

**The place where the request begins is changing faster than the systems needed to complete it.** Better reasoning helps an agent understand the task; it still needs access to businesses willing and able to fulfill it.

## Why agents need a booking layer

There is Uber for rides, DoorDash for food delivery and Booking.com for accommodation. These platforms organize suppliers, prices, availability and transactions so a request can become a purchase. An agent using that organized supply has a much clearer path to completing the task than one contacting each supplier separately. [DoorDash is already offering agent-ordering tools in limited beta](https://developer.doordash.com/en-US/mcp/), and [Booking.com provides a partner API for search, availability and orders](https://developers.booking.com/demand/docs/getting-started/overview).

Local services remain spread across independent businesses, booking systems and front offices. Some marketplaces already support instant booking, including [Angi in selected categories](https://www.angi.com/landing/how-it-works). The opening we want to investigate is a shared booking layer that different agents can use across participating local providers.

That is the middleware opportunity: do the work of organizing usable supply and connecting booking systems once, then make it available to multiple agents. Each agent company would have less supplier recruitment, integration and coordination to do itself.

## What Homebase would build

**Homebase would connect personal agents to local businesses they can reliably book.** We would start with one specific service, audience and location, recruit suitable providers, agree their services and booking rules, and connect the software they already use.

When someone asks, “Find a cleaner for my new apartment before Friday,” their assistant could use Homebase to find suitable providers, get a price, check availability and confirm a booking. Homebase would also support status checks and changes, and handle booking problems. A request awaiting supplier approval would remain visibly pending.

An **MCP connector** is the standard connection that lets a compatible assistant use these tools. Behind it sits the supplier network and the work needed to make bookings dependable. Each business must agree to participate; connecting a software vendor does not enroll all its customers.

The intended experience is: connect Homebase once, then ask your usual assistant for help. The next question is how we get that connection into people's hands and become a route their agents choose.

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
