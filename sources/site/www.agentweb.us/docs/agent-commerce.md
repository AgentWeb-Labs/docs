# Source: https://www.agentweb.us/docs/agent-commerce

# AgentWeb Agent Commerce and Delegated Payments

AgentWeb helps AI agents initiate payment-related business workflows only after the customer has approved scope, authority, amount limits, receipts, and verification requirements.

## Current production path

1. Run a public readiness scan for the business.
2. Return the setup scope and recommended package.
3. Require a payment authority artifact before checkout.
4. Create a Dodo hosted checkout through `POST /api/billing/create-checkout-session`.
5. Grant credits only after the Dodo-signed webhook verifies payment state.

## Protocol signals

AgentWeb publishes delegated payment metadata at [/.well-known/agent-commerce.json](https://www.agentweb.us/.well-known/agent-commerce.json) and [/.well-known/payment-protocols.json](https://www.agentweb.us/.well-known/payment-protocols.json). These files expose Dodo checkout support, OAuth metadata, and ACP/UCP integration-target signals without claiming raw card custody or unrestricted autonomous payment authority.

## Concrete integration docs

- [Agent auth and delegated access examples](https://www.agentweb.us/docs/agent-auth)
- [MCP Apps and tool definitions](https://www.agentweb.us/docs/mcp-apps)
- [ACP and UCP bridge support](https://www.agentweb.us/docs/acp-ucp)
- [Developer resources for AI agent payment processing](https://www.agentweb.us/developers/agent-payment-processing)

## Safety boundary

Agents should never send raw card data, bank data, credentials, private prompts, private page bodies, or unrestricted payment-provider keys. Every payment request needs principal, scope, amount limit, currency, expiry, revocation URL, receipt requirement, and verification requirement.

## Use cases

- AI agent payment processing for setup sessions.
- Agent-ready quote, invoice, booking, checkout, and subscription workflows.
- Authenticated workflow execution with payment and receipt verification.