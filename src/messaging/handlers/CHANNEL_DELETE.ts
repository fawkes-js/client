import { type DiscordAPIChannel } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";

export class CHANNEL_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_DELETE", (packet: DiscordAPIChannel) => {
      void (async (packet: DiscordAPIChannel) => {
        await this.client.cache.del(`guild:${packet.guild_id}:channel:${packet.id}`);

        this.client.emit("channelCreate", new Channel(this.client, packet));
      })(packet);
    });
  }
}
