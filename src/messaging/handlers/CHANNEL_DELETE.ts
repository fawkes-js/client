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
        const cacheGuild = await this.client.cache.get("guild:" + packet.guild_id);

        cacheGuild.channels.splice(
          cacheGuild.channels.findIndex((id: string) => id === packet.id),
          1
        );
        await this.client.cache.set("channel:" + packet.guild_id, cacheGuild);

        this.client.emit("channelCreate", new Channel(this.client, packet));
      })(packet);
    });
  }
}
