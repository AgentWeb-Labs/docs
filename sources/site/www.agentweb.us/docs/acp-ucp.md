# Source: https://www.agentweb.us/docs/acp-ucp

# ACP and UCP commerce support

AgentWeb supports agentic commerce through payment authority artifacts, Dodo checkout settlement, webhook-backed credits, and verification artifacts. ACP and UCP are published as integration-target profiles so agents can detect the intended commerce bridge.

## Current bridge

- Authority: [payment authority schema](https://www.agentweb.us/.well-known/payment-authority.schema.json)
- Commerce metadata: [agent commerce metadata](https://www.agentweb.us/.well-known/agent-commerce.json)
- Protocol index: [payment protocol signals](https://www.agentweb.us/.well-known/payment-protocols.json)
- Machine payment profile: [MPP profile](https://www.agentweb.us/.well-known/mpp.json)
- x402 profile: [x402 profile](https://www.agentweb.us/.well-known/x402.json)

## Agent-to-agent payment sequence

1. Agent discovers AgentWeb through llms.txt, OpenAPI, MCP, A2A, and commerce metadata.
2. Agent reads price/setup terms and receives a bounded authority requirement.
3. Customer approves scope, amount limit, currency, expiry, receipt, revocation, and verification.
4. Agent calls checkout creation with the payment authority artifact.
5. AgentWeb grants credits only after Dodo webhook signature verification.
6. Agent receives receipt/status proof and verification metadata.

## Boundary

AgentWeb does not ask agents to send raw card data or unrestricted payment-provider credentials. ACP/UCP-native settlement can be added behind the same authority and verification contract.