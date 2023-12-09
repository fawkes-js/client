import { type DiscordAPIGuildMember } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CacheGuildMember } from "../structures/CacheGuildMember";
import { GuildMember } from "../../structures/GuildMember";
import { getCacheGuild } from "../../utils/CacheUpdate";

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

        this.client.emit(
          "guildMemberAdd",
          new GuildMember(this.client, await getCacheGuild(this.client, packet.guild_id), new CacheGuildMember(packet))
        );
      })(packet);
    });
  }
}
