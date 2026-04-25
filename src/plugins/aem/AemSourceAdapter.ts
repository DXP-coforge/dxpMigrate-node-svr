import { SourceCMSAdapter } from '../../core/adapters/SourceCMSAdapter.js';
import { AEMClient } from './AemClient.js';

export class AEMSourceAdapter implements SourceCMSAdapter {
  constructor(private client: AEMClient) {}

  async fetchContent(): Promise<any[]> {
    return this.client.getPages();
  }
}
