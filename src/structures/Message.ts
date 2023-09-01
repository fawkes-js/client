import {
  type DiscordAPIGuild,
  type DiscordAPIMessage,
  type Snowflake,
  type DiscordAPIMessageComponentInteraction,
} from "@fawkes.js/typings";
import { type Client } from "../Client";
import { MessageComponentInteraction } from "./interactions/MessageComponentInteraction";
import { Collector, type CollectorOptions } from "./Collector";

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

  edit(): void {}

  async createCollector(options?: CollectorOptions): Promise<Collector> {
    const collector = new Collector(options ?? {}, this.client, this.id);

    let timerReset = false;
    let timeout;
    collector.on("timerReset", () => {
      clearTimeout(timeout);
      timerReset = true;
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(async () => {
        if (timerReset) timerReset = false;
        else await collector.stop("Time expired.");
      }, options?.time);
    });
    if (options?.time)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      timeout = setTimeout(async () => {
        if (timerReset) timerReset = false;
        else await collector.stop("Time expired.");
      }, options?.time);

    await this.client.cache.set("event:message:" + this.id, this.client.messager.queue.queue);

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
