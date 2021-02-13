export class LoopEvent {
  public count?: number;
  public infinite: boolean;

  constructor(count?: number) {
    this.count = count;
    this.infinite = !count;
  }
}
