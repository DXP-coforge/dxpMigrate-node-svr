import { ContentTransform } from './ContentTransform.js';
import { MigrationContext } from '../context/MigrationContext.js';

export class TransformPipeline {
  constructor(private readonly transforms: ContentTransform[]) {}

  execute(input: any, context: MigrationContext): any {
    let data = input;
    console.log("0000000")
    for (const transform of this.transforms) {
  console.log("11111111")
      if (transform.supports(context)) {
        data = transform.transform(data, context);
                console.log("BBBBBBBBBBB", input)
      }
    }

    return data;
  }
}
