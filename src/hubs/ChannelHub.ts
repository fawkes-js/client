import { DiscordAPIChannel, Snowflake } from "@fawkes.js/api-types";
import { Client } from "../Client";
import { Guild } from "../structures/Guild";

export class ChannelHub {
  client!: Client;
  guild: Guild;
  constructor(client: Client, guild: Guild) {
    Object.defineProperty(this, 'client', { value: client });


    this.guild = guild;
  }

  async fetch(id: Snowflake) {
    const cachedGuild = await this.client.cache.get('guild:' + this.guild.id);
    const channel = cachedGuild.channels.find((channel: DiscordAPIChannel) => channel.id === id);

    if (channel) return channel
    else return null;
  }
}
