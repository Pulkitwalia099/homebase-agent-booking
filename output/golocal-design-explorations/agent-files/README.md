# GoLocal

Local-service discovery and booking tools for personal AI agents.

## Connect the public demo

Server: GoLocal Demo
Transport: Streamable HTTP
Endpoint: https://getgolocal.com/demo/mcp
Authentication: none

Add the endpoint to a compatible remote MCP client, initialize the
connection, list its tools and call connector_status before using it.

The demo uses fictional providers, sample ratings, prices and times.
It creates no real service booking and collects no payment.
The pilot machine and its tunnel must be online for execution.

## Suggested tool sequence

1. scope_request
2. search_providers
3. get_availability
4. prepare_booking
5. Ask the customer to approve the exact example offer.
6. confirm_booking
7. get_booking_status

For supplier-connected customer accounts, use the separate OAuth setup
at https://getgolocal.com/connectors?flow=pilot.
Public demo access does not grant access to supplier accounts.

## More

- Configuration: mcp-config.json
- Capabilities and limits: capabilities.json
- Agent instructions: SKILL.md
- Documentation index: llms.txt
- Human setup guide: https://getgolocal.com/connectors
