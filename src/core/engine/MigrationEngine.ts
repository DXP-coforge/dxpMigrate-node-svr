import { MigrationContext } from '../context/MigrationContext.js';

export class MigrationEngine {

  async executeSingle(
    source: any,
    context: MigrationContext
  ): Promise<any> {
    return context.transform(source);
  }
}
