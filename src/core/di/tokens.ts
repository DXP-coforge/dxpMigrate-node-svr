import { PluginLoader } from "../../providers/plugin/PluginLoader.js";

export const TOKENS = {
  SourceCMSAdapter: Symbol('SourceCMSAdapter'),
  TargetCMSAdapter: Symbol('TargetCMSAdapter'),
  MigrationContext: Symbol('MigrationContext'),
  PluginLoader: Symbol('PluginLoader'),
  MigrationController: Symbol('MigrationController'),
  MappingProvider: Symbol("MappingProvider")
};
