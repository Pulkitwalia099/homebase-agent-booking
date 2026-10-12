// Read-only discovery; credentials stay in environment, output excludes contact values.
const base = 'https://api.housecallpro.com';
const expected = process.env.HOUSECALL_TEST_COMPANY_ID;
if (!expected || !process.env.HOUSECALL_API_KEY) throw new Error('Existing trial configuration required');
async function read(path) {
  const response = await fetch(base + path, { headers: { Authorization: `Token ${process.env.HOUSECALL_API_KEY}`, Accept: 'application/json' }, redirect: 'error', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Read failed: HTTP ${response.status}`);
  return response.json();
}
function fields(value, prefix = '', result = new Set()) {
  if (Array.isArray(value)) {
    result.add(prefix + '[]');
    for (const item of value.slice(0, 3)) fields(item, prefix + '[]', result);
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      const path = prefix ? prefix + '.' + key : key;
      result.add(path);
      fields(child, path, result);
    }
  }
  return [...result].sort();
}
const company = await read('/company');
if (company.id !== expected) throw new Error('Wrong bound test company');
const page = await read('/jobs?page=1&page_size=10');
if (!Array.isArray(page.jobs) || page.jobs.some(job => job.company_id !== expected)) throw new Error('Unexpected job company');
console.log(JSON.stringify({
  checkedAt: new Date().toISOString(), transport: 'Direct Housecall Pro public API; not Zapier',
  requests: ['GET /company', 'GET /jobs?page=1&page_size=10'],
  company: { id: company.id, name: company.name, timeZone: company.time_zone },
  companyFieldPaths: fields(company), jobFieldPaths: fields(page.jobs),
  jobs: page.jobs.map(job => ({ id: job.id, invoiceNumber: job.invoice_number, workStatus: job.work_status, totalAmount: job.total_amount,
    schedule: job.schedule, lineItems: (job.line_items || []).map(item => ({name:item.name,quantity:item.quantity,unitPrice:item.unit_price})) })),
  pagination: {page:page.page,totalPages:page.total_pages},
  boundaries: ['Bound trial account only', 'No writes or customer communications', 'Contact values omitted', 'Observed fields are not an exhaustive API schema', 'Job schedule is not bookable availability', 'Trial access does not establish merchant production entitlement']
}, null, 2));
