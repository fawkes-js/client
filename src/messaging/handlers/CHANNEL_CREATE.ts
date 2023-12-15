import { type DiscordAPIChannel } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { CacheChannel } from "../structures/CacheChannel";
import { updateCache } from "../../utils/CacheUpdate";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_CREATE", (packet: DiscordAPIChannel) => {
      void (async (packet) => {
        await updateCache(this.client, `guild:${packet.guild_id}:channel:${packet.id}`, new CacheChannel(packet));

        this.client.emit("channelCreate", new Channel(this.client, new CacheChannel(packet)));
      })(packet);
    });
  }
}
