import { type DiscordAPIChannel } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";

export class CHANNEL_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_DELETE", (packet) => {
      void (async (packet) => {
        const guild = await this.client.cache.get("guild:" + <string>packet.guild_id);

        guild.channels = guild.channels.filter((channel: DiscordAPIChannel) => channel.id !== packet.id);
        await this.client.cache.set("guild:" + <string>packet.guild_id, guild);

        const channel = new Channel(packet);
        this.client.emit("channelCreate", channel);
      })(packet);
    });
  }
}
