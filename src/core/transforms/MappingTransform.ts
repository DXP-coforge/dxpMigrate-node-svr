import { ContentTransform } from './ContentTransform.js';
import { ContentMapping } from '../mapping/MappingTypes.js';
import { MigrationContext } from '../context/MigrationContext.js';
import { MappingEngine } from '../mapping/MappingEngine.js';


export class MappingTransform implements ContentTransform {

  constructor(private readonly mapping: ContentMapping) {}

  supports(_context: MigrationContext): boolean {
    return true;
  }

  transform(input: any, context: MigrationContext): any {

    if (!input || typeof input !== "object") {
      context.logger.error("Invalid input passed to MappingTransform");
      return null;
    }

    if (!this.mapping?.fields) {
      throw new Error("Invalid mapping configuration: fields missing");
    }

    try {
      return MappingEngine.apply(input, this.mapping);
    } catch (err) {
      context.logger.error("MappingEngine failed", err);
      throw err;
    }
  }
}
