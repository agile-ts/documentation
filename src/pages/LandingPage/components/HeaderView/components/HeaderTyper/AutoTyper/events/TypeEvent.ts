import { AutoTyper } from "../index";
import { defineConfig } from "@agile-ts/core";
import { Event } from "./Event";

export class TypeEvent extends Event {
  public config: TypeEventConfigInterface;

  constructor(autoTyper: AutoTyper, config: TypeEventConfigInterface = {}) {
    super(autoTyper, true);
    config = defineConfig(config, {
      toType: "nothing defined",
      timeBetweenLetter: 500,
    });
    this.config = config;
  }

  public async execute(): Promise<void> {
    const autoTyper = this.autoTyper();
    const lettersToType = this.config.toType.split("");

    return new Promise((resolve) => {
      autoTyper.interval(() => {
        // Add Char
        const char = lettersToType.shift();
        if (char) {
          autoTyper.setText(`${autoTyper.text}${char}`);
          return;
        }

        // Clear Interval
        autoTyper.clearInterval();
        this.executed = true;
        resolve(undefined);
      }, this.config.timeBetweenLetter);
    });
  }
}

export interface TypeEventConfigInterface {
  toType?: string;
  timeBetweenLetter?: number;
}
