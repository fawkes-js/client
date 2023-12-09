import { type Client } from "../../Client";
import { Role } from "../../structures/Role";
import { CacheRole } from "../structures/CacheRole";

export class GUILD_ROLE_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_ROLE_CREATE", (packet) => {
      void (async (packet) => {
        await this.client.cache.set(`guild:${<string>packet.guild_id}:role:${<string>packet.role.id}`, new CacheRole(packet));

        this.client.emit("guildRoleCreate", new Role(new CacheRole(packet)));
      })(packet);
    });
  }
}
