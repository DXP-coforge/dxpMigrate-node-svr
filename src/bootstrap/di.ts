import { DependencyContainer } from 'tsyringe';
import { PluginLoader } from '../providers/plugin/PluginLoader.js';
import { MigrationJobRunner } from '../execution/MigrationJobRunner.js';
import { MigrationEngine } from '../core/engine/MigrationEngine.js';
import { TOKENS } from '../core/di/tokens.js';
import { PluginRegistry } from '../providers/plugin/PluginRegistry.js';
import { FileUploadMappingProvider } from '../providers/mapping/FileUploadMappingProvider.js';
import { MappingResolver } from '../providers/mapping/MappingResolver.js';

export async function bootstrapDI(container: DependencyContainer) {
  // Core services
  container.registerSingleton(MigrationEngine);
  container.registerSingleton(MigrationJobRunner);

  // Plugin loader
  container.registerSingleton(TOKENS.PluginLoader, PluginLoader);

  // Load CMS plugins
  const pluginLoader = container.resolve<PluginLoader>(
    TOKENS.PluginLoader
  );

  container.register(TOKENS.MappingProvider, {
    useClass: FileUploadMappingProvider
  });

container.register(MappingResolver, {
  useClass: MappingResolver
});

  // ----------------------------------
  // 3. Load CMS plugins
  // ----------------------------------
  const registry = new PluginRegistry({
    aem: './plugins/aem/index.js',
    optimizely: './plugins/optimizely/index.js'
  });

  const pluginDir = new URL('../plugins', import.meta.url).pathname;
  await pluginLoader.load(pluginDir);
}
