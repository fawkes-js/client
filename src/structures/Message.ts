import {
  type DiscordAPIGuild,
  type DiscordAPIMessage,
  type Snowflake,
  type DiscordAPIMessageComponentInteraction,
  Routes,
} from "@fawkes.js/typings";
import { type Client } from "../Client";
import { MessageComponentInteraction } from "./interactions/MessageComponentInteraction";
import { Collector, type CollectorOptions } from "./Collector";
import { type RabbitMQMessageClient } from "../messaging/messaging/RabbitMQMessageClient";
import { User } from "./User";

export class Message {
  id: Snowflake;
  content: string;
  client: Client;
  message: DiscordAPIMessage;
  author: User;
  constructor(client: Client, message: DiscordAPIMessage) {
    this.client = client;

    this.id = message.id;

    this.content = message.content;

    this.message = message;

    this.author = new User(this.client, message.author);
  }

  async reply(data: { content: string }): Promise<void> {
    await this.client.rest.request(Routes.createMessage(this.message.channel_id), { content: data.content });
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

      const guild: DiscordAPIGuild = await this.client.cache.get(`guild:${<string>interaction.guild_id}`);
      if (!guild) {
        console.log("need to throw an error here");
        return;
      }

      const channel = guild.channels.find((channel) => channel.id === interaction.channel_id);
      if (!channel) return; // THROW AN ERROR

      collector.emit("collect", new MessageComponentInteraction(this.client, interaction, guild, channel));

      if (collector.limit && collector.collected >= collector.limit) await collector.stop("Limit reached.");
    });

    return collector;
  }
}
