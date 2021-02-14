import { AutoTyper } from "../index";
import { Event } from "./Event";

export class RemoveEvent extends Event {
  public config: RemoveEventConfigInterface;
  public all: boolean;

  constructor(autoTyper: AutoTyper, config: RemoveEventConfigInterface = {}) {
    super(autoTyper);
    this.config = config;
    this.all = !config.charCount;
  }
}

export interface RemoveEventConfigInterface {
  charCount?: number;
}
