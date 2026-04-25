// src/plugins/aem/index.ts
import { CMSPlugin } from '../../core/plugin-contract/CMSPlugin.js';
import { AEMSourceAdapter } from './AemSourceAdapter.js';
import { AEMTargetAdapter } from './AemTargetAdapter.js';
import { AEMClient } from './AemClient.js';
import { DependencyContainer } from 'tsyringe';

const AemPlugin: CMSPlugin = {
  id: 'aem',

  register(container: DependencyContainer) {
    container.register('AEMClient', {
      useFactory: () => new AEMClient()
    });

    container.register('SourceCMSAdapter:aem', {
      useFactory: c =>
        new AEMSourceAdapter(c.resolve('AEMClient'))
    });

    container.register('TargetCMSAdapter:aem', {
      useFactory: c =>
        new AEMTargetAdapter(c.resolve('AEMClient'))
    });
  }
};

export default AemPlugin;
