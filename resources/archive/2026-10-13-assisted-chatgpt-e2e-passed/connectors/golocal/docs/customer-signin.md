# GoLocal customer sign-in

Checked October 13, 2026. Google sign-in is implemented and all 57 connector tests pass. Google OAuth registration is complete, credentials are stored privately and the live pilot displays Continue with Google plus email fallback. The live Google account chooser and callback are verified. After the founder completed Google’s passkey verification, sign-in returned to the existing customer account and retained its confirmed test request. A read-only account-database check confirmed one verified customer account with a linked Google identity; no duplicate account was created. A dedicated **GoLocal OAuth** project was created in the founder's Google Cloud account, project ID `vocal-cyclist-511506-f9`. App configuration and the Web OAuth client **GoLocal pilot** are registered, with an external testing audience. The founder’s Google account is registered as a test user. This is identity configuration; the backend still runs locally.

## Customer experience with Google enabled

1. Add GoLocal to a supported personal agent. The agent opens GoLocal's authorization page.
2. Choose **Continue with Google**, select an account and approve basic identity access if Google asks. No separate email sign-in link is needed.
3. Approve connecting that agent to the GoLocal account. Google establishes identity; the separate approval grants the agent access to the customer's GoLocal tools.
4. Return to the agent and ask for a participating supplier. Review the supplier, scope, price, requested time and cancellation terms before submitting a test request.
5. The supplier accepts or declines. The agent can retrieve status; email provides a notification and reply channel.

For manual pilot testing, customers can open `/assisted`, continue with Google and submit requests through the utility portal. Suppliers use the same sign-in and complete their business profile. Operator review is still required before listing; Google identity does not establish business authority.

**Suggested marketing wording:** “Connect GoLocal to your supported personal agent, continue with Google, and approve access. Then ask your agent to find a participating local supplier and submit a request. Your appointment is confirmed when the supplier accepts.” For this pilot, explicitly say requests are tests with no actual service or payment. Do not promise one-click installation, universal compatibility or instant confirmed availability.

## Identity options

| Option | Evidence checked | GoLocal position |
| --- | --- | --- |
| Google | Web OAuth supports basic name, email and profile identity | Enabled; live Google callback, existing account and retained request history verified |
| Email | Existing verified single-use sign-in links | Retained fallback; supports founder-controlled Gmail alias demo accounts |
| ChatGPT | OpenAI documents OIDC identity for websites and plugins, currently limited to selected commercial partners | Exists; GoLocal needs approval and its own OAuth client before implementing a button |
| Claude | Official docs describe Claude authenticating to external MCP services; no public generic customer “Sign in with Claude” provider was found | Google can support a future Claude connector flow; Claude client compatibility must be implemented and tested separately |

Sources: [Google Web OAuth](https://developers.google.com/identity/protocols/oauth2/web-server), [Better Auth Google provider](https://www.better-auth.com/docs/authentication/google), [OpenAI website identity](https://developers.openai.com/siwc/website), [OpenAI plugin identity](https://developers.openai.com/siwc/chatgpt-plugin), [Claude remote MCP connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp), [Claude login guidance](https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account).

For ChatGPT, two authorizations remain independent: GoLocal verifies the customer's OpenAI identity, then GoLocal grants the connector access to that local account. Keep state, PKCE, codes and callbacks separate. An OpenAI identity token is not a GoLocal MCP access token. Plan-usage access is separate and unnecessary for booking identity. OpenAI directs commercial applicants to their representative and plugin-modal enablement to the partnerships representative. No application or outreach was sent.

## Activate Google in the local pilot

The current pilot already has a registered **Web application** OAuth client. For future recovery or a separate environment, create a **Web application** OAuth client named **GoLocal pilot** under the dedicated project. Configure app name **GoLocal**, external audience and founder support/contact email `pulkitwalia099@gmail.com`. Request only `openid`, `email` and `profile`; check Google's testing/audience requirements for pilot participants. No Gmail, Calendar, Drive or offline access is needed.

Register this exact callback:

```text
https://camryn-mechanomorphic-ellis.ngrok-free.dev/account/callback/google
```

Store the generated client ID and secret in private `connectors/golocal/.env.assisted-pilot`, with permissions `0600`:

```text
GOOGLE_CLIENT_ID=<GoLocal Web OAuth client ID>
GOOGLE_CLIENT_SECRET=<GoLocal Web OAuth client secret>
```

Keep credentials out of plugin packages, source archives, screenshots and chat. Restart the owned pilot with `npm run pilot:stop`, then `npm run pilot:start`. Verify the real account chooser, callback, retained history and return to agent consent before describing Google as live. Update both the configured public origin and Google's callback if the tunnel changes.

The Google button appears only with complete credentials. Partial configuration fails startup. Google errors offer email fallback. A verified Google email matching an already verified local email retains the original account ID and booking history; other emails remain separate. Gmail `+aliases` are not separate Google identities. Keep email sign-in for the prepared customer B and supplier A/B demo accounts.

## Verification boundaries

Automated HTTP tests use the actual account framework, state/cookie and PKCE flow, with cryptographically signed test ID tokens and mocked Google token/public-key endpoints. They check retained account history, new accounts, agent consent/token exchange, identity-only scopes, unsafe returns, missing browser state, replay, unverified email, incorrect issuer/audience/signature and expiry. Separately, the actual Google client and public callback were verified in Chrome with the founder’s Google account, preserving the existing confirmed test request. Existing account isolation and supplier accept/decline tests also pass. Resumption of MCP consent through Google is covered by the automated HTTP test. [Actual assisted ChatGPT linking and supplier acceptance](chatgpt-assisted-test.md) passed later October 13 using the already signed-in customer browser session. A fresh Google sign-in nested inside ChatGPT authorization was not separately exercised live.

The local thesis and working Page are unchanged. No cloud backend, CRM integration, supplier outreach, paid plan, actual service booking or payment was added. Google remains in testing mode. Its current account chooser displays the ngrok domain rather than a verified GoLocal brand. Check participant access before invitations; verified branding and a stable owned identity domain belong to the later public rollout.
