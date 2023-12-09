import { type Client } from "../../Client";
import { Guild } from "../../structures/Guild";
import { getCacheGuild } from "../../utils/CacheUpdate";
import { type CacheGuild } from "../structures/CacheGuild";

export class GUILD_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_DELETE", (packet) => {
      void (async (packet) => {
        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.id);

        await this.client.cache.del(`guild:${<string>packet.id}`);

        this.client.emit("guildDelete", cacheGuild ? new Guild(this.client, cacheGuild) : null);
      })(packet);
    });
  }
}
