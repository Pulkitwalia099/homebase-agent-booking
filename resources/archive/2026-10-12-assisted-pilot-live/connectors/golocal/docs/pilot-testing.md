# GoLocal pilot testing

The assisted MVP is running from your machine through an HTTPS tunnel. It supports customer email sign-in, supplier onboarding, operator approval, test booking requests, supplier acceptance or decline, email alerts and feedback. Every page labels it as a test: no actual visit, CRM job or payment occurs.

## Open the pilot

| Person | Link |
| --- | --- |
| Customer | [Sign in and test a request](https://camryn-mechanomorphic-ellis.ngrok-free.dev/assisted) |
| Supplier | [Register a test supplier profile](https://camryn-mechanomorphic-ellis.ngrok-free.dev/assisted/supplier/new) |
| Founder | [Review suppliers](https://camryn-mechanomorphic-ellis.ngrok-free.dev/operator/assisted) |
| Founder | [Review feedback](https://camryn-mechanomorphic-ellis.ngrok-free.dev/operator/assisted/feedback) |

The free ngrok link may show a one-time **Visit Site** notice. After that, participants enter their name and email, open the sign-in email and continue. Links expire after 15 minutes and work once; request a fresh one when needed. Customers and suppliers use the same sign-in, and can have both roles on an account.

Keep the machine awake, connected to the internet and powered on. A temporary keep-awake process is running; closing the laptop, restarting it or losing the connection can still interrupt the pilot. Accounts and requests are saved locally across ordinary application restarts. Cloud backend hosting remains deferred.

## Founder controlled demo accounts

These accounts are prepared. All their sign-in and booking emails arrive in your personal Gmail inbox. Sign out before switching accounts in one browser; use separate browsers or private windows to demonstrate both sides at once.

| Account | Sign-in email | Prepared example |
| --- | --- | --- |
| Customer A | `pulkitwalia099@gmail.com` | One accepted test request |
| Customer B | `pulkitwalia099+golocal-customer-b@gmail.com` | One pending request to Supplier B and one declined request from Supplier A |
| Supplier A | `pulkitwalia099+golocal-supplier-a@gmail.com` | Demo Plumbing A, $95 diagnostic, ZIPs 84101 and 84102 |
| Supplier B | `pulkitwalia099+golocal-supplier-b@gmail.com` | Demo Plumbing B, $120 diagnostic, ZIPs 84101 and 84102 |

The demo suppliers are already approved and explicitly named **Test Only**. Their prices are examples. Use the pending Supplier B request to demonstrate acceptance or decline. It expires after its response deadline; create a fresh request if needed.

For your own manual customer entries, use these separate accounts or additional aliases of your inbox. Real participants should sign into their own account; you can guide them through a request while they are signed in. There is no founder impersonation feature for someone else's account.

## Supplier walkthrough

1. Sign in and select **For suppliers**. Fill in the business name, diagnostic scope, service ZIPs, example price, time zone, cancellation terms and response deadline. Software is optional and does not connect the CRM.
2. Submit the profile. It stays hidden from search until you review and activate it in the founder console.
3. Send a test customer request to that supplier. The owner receives an email linking to its signed-in review page.
4. Accept the test request using the confirmation checkbox, or decline it with a reason. Acceptance is a test only; it does not arrange a real service.
5. Open **Share feedback** to record what felt confusing or missing.

New supplier listings require founder approval. The founder console uses the independent `ADMIN_TOKEN` in the private `connectors/golocal/.env.assisted-pilot` file. It is separate from all participant accounts; do not put it in an invitation. The browser review console was signed in during setup; that operator session lasts one hour.

## Customer walkthrough

1. Sign in and select **Find a plumber**. Search ZIP 84101 to compare both demo suppliers, or a ZIP covered by a newly approved supplier.
2. Choose a time at least one hour ahead and within 90 days. The form uses the supplier's time zone.
3. Review the exact price, scope, requested time and terms. Enter test contact/address details and approve submitting them to that supplier.
4. Submit the request. Its state is **pending supplier** until accepted or declined. The supplier receives an alert; the customer receives the decision by email.
5. Open the request link or refresh its status. Pending requests can be withdrawn; accepted changes are coordinated outside this MVP.
6. Use **Share feedback** or reply to the email. Replies go to your Gmail.

Emails send from `GoLocal pilot <notifications@getgolocal.com>` using the website's existing verified sender. Your personal address `pulkitwalia099@gmail.com` is the reply-to. The sender key remains protected on the website; only fixed sign-in and test-request templates are exposed to the local authenticated relay. No Gmail password or app password is needed. The relay credential expires November 12, 2026; no paid email plan or cloud backend was added.

## Capture useful feedback

Watch each participant complete the flow and note where they need help. Ask whether the request's pending state is clear, whether the supplier has enough information to decide, and whether the decision email makes the next step obvious. Ask suppliers whether they would prefer this inbox or their existing CRM, and customers whether they would use the flow through their agent.

The feedback form records role, a 1–5 ease rating and a comment. The founder console shows the responses and notification queue health. The initial feedback entry is labelled **Verification entry only** and is not customer evidence. Browser usability tests do not establish agent demand, supplier willingness to fulfill, paid continuation or production booking reliability.

## Start and stop

From `connectors/golocal`:

```sh
npm run pilot:status
npm run pilot:start
npm run pilot:stop
```

Start restores the pilot server, tunnel and temporary keep-awake process. Stop ends only those owned processes and keeps saved accounts and requests. The separate `.env.assisted-pilot` and `.data-assisted-pilot/` hold private configuration and data; the existing Housecall `.env` and protected test history remain separate. No auto-start on machine reboot is configured.

The existing tunnel URL now serves assisted test mode. Old Housecall/Muse shared credentials do not authorize customer access to it. The new MCP endpoint is [the pilot MCP](https://camryn-mechanomorphic-ellis.ngrok-free.dev/mcp), with customer OAuth scope `golocal:assisted`. Actual public MCP SDK calls passed; linking this mode inside ChatGPT remains a separate client check. Manual browser testing can proceed now.
