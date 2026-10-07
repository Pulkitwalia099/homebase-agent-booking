# Homebase business thesis

Discussion draft for friends and advisors  |  October 6 2026

For years, Google was the default starting point for many people looking for a local service: search for a cleaner, compare Google or Maps listings, visit websites and call two or three businesses to make one booking. Personal AI agents are creating more ways to start that journey. People can ask their assistant, “Find me a cleaner before Friday,” and expect help getting it done. These assistants create a new entry point for local businesses to reach customers.

**Booking a ride through Uber, ordering food through DoorDash or reserving a room through Booking.com is straightforward. Booking a local service remains a fragmented journey.** An agent may still have to search Google, bounce between websites, piece together prices, fill out forms, make calls or request a callback. One cleaner lists a starting price, another needs to inspect the home, and a third asks you to call for availability.

Uber, DoorDash and Booking.com organize supply and transactions: what is available, what it costs and how to buy it. Agents can use that structure where supported access exists. DoorDash offers agent-ordering tools in limited beta, and Booking.com provides a partner API for search, availability and orders.[1, 2] Local services span independent businesses, different booking systems and, increasingly, AI front offices. The agent takes on the work, but the underlying process remains fragmented.

**We will build Homebase as a shared booking layer between personal agents and participating local businesses.** We will onboard providers through the software they already use, connecting their service offerings, pricing, availability and booking operations. An assistant can then find suitable options and complete a booking through one connection. Homebase will also support changes and handle booking problems, keeping requests pending until the supplier accepts them.

Personal agent  →  Homebase  →  Provider software  →  Local business

The opportunity is to organize useful supply once and make it available to multiple agents, reducing the recruitment, integration and coordination each agent company handles itself. Think of the one-integration logic of Stripe, applied to local-service booking, with the added work of service scope and fulfillment. We will start with one service, audience and location. Each business must agree to participate; connecting its software alone does not make its services bookable.

## Distribution options to explore

A plugin and connector ecosystem already exists across platforms such as ChatGPT and Claude, including routes for custom MCP integrations. Availability and setup differ by platform, plan and permissions.[3, 4, 5] This gives Homebase a way to reach people inside the assistants they already use.

The intended experience is simple: **“Add Homebase so you can find and book a cleaner for me.”** Where supported, the agent can help the user through setup. Account connection, authentication or approval may still require user action. One-prompt onboarding is a product goal to verify on the chosen agent, rather than a universal capability today.

**A built-in partner integration brings Homebase into the agent’s existing booking flow.** If the partner routes eligible requests to us, customers can reach our supply without discovering and adding Homebase separately. The partnership must establish the categories, geography and routing behavior it covers. Being integrated does not automatically give us every search query.

**A third-party connector makes customer-side distribution our responsibility.** We must give users a compelling reason to add it, help them complete setup and make Homebase useful when they next need the service. A directory listing supports discovery; active usage depends on reaching the right users and completing real tasks.

Three routes remain open for discussion. Directory discovery and niche marketing can both support the user-added connector route.

| Route | How requests reach Homebase | What to establish |
| --- | --- | --- |
| Agent partnership | A partner integrates Homebase and routes eligible booking requests. | Relevant demand, agreed routing and a reason to partner rather than build directly. |
| Directories and marketplaces | Users or agent builders discover Homebase and add the connector. | Where target users look, setup completion and conversion to fulfilled jobs. |
| Direct niche marketing | We reach a specific audience with a painful task and help them add Homebase. | Existing agent usage, a compelling need and sustainable customer-acquisition costs. |

## The starting wedge and the questions to resolve

For a user-added connector, the starting wedge needs **a specific audience, an urgent problem and a meaningful concentration of existing personal-agent users**. Existing agent usage reduces the behavior change we ask of customers. We still need to establish that concentration within the chosen audience; it is a selection criterion, not an adoption figure we have measured.

For example, “Arrange your move-in clean through your AI assistant” targets people facing a deadline in a defined city. A relocation service or apartment community could provide access to that audience. The useful segment is people who already delegate tasks to an agent and need a cleaner within a narrow time window. We then recruit suppliers whose scope, geography and capacity match those requests. This is one option to explore, not a chosen wedge.

Homebase could develop network effects within one city and service category: relevant demand attracts participating businesses; better coverage and availability give agents more reason to use Homebase; completed bookings generate feedback that can improve matching and reliability. This depends on sufficient demand, genuinely bookable supply and permission to use the outcome data.

**1. Where does a shared booking layer create lasting value for personal agents?** Identify the supplier access, integration work and booking coordination that Homebase can handle better than agents connecting directly to businesses, software vendors or existing marketplaces. This determines the role we can build into a business.

**2. Which route gets Homebase into real booking flows?** Establish what a built-in partner will route to us, or which niche audience will add and use our connector. For the user-added route, the immediate questions are where those users gather, which agents they use and what pain is strong enough to motivate setup.

These are the two decisions to resolve next. A connector is a useful feature; ongoing manual coordination can support a service business. Repeatable delivery in a niche can support vertical software. A venture-scale case requires economical expansion across supply and demand partners. Representative demand, paid continuation and production booking reliability remain to be established.

## Sources

- [1] [DoorDash agentic ordering](https://developer.doordash.com/en-US/mcp/)
- [2] [Booking.com Demand API](https://developers.booking.com/demand/docs/getting-started/overview)
- [3] [ChatGPT connected apps](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt)
- [4] [Claude connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)
- [5] [ChatGPT custom MCP apps](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)
