import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
const url = `${process.env.PUBLIC_BASE_URL || 'http://localhost:8787'}/mcp`;
const client = new Client({ name: 'golocal-smoke', version: '0.1.0' });
await client.connect(new StreamableHTTPClientTransport(new URL(url), { requestInit: { headers: { Authorization: `Bearer ${process.env.MCP_BEARER_TOKEN}` } } }));
try {
  const invoke = async (name, args = {}) => {
    const result = await client.callTool({ name, arguments: args });
    assert(!result.isError, result.content[0]?.text); return result.structuredContent;
  };
  const list = await client.listTools(); assert(list.tools.some(t => t.name === 'connector_status'));
  const status = await invoke('connector_status');
  if (status.backend === 'demo') {
    const providers = await invoke('search_providers', { zip: '84101', service: 'plumbing_diagnostic' });
    const provider = providers.providers[0];
    const available = await invoke('get_availability', { provider_id: provider.id });
    const quote = await invoke('prepare_booking', { provider_id: provider.id, slot_id: available.slots[0].id });
    const args = { quote_id: quote.id, idempotency_key: randomUUID(), user_approved: true };
    const booking = await invoke('confirm_booking', args);
    const replay = await invoke('confirm_booking', args); assert.equal(booking.id, replay.id);
    assert.equal((await invoke('get_booking_status', { booking_id: booking.id })).state, 'simulated_confirmed');
    assert.equal((await invoke('cancel_booking', { booking_id: booking.id, user_approved: true })).state, 'cancelled');
    console.log('PASS: MCP discovery → simulated search → slots → quote → approval → booking → duplicate retry → status → cancellation. No vendor calls or charges.');
  } else if (status.backend === 'housecall') {
    await invoke('housecall_company'); await invoke('housecall_list_jobs');
    console.log('PASS: Housecall Pro company and bounded jobs read over MCP. Vendor writes and live booking not implemented.');
  } else {
    await invoke('jobber_account'); await invoke('jobber_list_jobs');
    console.log('PASS: Jobber account and jobs read over MCP. Live booking/write not tested.');
  }
} finally { await client.close(); }
