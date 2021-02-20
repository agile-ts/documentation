import { AutoTyper } from '../index';
import { Agile } from '@agile-ts/core';

export class Event {
  public eventType: string;
  public autoTyper: () => AutoTyper;
  public isTypeEvent: boolean;

  constructor(autoTyper: AutoTyper, isTypeEvent: boolean, eventType?: string) {
    this.autoTyper = () => autoTyper;
    this.isTypeEvent = isTypeEvent;
    this.eventType = eventType || 'unknown';
  }

  public async execute(): Promise<void> {
    Agile.logger.warn('Executing empty function!');
  }
}
