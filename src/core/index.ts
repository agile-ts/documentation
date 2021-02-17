import ui from "./entities/ui";
import { globalBind } from "@agile-ts/core";

const core = {
  ui: ui,
};

// For better debugging you might want our core global (Don't do that in PRODUCTION!!)
globalBind("__core__", core);

export default core;
