import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { CacheChannel } from "../structures/CacheChannel";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_CREATE", (packet) => {
      void (async (packet) => {
        const guild = await this.client.cache.get("guild:" + <string>packet.guild_id);
        guild.channels.push(new CacheChannel(packet));
        await this.client.cache.set("guild:" + <string>packet.guild_id, guild);

        this.client.emit("channelCreate", new Channel(this.client, packet));
      })(packet);
    });
  }
}
