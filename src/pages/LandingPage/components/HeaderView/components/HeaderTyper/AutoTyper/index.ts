import { RemoveEvent } from "./events/RemoveEvent";
import { TypeEvent } from "./events/TypeEvent";
import { SleepEvent } from "./events/SleepEvent";
import { LoopEvent } from "./events/LoopEvent";

class AutoTyper {
  private activeInterval?: NodeJS.Timer | number;
  public isTyping: boolean;

  public queue: EventTypes[];

  constructor() {
    this.queue = [];
    this.isTyping = false;
  }

  public remove(charCount?: number) {
    this.queue.push(new RemoveEvent(charCount));
  }

  public type(toType: string, timeBetweenLetter?: number) {
    this.queue.push(new TypeEvent(toType, timeBetweenLetter));
  }

  public loop(count?: number) {
    this.queue.push(new LoopEvent(count));
  }

  public sleep(ms?: number) {
    this.queue.push(new SleepEvent(ms));
  }

  public start() {}

  private interval(onIntervalCalled: () => void, ms?: number): this {
    if (this.activeInterval !== undefined) return this;
    this.activeInterval = setInterval(() => {
      onIntervalCalled();
    }, ms || 1000);

    return this;
  }

  private clearInterval(): void {
    if (this.activeInterval) {
      clearInterval(this.activeInterval as number);
      delete this.activeInterval;
    }
  }
}

export type EventTypes = RemoveEvent | TypeEvent | SleepEvent | LoopEvent;
