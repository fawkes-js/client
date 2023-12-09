import {
  type Snowflake,
  type DiscordAPIMessageComponentInteraction,
  Routes,
  type MessageResponseOptions,
  type FawkesMessage,
} from "@fawkes.js/typings";
import { type Client } from "../Client";
import { MessageComponentInteraction } from "./interactions/MessageComponentInteraction";
import { Collector, type CollectorOptions } from "./Collector";
import { type RabbitMQMessageClient } from "../messaging/messaging/RabbitMQMessageClient";
import { User } from "./User";
import { type CacheGuild } from "../messaging/structures/CacheGuild";
import { getCacheChannel, getCacheGuild } from "../utils/CacheUpdate";

export class Message {
  id: Snowflake;
  content: string;
  client: Client;
  message: FawkesMessage;
  author: User;
  constructor(client: Client, message: FawkesMessage) {
    this.client = client;

    this.id = message.id;

    this.content = message.content;

    this.message = message;

    this.author = new User(this.client, message.author);
  }

  async reply(data: MessageResponseOptions): Promise<void> {
    await this.client.rest.request(Routes.createMessage(this.message.channelId), {
      content: data.content ?? "",
      embeds: data.embeds ?? [],
      components: data.components ?? [],
      attachments: data.attachments ?? [],
      message_reference: { message_id: this.id },
    });
  }

  delete(): void {}

  edit(): void {}

  async createCollector(options?: CollectorOptions): Promise<Collector> {
    const collector = new Collector(options ?? {}, this.client, this.id);

    let timeout;

    const setCollectorTimeout = (): any => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      return setTimeout(async () => {
        await collector.stop("Time expired.");
      }, options?.time);
    };

    if (options?.time) timeout = setCollectorTimeout();

    collector.on("timerReset", () => {
      clearTimeout(timeout);
      timeout = setCollectorTimeout();
    });

    if (!this.client.gateway)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      await this.client.cache.set("event:message:" + this.id, <RabbitMQMessageClient>this.client.messager.queue.queue);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.client.on("event:message:" + this.id, async (interaction: DiscordAPIMessageComponentInteraction): Promise<void> => {
      collector.collected += 1;

      if (collector.limit && collector.collected > collector.limit) await collector.stop("Limit reached.");

      const cacheGuild: CacheGuild = await getCacheGuild(this.client, <string>interaction.guild_id);

      const cacheChannel = await getCacheChannel(this.client, <string>interaction.guild_id, <string>interaction.channel_id);

      collector.emit("collect", new MessageComponentInteraction(this.client, interaction, cacheGuild, cacheChannel));

      if (collector.limit && collector.collected >= collector.limit) await collector.stop("Limit reached.");
    });

    return collector;
  }
}
