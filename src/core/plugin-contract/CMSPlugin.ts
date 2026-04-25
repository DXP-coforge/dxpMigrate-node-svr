import { SourceCMSAdapter } from '../adapters/SourceCMSAdapter.js';
import { TargetCMSAdapter } from '../adapters/TargetCMSAdapter.js';
import { DependencyContainer } from 'tsyringe';

export interface CMSPlugin {
  //type: string;

  //client: new (config: any) => any;

  id: string;

  register(container: DependencyContainer): void;

  sourceAdapter?: new (client: any) => SourceCMSAdapter;
  targetAdapter?: new (client: any) => TargetCMSAdapter;
}
