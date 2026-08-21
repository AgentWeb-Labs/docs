# Source: https://www.agentweb.us/developers

# AgentWeb Developers

AgentWeb exposes supported web actions through a Streamable HTTP MCP server and documented HTTP interfaces. Integrations should inspect the live tool manifest and OpenAPI document rather than assume a fixed catalog.

## Runtime

- MCP endpoint: [https://mcp.agentweb.us/mcp](https://mcp.agentweb.us/mcp)
- OpenAPI: [/openapi.json](https://www.agentweb.us/openapi.json)
- MCP tool manifest: [/.well-known/mcp/tools.json](https://www.agentweb.us/.well-known/mcp/tools.json)
- Quickstart: [/docs/quickstart](https://www.agentweb.us/docs/quickstart)
- MCP tool guide: [/docs/mcp-apps](https://www.agentweb.us/docs/mcp-apps)
- Agent auth and connections: [/docs/agent-auth](https://www.agentweb.us/docs/agent-auth)
- Agent platform configs: [/agent-platforms/](https://www.agentweb.us/agent-platforms/)

## Auth

Use `Authorization: Bearer aw_<key>` for production keys. First-time setup uses one-link polling in every client; OAuth metadata remains available on the MCP origin for existing compatible tokens.

## Agent-Native Registration

1. Start with `agentweb_start_claim_link_signup`. Send the human only the returned `verification_uri_complete`.
2. While the human signs in once, poll `agentweb_poll_claim_link_signup` with `deviceCode`. The poll result returns the key, `welcome_message`, and setup command. Raw HTTP fallback: `POST https://mcp.agentweb.us/agent/identity` then `POST https://mcp.agentweb.us/oauth2/token`.
3. Email-only agent signup is not supported. The customer must sign in once to prove consent and email ownership.
4. Email-code signup remains available through `agentweb_start_api_key_signup`, `agentweb_complete_api_key_signup`, `/api/register`, and `/api/verify`.
5. Reconnect to the MCP server with the returned API key.

## Execution flow

Use `read_page` or `discover` before authentication, then authenticate, call `list_actions`, connect the target-site account when required, and call `execute` only after validating the action inputs and approval boundary.