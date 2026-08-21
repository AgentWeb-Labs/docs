# Source: https://www.agentweb.us/docs/agent-auth

# AgentWeb authentication and target-site connections

AgentWeb authentication proves which AgentWeb account is calling. A target-site connection gives an approved workflow access to a specific external account. Neither one should be treated as blanket approval for every action.

## Public access

`read_page` and `discover` can be used without an AgentWeb API key. Listing mapped actions and executing an action require authentication according to the current MCP tool manifest.

## Preferred AgentWeb account flow

1. Show the human the [Terms](https://www.agentweb.us/terms) and [Privacy Policy](https://www.agentweb.us/privacy).
2. Call `agentweb_start_claim_link_signup`.
3. Show only `verification_uri_complete` to the human.
4. Poll `agentweb_poll_claim_link_signup` with `deviceCode` while the human signs in.
5. Store the returned key securely and reconnect with `Authorization: Bearer aw_<key>`.

Email-code tools remain available as a fallback. Do not create an account from an email address alone or expose the returned API key in public logs.

## API key example

```
Authorization: Bearer aw_<key>
```

Agents can create a key through the one-link flow. First show the human the [Terms](https://www.agentweb.us/terms) and [Privacy Policy](https://www.agentweb.us/privacy). Then call `agentweb_start_claim_link_signup`, show only `verification_uri_complete`, and poll `agentweb_poll_claim_link_signup` with `deviceCode` while the user signs in. The poll result returns the key, `welcome_message`, and setup command; send `welcome_message` in the original conversation. Raw HTTP fallback: `POST https://mcp.agentweb.us/agent/identity`, then `POST https://mcp.agentweb.us/oauth2/token` with `grant_type=urn:ietf:params:oauth:grant-type:device_code` and `device_code`. Email-only agent signup is not supported. The email-code tools `agentweb_start_api_key_signup` and `agentweb_complete_api_key_signup` remain available as fallback, as do A2A `task_type=start_api_key_signup` / `complete_api_key_signup` and raw HTTP `POST /api/register` + `POST /api/verify`.

API keys are scoped to approved Agent Maps. Do not use AgentWeb keys for raw browser control, private account access, or unrestricted payment-provider actions.

## Connect a target-site account

1. Check whether the selected action requires an external account connection.
2. Call `agentweb_start_connection` and show the returned URL to the human.
3. Poll `agentweb_poll_connection` until it reports a final state.
4. Stop if the connection is expired, refused, or attached to the wrong account.

## Provider connection example

For cookie-backed providers such as Hermes, agents should call `agentweb_auth_status` or `agentweb_connection_status` first. If the provider is not connected, call `agentweb_start_connection`, send the human to the returned `connect_url`, then call `agentweb_poll_connection` until it returns `connected=true`.

## Authority is separate

A valid API key or connected browser session shows that access exists. It does not prove that the user approved this action, recipient, amount, time, or account. Consequential actions should carry explicit scope and approval, and the agent should surface relevant inputs before execution.

## Delegated payment authority example

```
{
  "authority_id": "auth_123",
  "principal": {
    "type": "business",
    "id": "example_co",
    "agent_provider": "claude_code"
  },
  "scope": ["price.setup", "create.checkout_session"],
  "amount_limit": { "value": 500000, "interval": "single_use" },
  "currency": "usd",
  "expires_at": "2026-05-08T00:00:00Z",
  "revocation_url": "https://example.com/agent-authority/auth_123/revoke",
  "receipt_required": true,
  "verification_required": true,
  "created_at": "2026-05-01T00:00:00Z"
}
```

## Create checkout session

Connector API keys cannot initiate AgentWeb billing. `POST /api/billing/create-checkout-session` is called only by the customer's signed-in web session, where the Origin, bearer, and Idempotency-Key gates live; requests authorized with an `aw_` key are rejected. From an agent, call the `agentweb_create_checkout_session` MCP tool instead: it returns a handoff URL that signs the customer in and starts Dodo hosted checkout for the chosen plan. Open that URL in the customer's browser and let checkout finish there.

## Rules

- Public scans require no credentials and do not execute forms or payments.
- Private execution requires an approved Agent Map and scoped credentials.
- Paid account checkout is available for Pro and Max. Enterprise is custom through [support@agentweb.us](mailto:support@agentweb.us).
- Checkout success does not grant credits until Dodo webhook verification completes.

## Credential boundaries

- Never send passwords, session cookies, raw card numbers, or unrestricted third-party keys through chat or an action parameter.
- Keep AgentWeb API keys out of source control, analytics, screenshots, and public output.
- Revoke or rotate access when a key or connection may have been exposed.
- Use the narrowest supported connection and action for the requested task.

## When to use AgentWeb auth

Use AgentWeb auth when an agent needs delegated access to an approved Agent Map, scoped checkout creation, verification artifacts, or repeated authenticated workflow execution. Do not use AgentWeb auth for one-off scraping, unrestricted account access, raw payment-provider operations, or browser automation that has no reusable workflow map.

See the [quickstart](https://www.agentweb.us/docs/quickstart), [MCP tool guide](https://www.agentweb.us/docs/mcp-apps), and [current tool manifest](https://www.agentweb.us/.well-known/mcp/tools.json).