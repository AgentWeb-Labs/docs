# Source: https://www.agentweb.us/blog/security-model

[← Journal](https://www.agentweb.us/blog/)

![](https://www.agentweb.us/media/blog/security-model.webp)

Handing tasks to an agent should reduce manual work without weakening the controls around consequential actions.

Supported consequential actions are designed to bind the user, account, permission, limit, and expiry. Account isolation is intended to prevent one customer's connection from becoming another customer's authority.

For payments, AgentWeb uses secure enrollment, approvals, and spending limits. An unsafe, unsupported, expired, or over-limit request should return a refusal before side effects.

Consequential actions should leave enough structured history to investigate what happened, where it happened, and which authority allowed it, without exposing raw secrets.

## Agent speed raises the safety bar

An agent can act faster and more consistently than a person, which makes weak boundaries more dangerous. A credential copied into a prompt or a long-lived browser session can quietly become authority for actions the user never intended. AgentWeb treats identity, permission, account isolation, and proof as core execution requirements.

The safety model begins before the action runs. The system identifies the principal, customer, agent, credential, workflow, and target account. It checks scopes, approval, expiry, and limits. A request that cannot establish those facts should stop before it reaches the external service.

## Accounts stay isolated

Connected accounts are customer-specific resources. One user connection cannot become a shared pool for another user, another agent, or another workflow. Tenant isolation and explicit account binding keep the execution attached to the person who authorized it.

This matters even within one company. Teams may have several workspaces, merchant accounts, or payment methods. The action needs an unambiguous account reference so a correct workflow cannot accidentally operate in the wrong place.

## Secrets stay outside the model

Agents should not receive raw card data, unrestricted service keys, or private page content they do not need. AgentWeb uses scoped credentials, secure connection handling, and checkout handoffs so the model works with references and permissions rather than the underlying secret.

Reducing secret exposure also improves revocation. A user can disable a connection or authority record without chasing copies through conversation history. The execution layer remains responsible for credential handling while the agent works with a narrow interface.

## Payments receive stricter controls

Paid actions require an approved amount limit, currency, expiry, revocation path, receipt, and verification. Higher-risk workflows can require a human checkpoint. AgentWeb is designed to keep raw payment credentials away from the merchant workflow and provide bounded authority for the approved transaction.

The receipt closes the financial loop. It gives the user evidence of the merchant, amount, and result, and it gives the system a record for reconciliation. An uncertain payment remains pending or unresolved until the evidence supports completion.

## Auditability supports trust

Every consequential action should leave enough information to reconstruct what happened. AgentWeb records the job, authority context, target workflow, account reference, state transitions, result, and verification artifact. This trail supports customer review and incident investigation without exposing secrets in the output.

Auditability also changes user behavior. People can delegate more when they know the history is inspectable and the limits are real. Trust grows from repeated, understandable outcomes rather than a broad claim that the agent is safe.

## Safe refusal is a normal result

Unsupported, expired, over-limit, or unverifiable requests should fail cleanly. The system returns a structured reason and the smallest next step. It does not improvise around an approval boundary or declare success because the page looked promising.

This is the security posture AgentWeb is building toward: scoped by default, isolated by customer, revocable by the user, and accountable after execution. The agent gets enough authority to finish approved work. The user keeps ownership of the account and the decision.

## Threats worth designing around

A serious agent execution service has to consider cross-tenant access, stale permissions, credential leakage, prompt injection, duplicate side effects, over-limit payments, and false completion. These risks appear at different layers, so a single model instruction to behave safely cannot address them.

AgentWeb uses structural controls. Tenant and account binding address isolation. Scoped authority, expiry, and revocation address permission drift. Credential boundaries keep secrets away from the model. Idempotent jobs and state tracking reduce duplicate execution. Receipts and verification address false completion.

The controls should fail closed around consequential work. Missing authority does not become a best-effort run. An ambiguous payment does not become success. A request for private data outside the map does not become an invitation to browse. The system protects the user by keeping the action inside a reviewed contract.

## Security that users can understand

Technical controls only create trust when the user can see their effect. The product should show which accounts are connected, what actions are allowed, which limits apply, when authority expires, and how to revoke it. Approval screens should summarize the decision instead of displaying implementation noise.

After execution, the history should connect the instruction, account reference, authority, result, and proof. Users can review a payment or submission without reading logs. Support can investigate from the same job and artifact identifiers.

This clarity matters to enterprise buyers and investors because it shows where responsibility lives. AgentWeb does not rely on a model to remember every rule. The platform enforces the boundary and produces evidence that the enforcement happened.

## A standard buyers can verify

Security claims should map to observable product behavior. Buyers should be able to inspect scopes, approval modes, account isolation, expiry, revocation, payment limits, and artifact schemas. They should also see structured refusals when a request violates those controls.

Operational evidence matters too. Jobs should carry tenant and account context, credentials should stay outside outputs, and receipts should prove results without leaking private page data. Incident review should start from stable identifiers rather than screenshots and reconstructed prompts.

AgentWeb will earn trust by making these boundaries visible and consistent. The goal is not to declare agents safe in the abstract. The goal is to make each action narrow, attributable, revocable, and verifiable enough that a person or company can decide to delegate it.

## Security should improve the normal path

Strong boundaries can make delegation faster because the system no longer has to rediscover the rules. A known account, approved map, valid scope, and current limit allow routine execution to proceed with little friction. The user is interrupted when the requested action crosses a meaningful boundary.

This is a better experience than permanent access and safer than repeated ad hoc approvals. The controls remain attached to the workflow and can be reviewed before the user relies on them. AgentWeb can standardize these patterns across services while preserving site-specific requirements.

The result is security that behaves like product infrastructure. It guides the agent toward the allowed path, stops unsafe requests early, and produces the evidence needed after completion. Users feel the benefit as calm, predictable control rather than a wall of warnings.

The safest execution path should also be the easiest approved path for the agent to follow and for the user to understand.

[Keep readingFast enough to be useful, safe enough to trust](https://www.agentweb.us/blog/the-business-execution-balancing-act/)