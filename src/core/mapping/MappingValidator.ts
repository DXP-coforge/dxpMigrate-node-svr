import _Ajv from "ajv";
const Ajv = _Ajv as unknown as typeof _Ajv.default;

import schema from '../../schema/content-mapping.schema.json' with { type: 'json' };
import { ContentMapping } from './MappingTypes.js';

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

export function validateMapping(mapping: ContentMapping): void {
  const valid = validate(mapping);
  if (!valid) {
    throw new Error(
      'Invalid mapping:\n' + ajv.errorsText(validate.errors)
    );
  }
}
