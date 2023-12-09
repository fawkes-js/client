import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { getCacheChannel } from "../../utils/CacheUpdate";

export class CHANNEL_PINS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_PINS_UPDATE", (packet) => {
      void (async (packet) => {
        const cacheChannel = await getCacheChannel(this.client, packet.guild_id, packet.channel_id);
        cacheChannel.lastPinTimestamp = packet.last_pin_timestamp;

        await this.client.cache.set(`guild:${<string>packet.guild_id}:channel:${<string>packet.channel_id}`, cacheChannel);

        this.client.emit("channelsPinsUpdate", new Channel(this.client, packet));
      })(packet);
    });
  }
}
