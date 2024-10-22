import { type DiscordAPIUser } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { type CacheGuild } from "../structures/CacheGuild";
import { User } from "../../structures/User";
import { getCacheGuild } from "../../utils/CacheUpdate";

export class GUILD_BAN_ADD {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_BAN_ADD", (packet: { guild_id: string; user: DiscordAPIUser }) => {
      void (async (packet) => {
        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        if (!cacheGuild) return;

        cacheGuild.bans.push(packet.user.id);

        await this.client.cache.set("guild:" + packet.guild_id, cacheGuild);

        this.client.emit("guildBanAdd", new User(this.client, packet.user));
      })(packet);
    });
  }
}
