import { AutoTyper } from "../index";
import { defineConfig } from "@agile-ts/core";
import { Event } from "./Event";

export class TypeEvent extends Event {
  public config: TypeEventConfigInterface;

  constructor(autoTyper: AutoTyper, config: TypeEventConfigInterface = {}) {
    super(autoTyper);
    config = defineConfig(config, {
      toType: "nothing defined",
      timeBetweenLetter: 100,
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
          autoTyper.text = `${autoTyper.text}${char}`;

          // Call Listener
          autoTyper.textListener(autoTyper.text, true);
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
