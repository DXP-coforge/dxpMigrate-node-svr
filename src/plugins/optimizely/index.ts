import { CMSPlugin } from '../../core/plugin-contract/CMSPlugin.js';
import { DependencyContainer } from 'tsyringe';
import { OptimizelyClient } from './OptimizelyClient.js';
import { OptimizelySourceAdapter } from './OptimizelySourceAdapter.js';
import { OptimizelyTargetAdapter } from './OptimizelyTargetAdapter.js';

const OptimizelyPlugin: CMSPlugin = {
  id: 'optimizely',

  register(container: DependencyContainer) {
    container.register('OptimizelyClient', {
      useFactory: () => new OptimizelyClient({})
    });

    container.register('SourceCMSAdapter:optimizely', {
      useFactory: c =>
        new OptimizelySourceAdapter(
          c.resolve('OptimizelyClient')
        )
    });

    container.register('TargetCMSAdapter:optimizely', {
      useFactory: c =>
        new OptimizelyTargetAdapter(
          c.resolve('OptimizelyClient')
        )
    });
  }
};

export default OptimizelyPlugin;
