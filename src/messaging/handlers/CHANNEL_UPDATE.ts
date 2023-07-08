import { type DiscordAPIChannel } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { CacheChannel } from "../structures/CacheChannel";
import { type CacheGuild } from "../structures/CacheGuild";
export class CHANNEL_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_UPDATE", (packet: DiscordAPIChannel) => {
      void (async (packet) => {
        console.log(packet);
        const cacheGuild: CacheGuild = await this.client.cache.get("guild:" + packet.guild_id);

        const cacheChannel = cacheGuild.channels.find((channel: CacheChannel) => channel.id === packet.id);

        const newChannel: CacheChannel = new CacheChannel(packet);

        console.log(cacheChannel, "--//--", newChannel);
        this.client.emit("channelUpdate", new Channel(this.client, packet));
      })(packet);
    });
  }
}
