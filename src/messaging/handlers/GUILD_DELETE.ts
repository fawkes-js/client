import { type Client } from "../../Client";

export class GUILD_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_DELETE", (packet) => {
      void (async (packet) => {
        if ((await this.client.cache.has("guild:" + <string>packet.id)) === true) {
          this.client.emit("guildDelete", packet);

          await this.client.cache.delete("guild:" + <string>packet.id);
        } else await this.client.cache.patch("guild:" + <string>packet.id, packet);
      })(packet);
    });
  }
}
