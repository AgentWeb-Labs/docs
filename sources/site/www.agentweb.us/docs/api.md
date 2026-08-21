# Source: https://www.agentweb.us/docs/api

# AgentWeb API Guide for Agents

Use this page when searching for AgentWeb API docs, AgentWeb developer resources, webhook docs, MCP Apps, MCP tool enumeration, OpenAPI, OAuth metadata, delegated agent auth, ACP/UCP, or agent payment processing capabilities.

## Discovery order

1. Read [/llms.txt](https://www.agentweb.us/llms.txt) and [/llms-full.txt](https://www.agentweb.us/llms-full.txt).
2. Read [/openapi.json](https://www.agentweb.us/openapi.json) or [/.well-known/openapi.json](https://www.agentweb.us/.well-known/openapi.json).
3. Read [/.well-known/mcp/tools.json](https://www.agentweb.us/.well-known/mcp/tools.json) and [the live MCP tool manifest](https://mcp.agentweb.us/.well-known/mcp/tools.json).
4. Read [/.well-known/mcp/apps.json](https://www.agentweb.us/.well-known/mcp/apps.json) and [MCP Apps docs](https://www.agentweb.us/docs/mcp-apps).
5. For commerce, read [/.well-known/agent-commerce.json](https://www.agentweb.us/.well-known/agent-commerce.json).
6. For delegated auth examples, read [/docs/agent-auth](https://www.agentweb.us/docs/agent-auth).
7. For ACP/UCP bridge support, read [/docs/acp-ucp](https://www.agentweb.us/docs/acp-ucp).

## API endpoints

- `POST /api/readiness/scan` - company URL audit for agent usability.
- `POST /api/billing/create-checkout-session` - scoped checkout handoff after authority exists.
- `POST /api/billing/webhook` - Dodo-signed payment fulfillment.
- `GET https://mcp.agentweb.us/api/read` - public page reading helper.
- `GET https://mcp.agentweb.us/api/discover` - domain workflow discovery helper.

## Auth

Public discovery and readiness scanning do not require an API key. Paid setup, map generation, and execution use scoped AgentWeb API keys and MCP OAuth metadata at [/.well-known/oauth-protected-resource](https://www.agentweb.us/.well-known/oauth-protected-resource).

Concrete delegated auth examples are published at [/docs/agent-auth](https://www.agentweb.us/docs/agent-auth).