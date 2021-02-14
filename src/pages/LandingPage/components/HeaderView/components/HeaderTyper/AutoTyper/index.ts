import { Agile, defineConfig } from "@agile-ts/core";
import { Event } from "./events/Event";
import { RemoveEvent, RemoveEventConfigInterface } from "./events/RemoveEvent";
import { TypeEvent, TypeEventConfigInterface } from "./events/TypeEvent";
import { SleepEvent, SleepEventConfigInterface } from "./events/SleepEvent";
import { LoopEvent, LoopEventConfigInterface } from "./events/LoopEvent";

export class AutoTyper {
  private activeInterval?: NodeJS.Timer | number;
  public isTyping: boolean;

  public queue: Event[];
  public onceExecutedQueue: Event[];

  public textListener: (currentText: string, isActive: boolean) => void;
  public text: string;

  constructor(config: AutoTyperConfigInterface = {}) {
    config = defineConfig(config, {
      initialText: "",
      textListener: () => {},
    });
    this.text = config.initialText;
    this.textListener = config.textListener;
    this.queue = [];
    this.onceExecutedQueue = [];
    this.isTyping = false;

    this.textListener(this.text, false);
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

  public on(textListener: TextListenerType): this {
    this.textListener = textListener;
    return this;
  }

  private async executeEvents() {
    Agile.logger.info("Started executing Events!");
    for (const event of this.queue) {
      await event.execute();
    }
    Agile.logger.info("Finished executing Events!");
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

export type TextListenerType = (currentText: string, isActive: boolean) => void;

export interface AutoTyperConfigInterface {
  initialText?: string;
  textListener?: TextListenerType;
}
