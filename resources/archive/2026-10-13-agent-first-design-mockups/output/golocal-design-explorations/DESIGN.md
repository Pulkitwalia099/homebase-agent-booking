# GoLocal design directions · October 13, 2026

GoLocal is positioned as the local-service layer for personal AI agents. Customers use GoLocal through their existing agent; personal assistants need direct, readable discovery and setup. Businesses join as supply partners. AI front-office, sales and software partnerships are supporting information.

## Shared decisions

- Retain the established cream, forest green, sage and orange palette.
- Remove oversized provider counts and credit promotions from these designs.
- Use clear entry points: “I’m a customer” and “I’m a personal assistant.”
- The assistant entry replaces the marketing page with plain documentation and files.
- Keep Muse in the illustrative customer conversation, plus the wider agent logo section.
- Keep the existing business-software story and logos, with accurate availability notes.
- Use spacing, type and composition to establish hierarchy; avoid repeated card grids, numbered decorative labels and ornamental counters.

## Core colors

Cream #F5F2E9; forest #193C32; deep green #103F3D; sage #AFC49F; orange #DF704B. Orange remains an accent rather than a promotional banner.

## A · Warm and spacious — recommended

Georgia display type, familiar sans-serif body type, a generous left-aligned reading column and one contained illustration on the right. The local-world artwork is the memorable element. The agent logos lead into one customer example, then businesses and their existing stack.

Hero: headline + agent doorway | contained neighborhood scene
Then: agent ecosystem → customer example → business software → small partnerships

Why: closest to the earlier site's warmth, with better separation between copy and artwork. The plain agent entry establishes the positioning without making the human page feel technical.

## B · Agent native

Sans-serif throughout, precise product hierarchy and a dark green hero. The hero shows the connection doing a useful job: photo context → GoLocal lookup → local option. The next section explains the assistant-readable files alongside the customer path.

Hero: product purpose | request and GoLocal connection
Then: agents → assistant/customer routes → existing business software

Why: most direct expression of the product layer and strongest immediate investor explanation. It is more functional and less atmospheric than A.

## C · The local world

A centered introduction and a wide neighborhood illustration with a separate message area. Copy stays clear of the houses. Customer and assistant doorways sit below the scene; agent logos, businesses and an example follow.

Hero: purpose → two entrances → panoramic local world
Then: customer/assistant routes → agents → business stack + example

Why: makes the physical world the subject and feels more like a local-service brand. It takes more vertical space before the details.

## Plain agent entry in every direction

The “I’m a personal assistant” links open agent.html, with no marketing navigation, imagery, cards, discount blocks or signup form. Files are actual local Markdown, text and JSON, available from agent-files/:

- README.md
- SKILL.md
- llms.txt
- mcp-config.json
- capabilities.json

Connection information refers to the existing public demo at https://getgolocal.com/demo/mcp. This is a simulation, with no real service, supplier-account access or payment. Account-based supplier testing uses a separate OAuth setup. The new documentation entry is a prototype, not a production route yet. Configuration formats vary by client.

## Research references

- [Anthropic frontend-design guidance](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md): hierarchy, subject-specific composition, restrained decoration and purposeful type. Read as a design reference; not installed as a persistent skill.
- [Paddle's agent and AI documentation](https://developer.paddle.com/sdks/ai/): plain documentation index and Markdown content alongside MCP and skills. The requested paddle.ai address could not be retrieved; Paddle's official developer documentation was used.
- [Linear](https://linear.app/): clear product positioning and disciplined information hierarchy.
- [Mercury](https://mercury.com/): restrained brand presentation. These are reference principles; no layout was copied.

## Verification and delivery

All three designs were visually inspected on desktop and at 390px phone width with no horizontal overflow. The A customer example's compare/choose/confirmation interaction passed. The assistant switch removes the human website UI; its target and heading were confirmed in browser. Gallery buttons change the selected preview. Local file references and JSON syntax passed checks.

These are reviewable mockups. No production deployment, real request, third-party message or media generation occurred. The earlier customer/business draft was saved separately and the existing website working files restored to their exact pre-edit state when the founder requested design exploration instead.

Open index.html to compare. Each mockup links back to the comparison. The live local preview is http://127.0.0.1:3013/ while the static preview process runs. The downloadable bundle also opens directly from an extracted folder without a server.
