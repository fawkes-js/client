import { EventEmitter } from "node:events";
import { type Client } from "../Client";
import { type Snowflake } from "@fawkes.js/typings";

export interface CollectorOptions {
  limit?: number;
  time?: number;
}

export class Collector extends EventEmitter {
  limit?: number;
  time?: number;
  collected: number;
  ended: boolean;
  interactionId: string;
  client: Client;
  endReason: undefined | string;
  constructor(options: CollectorOptions, client: Client, id: Snowflake) {
    super();

    this.client = client;

    this.interactionId = id;

    this.limit = options.limit;

    this.time = options.time;

    this.collected = 0;

    this.ended = false;

    this.endReason = undefined;
  }

  async stop(reason?: string): Promise<void> {
    console.log("STOP!");
    if (this.ended) return;
    if (!reason) reason = undefined;

    this.ended = true;
    this.endReason = reason;
    await this.client.cache.del(`event:message:${this.interactionId}`);
    this.emit("end", { collected: this.collected, reason: this.endReason });
    this.client.removeListener(`event:message:${this.interactionId}`, () => {});
    this.removeAllListeners();
  }

  resetTimer(): void {
    console.log("RESET TIMER");
    this.emit("timerReset", null);
  }
}
