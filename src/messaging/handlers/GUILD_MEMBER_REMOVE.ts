import { type DiscordAPIUser, type Snowflake } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { GuildMember } from "../../structures/GuildMember";
import { getCacheGuild, getCacheGuildMember } from "../../utils/CacheUpdate";
import { User } from "../../structures/User";
import { type CacheGuild } from "../structures/CacheGuild";

export class GUILD_MEMBER_REMOVE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_MEMBER_REMOVE", (packet: { guild_id: Snowflake; user: DiscordAPIUser }) => {
      void (async (packet) => {
        await this.client.cache.del(`guild:${packet.guild_id}:members:${packet.user?.id}`);

        const guildMember = await getCacheGuildMember(this.client, packet.guild_id, packet.user.id);

        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        if (!cacheGuild) return;

        this.client.emit(
          "guildMemberRemove",
          guildMember ? new GuildMember(this.client, cacheGuild, guildMember) : new User(this.client, packet.user)
        );
      })(packet);
    });
  }
}
