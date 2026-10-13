# Durable GoLocal hosting prepared · October 11, 2026

The user authorized up to $60/month including vendor access and asked for minimal cost. The prepared choice is one Render Starter web service at $7/month plus a 1 GB persistent disk at $0.25/month, approximately **$7.25/month before tax and excess bandwidth**. Use the free workspace plan, one instance, no autoscaling, and no paid database. Current provider pricing must also be confirmed in the creation screen. The user approved this hosting and longer private access. Reviewed source is published at commit `317dbb8`. The Render form is configured for $7/month compute, a 1 GB disk, Ohio and manual releases. Only the approved restricted environment values and encrypted Housecall history were entered in the form; no service has been created or charged. Render now requires private card/billing entry. The existing local pilot was restored while that step waits.

Sources: [Render pricing](https://render.com/pricing), [persistent disks](https://render.com/docs/disks), [Docker deployment](https://render.com/docs/docker), [Blueprint fields](https://render.com/docs/blueprint-spec).

## Prepared behavior

- One GoLocal backend at `https://api.getgolocal.com`, behind automatically managed HTTPS. Keep the existing `getgolocal.com/api/connector` address for Muse; its relay will forward only the same seven fixed operations to the hosted origin. Dots uses native MCP at `https://api.getgolocal.com/mcp`.
- Persistent encrypted state under `/var/data/golocal`; automatic daily provider snapshots. One service instance; an OS flock prevents concurrent writers and releases automatically after a crash. Only its holder can clear the stale app lock. Deploys briefly interrupt the service because it has a disk.
- Boot requires the exact migrated three-operation Housecall history. Missing, corrupt, wrong-key or wrong-company history blocks startup rather than resetting the test cap. Pending/uncertain operations remain pending. No automatic retry of vendor writes.
- The existing Muse GoLocal key can be reused as a verifier-only hosted credential, bound to Housecall mode, the exact test company and HTTPS origin. No daily expiry. An authenticated operator can revoke it; revocation survives restart. The raw Muse key is processed in transit but not saved in hosted configuration.
- New Dots OAuth grants retain one-hour access tokens, rotating refresh tokens and revocation, with a 90-day absolute grant lifetime. Old grants are not silently lengthened; Dots must consent again against the new issuer/resource. Scope stays `golocal:housecall-test`.
- All three synthetic job operations are already used. Migration does not grant additional creates, real service, customer messages, dispatch, work-start, invoice sending, payments or general supplier APIs.

## Credential/data move requiring explicit approval

Render will hold the Housecall trial API key, GoLocal encryption key, operator/MCP server secrets and the encrypted synthetic test history. It will process controlled supplier requests. Upload only this Housecall configuration and history, not the complete local .env, Jobber secrets, old OAuth grants or unrelated project credentials. The one-time encrypted bootstrap value is removed from hosting configuration after the persistent copy is verified. The existing Muse credential verifier replaces its one-day expiry only after approval; Vercel continues holding only that verifier. No supplier key goes to Muse or Vercel.

The service image contains only reviewed source, lockfile dependencies and the startup script; no .env, .data, bootstrap state or other private files. Source can be published under `services/golocal` in the existing GoLocal website repository. The unrelated `next.config 2.ts` file is excluded.

## Verified locally

42 connector tests pass, including migration, revocation, exact binding, old-grant boundaries and hosted refresh expiry. Seven relay security tests pass. Website production build and TypeScript pass. The actual Node 24 Docker image passed health/auth discovery, exclusion of a concurrent writer, forced SIGKILL + restart, persistent revocation and refusal to reapply the initial seed. All image checks used fictional state/credentials and made zero vendor calls. This is preparation, not evidence of a deployed host.

## Cutover and acceptance checks

1. Sign into Render; create only the reviewed Starter service plus 1 GB disk. Confirm approximately $7.25/month in the dashboard and any tax/bandwidth terms before purchase.
2. Publish reviewed source. Configure only approved secrets privately. Freeze the local server before producing the final encrypted Housecall-only migration and uploading it, so no writer can diverge.
3. Verify hosted HTTPS, exact company, all three owned job records and preserved operation history. Disable missing/invalid cloud configuration. Remove the one-time seed after persistent storage is proven.
4. Connect `api.getgolocal.com` DNS and HTTPS; switch the existing relay only after the host passes checks. Reconnect Dots with a fresh 90-day grant. Muse retains its existing secure key/address.
5. Stop the local backend and ngrok, then verify actual Muse and Dots company/status reads while those processes are offline. Repeat a known successful confirmation only with its existing quote/key if needed; never create another job. Restart the cloud service and confirm persistence/auth still work.
6. Save vendor/API/platform proof, costs and rollback details. Do not claim the Mac dependency is removed until step 5 succeeds.

## Vendor access remains separate

[Housecall API access](https://help.housecallpro.com/en/articles/8505035-api-overview) is MAX-plan only. The [14-day trial](https://www.housecallpro.com/pricing/) provides MAX access without a card; hosting does not extend that entitlement. No paid Housecall plan is selected. After the trial, an authorized participating business's existing eligible account, an approved developer/testing arrangement, or another supported vendor is needed. A free ongoing sandbox or partner entitlement has not been established. The old Jobber signup issue remains unresolved.

This remains a hosted private pilot with one operator/company. Tenant isolation, concurrent supplier routing, production fulfillment, user demand and paid continuation remain unestablished. Main theses and working Page unchanged.

## October 11 billing checkpoint

Public Git repository deployment avoids changing the existing Render GitHub app permissions. No GitHub repository-access changes were saved. Final frozen Housecall operation/quote history matched the encrypted import exactly; all three operations remain used. After billing is ready, freeze the local writer again and recheck/reseed any changed authorized history before deployment. No DNS/relay cutover, hosted OAuth reconnection or Mac-offline acceptance check has occurred.
