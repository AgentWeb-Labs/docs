# Source: https://www.agentweb.us/use-cases/agentic-payment-workflows.html

# Agentic payment workflows

AgentWeb lets AI products route payment-related workflows through explicit authority and verification instead of handing an agent raw card access.

## Use when

- An agent needs to buy setup or monitoring for a company.
- An agent needs to trigger a business checkout through an approved Agent Map.
- An agent needs proof that payment, setup, or workflow completion happened.

## Integration sequence

1. Discover AgentWeb with [llms.txt](https://www.agentweb.us/llms.txt), [OpenAPI](https://www.agentweb.us/openapi.json), and [MCP tools](https://www.agentweb.us/.well-known/mcp/tools.json).
2. Read payment rules from [agent commerce metadata](https://www.agentweb.us/.well-known/agent-commerce.json).
3. Collect customer payment authority.
4. Create a Dodo hosted checkout session through AgentWeb.
5. Wait for webhook-backed entitlement and verification proof.