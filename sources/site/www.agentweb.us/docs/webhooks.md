# Source: https://www.agentweb.us/docs/webhooks

# AgentWeb Webhooks and Verification

AgentWeb uses webhooks and verification artifacts so agents can distinguish a started payment, a completed payment, and a verified business action.

## Webhook endpoints

- `POST /api/billing/webhook` receives Dodo events. It verifies `webhook-id`, `webhook-signature`, and `webhook-timestamp` against the raw body before applying credits.
- `POST /telemetry/agent-event` records public agent attribution events. It does not store raw prompts, payment credentials, or private customer payloads.

## Agent rules

- External agents must not call the Dodo webhook directly.
- Checkout redirects are not proof of entitlement.
- Completed actions should return a verification artifact with source, timestamp, status, evidence, signature metadata, and failure class.

Payment schemas: [payment authority](https://www.agentweb.us/.well-known/payment-authority.schema.json), [payment artifact](https://www.agentweb.us/.well-known/payment-artifact.schema.json), and [agent commerce metadata](https://www.agentweb.us/.well-known/agent-commerce.json).