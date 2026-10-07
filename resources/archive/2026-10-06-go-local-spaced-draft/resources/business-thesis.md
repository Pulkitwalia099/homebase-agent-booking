# Go Local business thesis

Local services, booked by your personal agent.

For years, many people started their search for a local service on Google: compare listings, visit websites and call businesses. Personal AI agents are creating another starting point. People can now ask their assistant, “Find me a cleaner before Friday,” and expect help getting it done.

**Booking a ride through Uber or ordering food through DoorDash is straightforward. Booking a local service remains fragmented.** The agent still has to piece together prices, check availability, fill out forms and make calls. It takes on the work, but the booking process stays the same.

Uber, DoorDash and Booking.com organize supply and transactions in one place. Where supported access exists, agents can use that structure to complete a purchase.[1, 2] Local services are spread across independent businesses, booking systems and AI front offices. That creates an opening for a shared booking layer.

**We will build Go Local to connect personal agents with local businesses they can book.** We will recruit participating providers and connect their existing software, giving agents access to services, prices, availability and booking through one connection.

Personal agent  →  Go Local  →  Provider software  →  Local business

**Agents get immediate access to participating local businesses through one connection:** discover and filter providers, book a service and manage the booking. Each agent company has less supplier recruitment, integration and coordination to handle itself.

**Businesses connect once to reach all personal agents connected to Go Local.** For supported software, connecting can be as simple as approving an OAuth request through its app marketplace.[5] Other systems need manual credentials or a custom connection, which we will simplify. We agree with each business what services can be booked.

We will start with one service, audience and location. More relevant demand can attract providers, while better supplier coverage gives agents more reason to use Go Local. That cycle depends on reliable bookings and enough useful supply.

## Distribution options to explore

Platforms such as ChatGPT and Claude already have app marketplaces and custom-connector paths.[3, 4] On supported agents, adding Go Local could be as simple as asking, **“Add the Go Local plugin for me,”** then approving access. Platforms without a suitable plugin route may require a custom integration with the agent company.

**A direct partnership with a personal-agent company** would make Go Local part of that agent’s booking flow. The company routes relevant requests to us, so users do not need to find and add our plugin themselves. We agree with the partner which services, locations and requests it will route to Go Local.

**Marketplace distribution** lets users add Go Local to the agent they already use. This is an established route for third-party plugins. We need to win the first users through directory discovery or niche marketing. As successful bookings build a track record, we can use that evidence to seek wider recommendations from users and agent platforms. These routes remain open for discussion.

The starting wedge needs **a clear audience, an urgent problem and people already using personal agents**. For example, move-in cleaning could serve people who need a cleaner before their furniture arrives. We would choose a location and recruit providers around that need. This is an option to explore; the audience and its agent usage still need to be established.

## Two questions to resolve

**1. Why will agents use Go Local instead of connecting directly?** Identify the supplier access and booking work we handle better than direct integrations or existing marketplaces.

**2. How will the first customers reach us?** Establish which agent partner will route requests to Go Local, or which audience has a strong enough need to add and use our connector.

These choices determine where we start. The next step is to identify a route to real requests, then test whether they turn into reliable bookings at a price that covers delivery costs.

## Sources

- [1] [DoorDash agentic ordering](https://developer.doordash.com/en-US/mcp/)
- [2] [Booking.com Demand API](https://developers.booking.com/demand/docs/getting-started/overview)
- [3] [ChatGPT connected apps](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt)
- [4] [Claude connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)
- [5] [Jobber authorization](https://developer.getjobber.com/docs/getting_started/)
