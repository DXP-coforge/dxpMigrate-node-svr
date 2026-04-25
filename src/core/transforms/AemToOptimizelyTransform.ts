import { ContentTransform } from './ContentTransform.js';
import { MappingEngine } from '../mapping/MappingEngine.js';
import { MigrationContext } from '../context/MigrationContext.js';
import { NormalizedContent } from '../model/NormalizedContent.js';
import { ContentMapping } from '../mapping/MappingTypes.js';

export class AemToOptimizelyTransform implements ContentTransform {

  constructor(private readonly mapping: ContentMapping) {}

  // ✅ Now aligned with interface
  supports(context: MigrationContext): boolean {
    return (
      context.mapping.sourceType === this.mapping.sourceType &&
      context.mapping.targetType === this.mapping.targetType
    );
  }

  transform(
    input: any,
    context: MigrationContext
  ): NormalizedContent {

    const mappedFields = MappingEngine.apply(
      input,
      this.mapping
    );

    return {
      id: input?.id ?? context.jobId,
      type: this.mapping.targetType ?? "",
      fields: mappedFields,
      meta: {
        sourceType: this.mapping.sourceType,
        targetType: this.mapping.targetType
      }
    };
  }
}
