import { TargetCMSAdapter } from '../../core/adapters/TargetCMSAdapter.js';
import { MigrationContext } from '../../core/context/MigrationContext.js';
import { OptimizelyClient } from './OptimizelyClient.js';

export class OptimizelyTargetAdapter implements TargetCMSAdapter {
  constructor(private client: OptimizelyClient) {}

  async writeContent(content: any, _context: MigrationContext): Promise<void> {
    await this.client.createPage(content);
  }
}
