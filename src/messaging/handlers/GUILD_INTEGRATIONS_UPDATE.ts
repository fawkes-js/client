import { type Client } from "../../Client";
import { Guild } from "../../structures/Guild";
import { getCacheGuild } from "../../utils/CacheUpdate";

export class GUILD_INTEGRATIONS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_INTEGRATIONS_UPDATE", (packet) => {
      void (async (packet) => {
        console.log(packet);
        const cacheGuild = await getCacheGuild(this.client, packet.guild_id);
        if (!cacheGuild) return;

        this.client.emit("guildIntegrationsUpdate", new Guild(this.client, cacheGuild));
      })(packet);
    });
  }
}
