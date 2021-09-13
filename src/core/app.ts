import {
  assignSharedAgileStorageManager,
  createStorageManager,
} from '@agile-ts/core';
import { inDevelopment } from '../utils';
import { assignSharedAgileLoggerConfig, Logger } from '@agile-ts/logger';

assignSharedAgileLoggerConfig({
  active: inDevelopment(),
  level: Logger.level.WARN,
});
const storageManager = createStorageManager({ localStorage: true });
assignSharedAgileStorageManager(storageManager);
