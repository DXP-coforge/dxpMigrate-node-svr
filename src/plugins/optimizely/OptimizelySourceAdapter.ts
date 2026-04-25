import { SourceCMSAdapter } from '../../core/adapters/SourceCMSAdapter.js';
import { OptimizelyClient } from './OptimizelyClient.js';

export class OptimizelySourceAdapter implements SourceCMSAdapter {
  constructor(private client: OptimizelyClient) {}

  async fetchContent(): Promise<any[]> {
    return this.client.fetchContent();
  }
}
