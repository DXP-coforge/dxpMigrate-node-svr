import { ContentMapping } from '../mapping/MappingTypes.js';
import { TransformPipeline } from '../transforms/TransformPipeline.js';
import { buildTransformsFromMapping } from '../transforms/buildTransformsFromMapping.js';

export class MigrationContext {
  public readonly transformPipeline: TransformPipeline;

  constructor(
    public readonly mapping: ContentMapping,
    public readonly jobId: string,
    public readonly logger: Console = console
  ) {
    this.transformPipeline = new TransformPipeline(
      buildTransformsFromMapping(mapping)
    );
  }

  transform(item: any): any {
    // ✅ FIX: pass context
    return this.transformPipeline.execute(item, this);
  }
}
