import { getConfig } from '../src/config.js';
import { Store } from '../src/store.js';
import { Jobber } from '../src/jobber.js';
import { writeFile } from 'node:fs/promises';
const config = getConfig();
const store = await new Store(config.dataDir, config.encryptionKey).init();
try {
  const jobber = new Jobber(store, config.jobber);
  // Operator-only schema exploration. Never expose arbitrary GraphQL to the agent.
  const ref = 'kind name ofType { kind name ofType { kind name ofType { kind name } } }';
  const schema = await jobber.query(`{ __schema { queryType { name } mutationType { name } types { kind name inputFields { name type { ${ref} } } fields { name args { name type { ${ref} } } type { ${ref} } } enumValues { name } } } }`);
  await writeFile('docs/jobber-schema.json', JSON.stringify(schema, null, 2), { mode: 0o600 });
  const mutations = schema.__schema.types.find(t => t.name === schema.__schema.mutationType.name)?.fields.map(f => f.name) || [];
  console.log('Saved the authorized API schema to private docs/jobber-schema.json. Scheduling candidates:', mutations.filter(n => /job|visit|request|assessment/i.test(n)).join(', '));
  console.log('Verify create/status/change/cancel and capacity semantics before enabling live scheduling. No mutations executed.');
} finally { await store.close(); }
