import path from 'path';
import { pathToFileURL } from 'url';
import { CMSPlugin } from '../../core/plugin-contract/CMSPlugin.js';

export class PluginLoader {
  private plugins = new Map<string, CMSPlugin>();

  async load(pluginDir: string): Promise<void> {
    /**
     * Example pluginDir:
     *   dist/plugins
     */
    const fs = await import('fs/promises');
    const entries = await fs.readdir(pluginDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const pluginIndexPath = path.join(
        pluginDir,
        entry.name,
        'index.js'
      );

      try {
        const moduleUrl = pathToFileURL(pluginIndexPath).href;
        const mod = await import(moduleUrl);

        const plugin: CMSPlugin = mod.default;

        if (!plugin?.id) {
          throw new Error(`Invalid plugin in ${pluginIndexPath}`);
        }

        this.plugins.set(plugin.id, plugin);
        console.log(`[PluginLoader] Loaded plugin: ${plugin.id}`);
      } catch (err) {
        console.error(
          `[PluginLoader] Failed to load plugin ${entry.name}`,
          err
        );
      }
    }
  }

  get(type: string): CMSPlugin {
    const plugin = this.plugins.get(type);
    if (!plugin) {
      throw new Error(`Plugin not found: ${type}`);
    }
    return plugin;
  }
}
