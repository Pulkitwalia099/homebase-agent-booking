# GoLocal

Local services, booked by your personal agent.

Local services is a $2T market with home services alone a $600B and is highly fragmented. Every tech era has created a new platform to book these services. Telephones era led to Yellow-pages, Internet created craigslist, Mobile created Google maps. For last decade, U.S. users started their search for a local service on Google/maps: compare listings, visit websites and call businesses.

Now, Personal AI agents are creating another starting point. 15+ Personal AI Agent startups have emerged in past few months raising billions and every AI lab has launched or is launching their version soon. Some consolidation is expected but It doesn’t seem like a winner takes all and different agents will have its own advantages and cater to its own user segments.

**For a personal agent, booking a ride through Uber or ordering food through DoorDash is straightforward. Booking a local service remains fragmented.** The agent still has to piece together prices, check availability, fill out forms and make calls. It takes on the work, but the booking process stays the same and has poor task completion rate, top metric for personal agent’s success.

Local services are spread across independent businesses and CRM systems. That creates an opening for a shared booking layer.

**We build GoLocal (MCP connector) to connect personal agents with local businesses they can book.** We will recruit participating providers and connect their existing software, giving agents access to services, prices, availability and booking through one connection.

**Personal agent  →  GoLocal  →  Provider software  →  Local business**

**Agents get immediate access to participating local businesses through one connection:** discover and filter providers, book a service and manage the booking. Each agent company has less supplier recruitment, integration and coordination to handle itself.

**Businesses connect once to reach all personal agents connected to GoLocal.** For supported software, connecting can be as simple as approving an OAuth request through its app marketplace.[5] Other systems need manual credentials or a custom connection, which we will simplify. We agree with each business what services can be booked.

We can start with one service, audience and location. More relevant demand can attract providers, while better supplier coverage gives agents more reason to use GoLocal. That cycle depends on reliable bookings and enough useful supply.

## Distribution options to explore

Platforms such as ChatGPT and Claude already have app marketplaces and custom-connector paths. On supported agents, adding GoLocal could be as simple as asking, **“Add the GoLocal plugin for me,”** then approving access. Platforms without a suitable plugin route may require a custom integration with the agent company.

**A direct partnership with a personal-agent company** would make GoLocal part of that agent’s booking flow. The company routes relevant requests to us, so users do not need to find and add our plugin themselves. We agree with the partner which services, locations and requests it will route to GoLocal.

**Marketplace distribution** lets users add GoLocal to the agent they already use. This is an established route for third-party plugins. We need to win the first users through directory discovery or niche marketing. As successful bookings build a track record, we can use that evidence to seek wider recommendations from users and agent platforms. These routes remain open for discussion.

The starting wedge needs **a clear audience, an urgent problem and people already using personal agents**. For example, move-in cleaning could serve people who need a cleaner before their furniture arrives. We would choose a location and recruit providers around that need. This is an option to explore; the audience and its agent usage still need to be established.

## Two questions to resolve

**1. Will the AI companies try to build the local network themselves?** It is a tedious process to onboard local supply, setup integrations with their current CRM software (which highly fragmented) and standardize data pipelines that agents can use. This is not core their business model.

**2. How will the first customers reach us?** Can we get a 1st party integration with a personal AI agent platform? that solves the demand side problem and makes this a viable idea at get go. If not, how will be distribute our MCP to end users/AI agents to get critical mass of demand in a confined area?

\*Side question: Is there a B2B use-case where such a local services MCP could be value for business AI Agents? Eg. Freight forwarders, Brokers etc.

These choices determine where we start. The next step is to identify a route to real requests, then test whether they turn into reliable bookings at a price that covers delivery costs.

## Sources

- [[1] DoorDash agentic ordering](https://developer.doordash.com/en-US/mcp/)
- [[2] Booking.com Demand API](https://developers.booking.com/demand/docs/getting-started/overview)
- [[3] ChatGPT connected apps](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt)
- [[4] Claude connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)
- [[5] Jobber authorization](https://developer.getjobber.com/docs/getting_started/)
