import { MigrationContext } from '../context/MigrationContext.js';

export interface TargetCMSAdapter {
  writeContent(content: any, context: MigrationContext): Promise<void>;
}
