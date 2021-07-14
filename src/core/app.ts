import { Agile } from '@agile-ts/core';
import { inDevelopment } from '../utils';
import { assignSharedAgileLoggerConfig, Logger } from '@agile-ts/logger';

assignSharedAgileLoggerConfig({
  active: inDevelopment(),
  level: Logger.level.WARN,
});
export const App = new Agile();
