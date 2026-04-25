import fs from 'fs';

import { MappingEngine } from '../core/mapping/MappingEngine.js';
import { MigrationContext } from '../core/context/MigrationContext.js';
import { ContentMapping } from '../core/mapping/MappingTypes.js';

// ----------------------------
// Inputs (CLI or stdin)
// ----------------------------
const [, , sourceFile, mappingFile] = process.argv;

if (!sourceFile || !mappingFile) {
  console.error(
    'Usage: node run-mapping.js <source.json> <mapping.json>'
  );
  process.exit(1);
}

const sourceData = JSON.parse(
  fs.readFileSync(sourceFile, 'utf-8')
);

const mapping: ContentMapping = JSON.parse(
  fs.readFileSync(mappingFile, 'utf-8')
);

// ----------------------------
// Execute mapping
// ----------------------------
const engine = new MappingEngine();

const context = new MigrationContext(
  mapping,
  'dev-run'
);

const result = MappingEngine.apply(sourceData, mapping);

// ----------------------------
// Output
// ----------------------------
console.log(JSON.stringify(result, null, 2));
