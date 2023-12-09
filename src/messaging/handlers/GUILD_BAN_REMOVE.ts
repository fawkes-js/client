import { type DiscordAPIUser } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { User } from "../../structures/User";
import { type CacheGuild } from "../structures/CacheGuild";
import { getCacheGuild } from "../../utils/CacheUpdate";

export class GUILD_BAN_REMOVE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_BAN_REMOVE", (packet: { guild_id: string; user: DiscordAPIUser }) => {
      void (async (packet) => {
        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        if (!cacheGuild) return;

        cacheGuild.bans.splice(
          cacheGuild.bans.findIndex((id: string) => id === packet.user.id),
          1
        );
        await this.client.cache.set("guild:" + packet.guild_id, cacheGuild);

        this.client.emit("guildBanRemove", new User(this.client, packet.user));
      })(packet);
    });
  }
}
