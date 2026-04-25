import { container } from 'tsyringe';
import { TOKENS } from './tokens.js';
import { MigrationContext } from '../context/MigrationContext.js';
export function registerCore(context: MigrationContext) {
  container.registerInstance(TOKENS.MigrationContext, context);
}
