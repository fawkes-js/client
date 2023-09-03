import { type DiscordAPIChannel } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { CacheChannel } from "../structures/CacheChannel";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_CREATE", (packet: DiscordAPIChannel) => {
      void (async (packet) => {
        await this.client.cache.set(`guild:${packet.guild_id}:channel:${packet.id}`, new CacheChannel(packet));

        this.client.emit("channelCreate", new Channel(this.client, packet));
      })(packet);
    });
  }
}
