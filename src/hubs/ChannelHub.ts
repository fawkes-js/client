import { type DiscordAPIChannel, type Snowflake } from "@fawkes.js/typings";
import { type Client } from "../Client";
import { type Guild } from "../structures/Guild";
import { Channel } from "../structures/Channel";

export class ChannelHub {
  client!: Client;
  guild: Guild;
  constructor(client: Client, guild: Guild) {
    Object.defineProperty(this, "client", { value: client });

    this.guild = guild;
  }

  async fetch(id: Snowflake): Promise<Channel | null> {
    const cachedGuild = await this.client.cache.get("guild:" + this.guild.id);
    const channel = cachedGuild.channels.find((channel: DiscordAPIChannel) => channel.id === id);

    if (channel !== null) return new Channel(this.client, channel);
    else return null;
  }
}
