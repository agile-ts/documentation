import { Agile, Logger } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';
import { inDevelopment } from '../utils';

export const App = new Agile({
  logConfig: {
    active: inDevelopment(),
    level: Logger.level.WARN,
  },
}).integrate(reactIntegration);
