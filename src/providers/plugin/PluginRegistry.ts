import { CMSPlugin } from "../../core/plugin-contract/CMSPlugin.js";

export class PluginRegistry {
  private cache = new Map<string, CMSPlugin>();

  constructor(private pluginMap: Record<string, string>) {}

  async get(type: string): Promise<CMSPlugin> {
    if (!this.cache.has(type)) {
      const moduleName = this.pluginMap[type];
      if (!moduleName) {
        throw new Error(`No plugin registered for ${type}`);
      }

      const mod = await import(moduleName);
      this.cache.set(type, mod.default as CMSPlugin);
    }

    return this.cache.get(type)!;
  }

  getAll(): Record<string, string> {
    return this.pluginMap;
  }
}
