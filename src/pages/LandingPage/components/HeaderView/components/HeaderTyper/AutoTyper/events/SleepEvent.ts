import { AutoTyper } from "../index";
import { defineConfig } from "@agile-ts/core";
import { Event } from "./Event";

export class SleepEvent extends Event {
  public config: SleepEventConfigInterface;

  constructor(autoTyper: AutoTyper, config: SleepEventConfigInterface = {}) {
    super(autoTyper);
    config = defineConfig(config, {
      ms: 1000,
    });
    this.config = config;
  }
}

export interface SleepEventConfigInterface {
  ms?: number;
}
