import { Client } from "../../Client";

export class GUILD_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  initialize() {
    this.client.on("GUILD_DELETE", async (packet) => {
      if (await this.client.cache.has('guild:' + packet.id)) {
        this.client.emit("guildDelete", packet);

        await this.client.cache.delete('guild:' + packet.id);
      } else await this.client.cache.patch('guild:' + packet.id, packet);
    });
  }
}
