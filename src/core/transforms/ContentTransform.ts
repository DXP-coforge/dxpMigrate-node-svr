import { MigrationContext } from '../context/MigrationContext.js';

export interface ContentTransform {
  supports(context: MigrationContext): boolean;
  transform(input: any, context: MigrationContext): any;
}
