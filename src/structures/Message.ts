import { type DiscordAPIMessage, type Snowflake } from "@fawkes.js/api-types";
import { EventEmitter } from "node:events";
import { type Client } from "../Client";

class Collector extends EventEmitter {
  temp: string;
  constructor() {
    super();

    this.temp = "temp";
  }
}

export class Message {
  id: Snowflake;
  content: string;
  client: Client;
  constructor(client: Client, message: DiscordAPIMessage) {
    this.client = client;

    this.id = message.id;

    this.content = message.content;
  }

  reply(): void {}

  delete(): void {}

  async createCollector(): Promise<Collector> {
    const collector = new Collector();

    await this.client.cache.set("event:message:" + this.id, this.client.messager.queue.queue);

    this.client.on("event:message" + this.id, (interaction) => {
      collector.emit("collect", interaction);
    });
    return collector;
  }
}
