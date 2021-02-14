import { AutoTyper } from "../index";
import { Event } from "./Event";

export class LoopEvent extends Event {
  public config: LoopEventConfigInterface;
  public infinite: boolean;

  constructor(autoTyper: AutoTyper, config: LoopEventConfigInterface = {}) {
    super(autoTyper, false);
    this.config = config;
    this.infinite = !config.count;
  }

  public async execute(): Promise<void> {}
}

export interface LoopEventConfigInterface {
  count?: number;
}
