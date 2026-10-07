# Homebase business thesis

For years, Google was the default starting point for many people looking for a local service. For example to search for a cleaner, compare google/map listings, visit websites or call 2-3 businesses to make 1 booking. Now personal AI agents are creating more ways to start that journey. People can ask their assistant, “Find me a cleaner before Friday,” and expect help getting it done. As these assistants become more capable, they could become an important new source of customers for local businesses.

**For a personal agent to book a ride through Uber, order food through DoorDash or reserve hotel through Booking.com is straightforward. Booking a local service is still a broken journey.** An agent may have to search Google, bounce between websites, piece together prices, fill out forms, make calls or request a callback. One cleaner lists a starting price, another needs to inspect the home, and a third asks you to call for availability. The assistant takes on the work, but the underlying process remains fragmented.

Uber, DoorDash and Booking.com have organized the supply and the transaction for personal agents: what is available, what it costs and how to buy it. That gives agents a clearer route to completing a task. [DoorDash already offers agent-ordering tools in limited beta](https://developer.doordash.com/en-US/mcp/), and [Booking.com provides a partner API for search, availability and orders](https://developers.booking.com/demand/docs/getting-started/overview). Local services span independent businesses, different booking systems and now with AI front offices. 

**We can provide a shared booking layer between personal agents and participating local businesses.** We would onboard service providers via the software they already use to get availbility, pricing etc. An AI assistant could then find suitable options, get a price, check availability and book through one connection. We would also support changes and handle booking problems, keeping requests visibly pending until the supplier has accepted them.

The opportunity is to organize useful supply once and make it available to multiple agents, so each AI agent company has less supplier recruitment, integration and coordination to do itself. Sort of like Stripe for local businesses. We would start with one specific service, audience and location, then expand if the approach works. Each business must agree to participate; a software connection alone does not make its services bookable.

The intended experience is simple: connect Homebase once, then ask your usual assistant for help. The central business question is how we get that connection into people's hands and become a route their agents choose.

Two key questions in my mind from Personal AI agent PoV. 
1. **Does this market need a shared booking layer?** This is the most important question to resolve first: will fragmented supply create a lasting need for Homebase, or will agents connect directly to businesses and their existing software well enough?
2. **Who brings the first customers?** Identify a specific partner or community, the agent they use and the path from hearing about Homebase to making a request. or a 1st party intergration with agent companies is critical 

## Distribution options to explore

Homebase could develop network effects within one city and service category: customer demand attracts more participating businesses; better coverage and availability give agents more reason to use Homebase; and completed bookings build feedback and reliability history that could help agents make better choices.

But this growth is not automatic. We first need enough relevant demand and bookable supply to make Homebase useful to both agents and businesses. The distribution challenge is to find an initial wedge—a specific audience, use case and route to customers—that can get this cycle started. The three routes below are options for reaching that starting point. 

**Where to start?  how does Homebase become the route an agent actually uses?** We have three options to explore. The choice of route, or combination of routes, remains open for discussion:

| Route | How it could bring requests | What we need to establish |
| --- | --- | --- |
| Partner with a personal-agent company | It integrates Homebase into its booking experience and routes relevant requests to us. | Does it have relevant demand and a reason to partner instead of building directly? |
| Appear in agent directories and MCP marketplaces | Users or agent builders discover and connect Homebase while looking for a capability. | Does our audience use that directory, and do connections turn into completed jobs? |
| Reach a niche audience directly | We market a concrete outcome to a community, then help users connect Homebase to their assistant. | Can we acquire and activate users economically, and do their agents support the connection? |

The direct pitch should be something like **“Arrange your move-in clean through your AI assistant.”** A shareable prompt could start setup: “Help me connect Homebase so you can find and book a cleaner for me.” One-line setup is a product goal to verify on each agent. For example, [Claude documents connection and authentication steps](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities); a prompt alone does not remove them.


