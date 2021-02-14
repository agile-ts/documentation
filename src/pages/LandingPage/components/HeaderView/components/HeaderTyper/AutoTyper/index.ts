import { Agile, defineConfig } from "@agile-ts/core";
import { Event } from "./events/Event";
import { RemoveEvent, RemoveEventConfigInterface } from "./events/RemoveEvent";
import { TypeEvent, TypeEventConfigInterface } from "./events/TypeEvent";
import { SleepEvent, SleepEventConfigInterface } from "./events/SleepEvent";
import { LoopEvent, LoopEventConfigInterface } from "./events/LoopEvent";

export class AutoTyper {
  private activeInterval?: NodeJS.Timer | number;

  public queue: Event[];
  public onceExecutedQueue: Event[]; // Necessary for loop function

  public textListener: TextListenerType;
  public text: string;

  public isTyping: boolean;
  public isTypingListener: IsTypingListenerType;

  constructor(config: AutoTyperConfigInterface = {}) {
    config = defineConfig(config, {
      initialText: "",
      textListener: () => {},
      isTypingListener: () => {},
    });
    this.text = config.initialText;
    this.textListener = config.textListener;
    this.isTypingListener = config.isTypingListener;
    this.queue = [];
    this.onceExecutedQueue = [];
    this.isTyping = false;

    this.textListener(this.text);
    this.isTypingListener(this.isTyping);
  }

  public remove(config: RemoveEventConfigInterface = {}): this {
    this.queue.push(new RemoveEvent(this, config));
    return this;
  }

  public type(config: TypeEventConfigInterface = {}): this {
    this.queue.push(new TypeEvent(this, config));
    return this;
  }

  public loop(config: LoopEventConfigInterface = {}): this {
    this.queue.push(new LoopEvent(this, config));
    return this;
  }

  public sleep(config: SleepEventConfigInterface = {}): this {
    this.queue.push(new SleepEvent(this, config));
    return this;
  }

  public start(): this {
    this.executeEvents();
    return this;
  }

  private async executeEvents() {
    const performEvent = this.queue.shift();
    if (performEvent) await this.executeEvent(performEvent);
  }

  private async executeEvent(event: Event) {
    if (this.activeInterval) {
      Agile.logger.warn("One Event is still acitve");
      return;
    }

    if (event.isTypeEvent) {
      this.isTyping = true;
      this.isTypingListener(this.isTyping);
    }

    // Execute Event
    await event.execute();
    this.onceExecutedQueue.push(event);

    if (event.isTypeEvent) {
      this.isTyping = false;
      this.isTypingListener(this.isTyping);
    }

    // Perform next Event if one is in the queue
    if (this.queue.length > 0) {
      const performEvent = this.queue.shift();
      if (performEvent) await this.executeEvent(performEvent);
    }
  }

  public setText(text: string) {
    this.text = text;
    this.textListener(text);
  }

  public interval(onIntervalCalled: () => void, ms?: number): this {
    if (this.activeInterval !== undefined) return this;
    this.activeInterval = setInterval(() => {
      onIntervalCalled();
    }, ms || 1000);

    return this;
  }

  public clearInterval(): void {
    if (this.activeInterval) {
      clearInterval(this.activeInterval as number);
      delete this.activeInterval;
    }
  }
}

export type TextListenerType = (currentText: string) => void;
export type IsTypingListenerType = (isTyping: boolean) => void;

export interface AutoTyperConfigInterface {
  initialText?: string;
  textListener?: TextListenerType;
  isTypingListener?: IsTypingListenerType;
}
