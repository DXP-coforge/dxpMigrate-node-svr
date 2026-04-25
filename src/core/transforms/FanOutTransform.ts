import { ContentTransform } from "./ContentTransform.js";
import { NormalizedContent } from "../model/NormalizedContent.js";
import { MappingEngine } from "../mapping/MappingEngine.js";
import { MigrationContext } from "../context/MigrationContext.js";
import { ContentMapping } from "../mapping/MappingTypes.js";

export class FanOutTransform implements ContentTransform {

  constructor(private readonly mapping: ContentMapping) {}

  // Now controlled only by context
  supports(context: MigrationContext): boolean {
    return (
      context.mapping.fanOut === true &&
      Array.isArray(context.mapping.targets)
    );
  }

  transform(
    input: NormalizedContent,
    context: MigrationContext
  ): NormalizedContent[] {

    const mapping = context.mapping as ContentMapping;

    if (!mapping.targets) {
      return [input];
    }

    return mapping.targets.map(target => {

      const mappedFields = MappingEngine.apply(
        input.fields,
        {
          sourceType: mapping.sourceType,
          targetType: target.targetType,
          fields: target.fields
        }
      );

      return {
        id: input.id,
        type: target.targetType,
        fields: mappedFields,
        meta: input.meta
      };
    });
  }
}
