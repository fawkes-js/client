import { type Snowflake } from "@fawkes.js/typings";
import { type Client } from "../Client";
import { GuildMember } from "../structures/GuildMember";
import { type CacheGuild } from "../messaging/structures/CacheGuild";
import { getCacheGuildMember } from "../utils/CacheUpdate";

export class GuildMembersHub {
  client!: Client;
  guild: CacheGuild;
  constructor(client: Client, guild: CacheGuild) {
    Object.defineProperty(this, "client", { value: client });

    Object.defineProperty(this, "guild", { value: guild });
  }

  async fetch(id: Snowflake): Promise<GuildMember | null> {
    const member = await getCacheGuildMember(this.client, this.guild.id, id);
    if (member !== null) return new GuildMember(this.client, this.guild, member);
    else return null;
  }

  async me(): Promise<GuildMember | null> {
    return await this.fetch(this.client.application?.client.id);
  }
}
