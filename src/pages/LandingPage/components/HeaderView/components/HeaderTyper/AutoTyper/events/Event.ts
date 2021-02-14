import { AutoTyper } from "../index";
import { Agile } from "@agile-ts/core";

export class Event {
  public autoTyper: () => AutoTyper;
  public executed: boolean;
  public isTypeEvent: boolean;

  constructor(autoTyper: AutoTyper, isTypeEvent: boolean) {
    this.autoTyper = () => autoTyper;
    this.executed = false;
    this.isTypeEvent = isTypeEvent;
  }

  public async execute(): Promise<void> {
    Agile.logger.warn("Executing empty function!");
  }
}
