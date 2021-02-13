export class SleepEvent {
  public ms: number;

  constructor(ms?: number) {
    this.ms = ms || 1000;
  }
}
