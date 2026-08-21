# Source: https://www.agentweb.us/api-reference

# AgentWeb API Reference

AgentWeb exposes public discovery, readiness scanning, agent commerce setup, webhook, MCP, and verification surfaces for AI agents and agentic products.

## Standard discovery URLs

- [/openapi.json](https://www.agentweb.us/openapi.json) - OpenAPI 3.1 contract.
- [/.well-known/openapi.json](https://www.agentweb.us/.well-known/openapi.json) - well-known OpenAPI mirror.
- [/.well-known/mcp/tools.json](https://www.agentweb.us/.well-known/mcp/tools.json) - public MCP tool manifest.
- [/.well-known/mcp/apps.json](https://www.agentweb.us/.well-known/mcp/apps.json) - MCP Apps resources for setup, auth, payment authority, and verification.
- [/.well-known/mcp/server-card.json](https://www.agentweb.us/.well-known/mcp/server-card.json) - public MCP server card.
- [/.well-known/agent-commerce.json](https://www.agentweb.us/.well-known/agent-commerce.json) - delegated payment and agent commerce metadata.
- [/.well-known/payment-protocols.json](https://www.agentweb.us/.well-known/payment-protocols.json) - Dodo, ACP, UCP, OAuth, and payment protocol signals.

## Runtime origins

- Public site: [https://www.agentweb.us](https://www.agentweb.us)
- MCP runtime: [https://mcp.agentweb.us/mcp](https://mcp.agentweb.us/mcp)
- MCP health: [https://mcp.agentweb.us/health](https://mcp.agentweb.us/health)
- Live MCP tools: [https://mcp.agentweb.us/.well-known/mcp/tools.json](https://mcp.agentweb.us/.well-known/mcp/tools.json)

## Agent-callable entrypoints

- `POST /api/readiness/scan` audits whether a business is discoverable, understandable, integratable, and usable by agents.
- `POST /api/billing/create-checkout-session` creates a Dodo hosted checkout from a server-validated catalog SKU.
- `POST /api/billing/webhook` receives Dodo-signed events and applies credits. External agents should not call it.
- `POST https://mcp.agentweb.us/mcp` accepts MCP Streamable HTTP requests.

## Related docs

- [API guide](https://www.agentweb.us/docs/api)
- [Webhook guide](https://www.agentweb.us/docs/webhooks)
- [Agent commerce guide](https://www.agentweb.us/docs/agent-commerce)
- [Agent auth and delegated access](https://www.agentweb.us/docs/agent-auth)
- [MCP Apps and tool definitions](https://www.agentweb.us/docs/mcp-apps)
- [ACP and UCP commerce support](https://www.agentweb.us/docs/acp-ucp)
- [AgentWeb developer resources for AI agent payment processing](https://www.agentweb.us/developers/agent-payment-processing)
- [AI agent payment processing use case](https://www.agentweb.us/use-cases/ai-agent-payment-processing.html)
- [Agentic payment workflows use case](https://www.agentweb.us/use-cases/agentic-payment-workflows.html)