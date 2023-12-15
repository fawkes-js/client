import { type Client } from "../Client";
import { Guild } from "../structures/Guild";
import { type CacheGuild } from "../messaging/structures/CacheGuild";
import { getCacheGuild } from "../utils/CacheUpdate";

export class GuildHub {
  client!: Client;
  constructor(client: Client) {
    Object.defineProperty(this, "client", { value: client });
  }

  async fetch(id: string): Promise<Guild | null> {
    const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, id);
    if (!cacheGuild) return null;

    return new Guild(this.client, cacheGuild);
  }
}
