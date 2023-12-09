import { type DiscordAPIChannel } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { CacheChannel } from "../structures/CacheChannel";
// import { CacheChannel } from "../structures/CacheChannel";
// import { type CacheGuild } from "../structures/CacheGuild";
export class CHANNEL_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_UPDATE", (packet: DiscordAPIChannel) => {
      void (async (packet) => {
        // Does not merge any existing properties.
        await this.client.cache.set(`guild:${packet.guild_id}:channel:${packet.id}`, new CacheChannel(packet));

        this.client.emit("channelUpdate", new Channel(this.client, packet));
      })(packet);
    });
  }
}
