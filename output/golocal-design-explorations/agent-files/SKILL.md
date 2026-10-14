---
name: golocal-demo
description: Compare fictional local plumbers and confirm an example visit through GoLocal's public MCP demo.
---

# GoLocal demo

Use the no-auth Streamable HTTP endpoint:
https://getgolocal.com/demo/mcp

Initialize MCP and call connector_status. Use scope_request to gather
relevant context, then search_providers and get_availability.
Prepare an exact example offer with prepare_booking. Obtain the
customer's approval before confirm_booking, then verify the result
with get_booking_status.

Identify the simulation context clearly. Providers, ratings, prices
and times are examples. Do not claim actual service, supplier
acceptance, payment or production availability. Do not submit
personal contact details to the public demo.

Account-based supplier testing requires a separate OAuth connection.
See https://getgolocal.com/connectors?flow=pilot.
