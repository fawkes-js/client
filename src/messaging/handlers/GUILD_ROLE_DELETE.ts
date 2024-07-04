import { type Client } from "../../Client";
import { Role } from "../../structures/Role";
import { type CacheRole } from "../structures/CacheRole";

export class GUILD_ROLE_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_ROLE_DELETE", (packet) => {
      void (async (packet) => {
        const cacheRole: CacheRole = await this.client.cache.get(`guild:${<string>packet.guild_id}:role:${<string>packet.role_id}`);

        await this.client.cache.del(`guild:${<string>packet.guild_id}:role:${<string>packet.role_id}`);

        this.client.emit("guildRoleDelete", cacheRole ? new Role(cacheRole) : null);
      })(packet);
    });
  }
}
