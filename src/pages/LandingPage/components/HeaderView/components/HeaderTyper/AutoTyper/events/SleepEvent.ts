import { AutoTyper } from "../index";
import { defineConfig } from "@agile-ts/core";
import { Event } from "./Event";

export class SleepEvent extends Event {
  public config: SleepEventConfigInterface;

  constructor(autoTyper: AutoTyper, config: SleepEventConfigInterface = {}) {
    super(autoTyper, false);
    config = defineConfig(config, {
      ms: 2000,
    });
    this.config = config;
  }

  public async execute(): Promise<void> {
    return new Promise((resolve) => {
      this.autoTyper().timeout(() => {
        this.executed = true;
        resolve(undefined);
      }, this.config.ms);
    });
  }
}

export interface SleepEventConfigInterface {
  ms?: number;
}
