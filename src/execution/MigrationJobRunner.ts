import { injectable, inject } from 'tsyringe';
import { TOKENS } from '../core/di/tokens.js';
import { PluginLoader } from '../providers/plugin/PluginLoader.js';
import { MigrationEngine } from '../core/engine/MigrationEngine.js';

@injectable()
export class MigrationJobRunner {
  constructor(
    @inject(TOKENS.PluginLoader)
    private readonly pluginLoader: PluginLoader,

    @inject(MigrationEngine)
    private readonly engine: MigrationEngine
  ) {}

  async run(request: any) {
    // job execution logic
  }
}
