import { type DiscordAPIChannel } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";

export class CHANNEL_PINS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_PINS_UPDATE", (packet) => {
      void (async (packet) => {
        const cacheGuild = await this.client.cache.get("guild:" + <string>packet.guild_id);

        const cacheChannel = cacheGuild.channels.find((channel: DiscordAPIChannel) => channel.id === packet.channel_id);

        if (!cacheChannel) console.log("ERROR");
        else {
          cacheChannel.last_pin_timestamp = packet.last_pin_timestamp;

          cacheGuild.channels.splice(
            cacheGuild.channels.findIndex((channel) => channel.id === packet.id),
            1,
            cacheChannel
          );
        }

        this.client.emit("channelsPinsUpdate", new Channel(this.client, packet));
      })(packet);
    });
  }
}
