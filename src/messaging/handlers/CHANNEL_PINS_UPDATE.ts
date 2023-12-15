import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { getCacheChannel } from "../../utils/CacheUpdate";
import { type CacheChannel } from "../structures/CacheChannel";

export class CHANNEL_PINS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_PINS_UPDATE", (packet) => {
      void (async (packet) => {
        const cacheChannel: CacheChannel | null = await getCacheChannel(this.client, packet.guild_id, packet.channel_id);
        if (!cacheChannel) return;

        cacheChannel.lastPinTimestamp = packet.last_pin_timestamp;

        await this.client.cache.set(`guild:${<string>packet.guild_id}:channel:${<string>packet.channel_id}`, cacheChannel);

        this.client.emit("channelsPinsUpdate", new Channel(this.client, packet));
      })(packet);
    });
  }
}
