import { type Client } from "../../Client";
import { GuildMember } from "../../structures/GuildMember";
import { getCacheGuild } from "../../utils/CacheUpdate";
import { type CacheGuild } from "../structures/CacheGuild";
import { CacheGuildMember } from "../structures/CacheGuildMember";

export class GUILD_MEMBER_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_MEMBER_UPDATE", (packet) => {
      void (async (packet) => {
        // Not merging existing data that is in the cache.
        await this.client.cache.set(
          `packet:${<string>packet.guild_id}:member:${<string>packet.user.id}`,
          new CacheGuildMember(packet)
        );

        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        if (!cacheGuild) return;

        this.client.emit("guildMemberUpdate", new GuildMember(this.client, cacheGuild, new CacheGuildMember(packet)));
      })(packet);
    });
  }
}
