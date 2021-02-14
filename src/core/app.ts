import { Agile, Logger } from "@agile-ts/core";
import reactIntegration from "@agile-ts/react";

export const App = new Agile({
  logConfig: {
    active: true,
    level: Logger.level.DEBUG,
  },
}).integrate(reactIntegration);
