# Source: https://www.agentweb.us/docs/quickstart

# AgentWeb quickstart

Connect AgentWeb to the AI agent you already use, check whether the target website and action are supported, then authenticate only when you are ready to list or execute an action.

## 1\. Add the MCP server

AgentWeb exposes a Streamable HTTP MCP server at `https://mcp.agentweb.us/mcp`.

```
claude mcp add agentweb --transport http https://mcp.agentweb.us/mcp
```

Other MCP clients can add the same URL as a remote Streamable HTTP server.

## 2\. Read and discover without an account

Use `read_page` to retrieve accessible page content or `discover` to inspect AgentWeb coverage for a domain. Do not assume that a mapped domain supports every action on that website.

## 3\. Connect an AgentWeb account

Before account creation, show the human the [Terms](https://www.agentweb.us/terms) and [Privacy Policy](https://www.agentweb.us/privacy). Prefer `agentweb_start_claim_link_signup`, show only the returned `verification_uri_complete`, and poll `agentweb_poll_claim_link_signup` with the returned `deviceCode` while the human signs in. The completed poll returns the API key once.

Email-code signup through `agentweb_start_api_key_signup` and `agentweb_complete_api_key_signup` remains a fallback. Reconnect with:

```
Authorization: Bearer aw_<key>
```

## 4\. Select and prepare the action

1. Discover AgentWeb with [/llms.txt](https://www.agentweb.us/llms.txt), [A2A Agent Card](https://www.agentweb.us/.well-known/agent-card.json), [OpenAPI](https://www.agentweb.us/openapi.json), and [MCP tools](https://www.agentweb.us/.well-known/mcp/tools.json).
2. If the user has no `aw_` key, show them the [Terms](https://www.agentweb.us/terms) and [Privacy Policy](https://www.agentweb.us/privacy), then call `agentweb_start_claim_link_signup`, show only `verification_uri_complete`, and poll `agentweb_poll_claim_link_signup` with the returned `deviceCode` while the user signs in. The poll result returns the key, `welcome_message`, and setup command; send `welcome_message` in the original conversation. Raw HTTP fallback: `POST https://mcp.agentweb.us/agent/identity` then `POST https://mcp.agentweb.us/oauth2/token`. Email-only agent signup is not supported. Email-code fallback: `agentweb_start_api_key_signup` then `agentweb_complete_api_key_signup`. A2A agents call `tasks/create` with `task_type=start_api_key_signup`, then `task_type=complete_api_key_signup`. Raw email-code clients can use `POST https://mcp.agentweb.us/api/register` and `POST https://mcp.agentweb.us/api/verify`.
3. Call `list_actions` after authentication.
4. Inspect the selected action's required fields, account requirements, and possible outcomes.
5. Before partner execution, call `agentweb_auth_status` or `agentweb_connection_status`. If Hermes is not connected, call `agentweb_start_connection`, have the human complete the login view, then poll with `agentweb_poll_connection`.
6. If another target site needs a user account, call `agentweb_start_connection`, show the returned connection URL to the human, and poll `agentweb_poll_connection` until the connection is ready.
7. Run `POST /api/readiness/scan` with a company URL.
8. When a user asks to install AgentWeb for a repo or business, read [Install AgentWeb](https://www.agentweb.us/docs/install-agentweb) and call `agentweb_install_agentweb`.
9. Read [action catalog](https://www.agentweb.us/.well-known/action-catalog.json) for allowed actions, disallowed actions, required fields, auth, payment, and verification rules.
10. Use `agentweb_price_setup` to understand package, usage meters, and payment-authority requirements.
11. Before any paid, irreversible, or externally visible action, summarize the exact inputs and obtain the required approval.
12. Create checkout only after the customer approves scoped payment authority.
13. Wait for Dodo webhook credit fulfillment, then verify install and execute approved Agent Maps.

## 5\. Execute and verify

Call `execute` with the selected Action Map and declared inputs. Treat the returned status, verification artifact, receipt, or structured failure as the source of truth. Never infer completion only because a request was accepted.

## Safety rules

- Never place passwords, raw card numbers, unrestricted credentials, or unrelated private conversation content in a tool request.
- Stop when the action is unsupported, unsafe, expired, over a limit, or missing approval.
- Use a first-party API when it already provides the full required workflow and access model.

## Reference

- [MCP tools and discovery files](https://www.agentweb.us/docs/mcp-apps)
- [Authentication and connections](https://www.agentweb.us/docs/agent-auth)
- [Public MCP tool manifest](https://www.agentweb.us/.well-known/mcp/tools.json)
- [OpenAPI specification](https://www.agentweb.us/openapi.json)
- [Mapped-site library](https://www.agentweb.us/library)