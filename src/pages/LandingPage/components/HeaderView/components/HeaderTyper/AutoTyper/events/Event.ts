import { AutoTyper } from "../index";
import { Agile } from "@agile-ts/core";

export class Event {
  public autoTyper: () => AutoTyper;
  public executed: boolean;

  constructor(autoTyper: AutoTyper) {
    this.autoTyper = () => autoTyper;
    this.executed = false;
  }

  public async execute(): Promise<void> {
    Agile.logger.warn("Executing empty function!");
  }
}
