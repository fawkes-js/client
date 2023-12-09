import { type DiscordAPIGuildMember } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CacheGuildMember } from "../structures/CacheGuildMember";
import { GuildMember } from "../../structures/GuildMember";
import { getCacheGuild } from "../../utils/CacheUpdate";
import { type CacheGuild } from "../structures/CacheGuild";

export class GUILD_MEMBER_ADD {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_MEMBER_ADD", (packet: DiscordAPIGuildMember) => {
      void (async (packet) => {
        if (!packet.user) console.log("no packet user");

        await this.client.cache.set(`guild:${packet.guild_id}:members:${<string>packet.user?.id}`, new CacheGuildMember(packet));

        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        if (!cacheGuild) return;

        this.client.emit("guildMemberAdd", new GuildMember(this.client, cacheGuild, new CacheGuildMember(packet)));
      })(packet);
    });
  }
}
