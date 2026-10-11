import { Housecall } from '../src/housecall.js';
import { PilotError } from '../src/jobber.js';

// Operator-only discovery before account binding; never exposed as an agent tool.
try {
  const adapter = new Housecall({ apiKey: process.env.HOUSECALL_API_KEY || '', companyId: 'operator-discovery' });
  const company = await adapter.read('/company');
  if (typeof company?.id !== 'string' || !company.id) throw new PilotError('INVALID_RESPONSE', 'No company ID returned.');
  console.log(JSON.stringify({ id: company.id, name: company.name, timeZone: company.time_zone,
    nextStep: 'Verify this is your synthetic GoLocal test company, then set HOUSECALL_TEST_COMPANY_ID to its ID.' }, null, 2));
} catch (e) {
  console.error(e instanceof PilotError ? `${e.code}: ${e.message}` : 'Unable to inspect test company.');
  process.exitCode = 1;
}
