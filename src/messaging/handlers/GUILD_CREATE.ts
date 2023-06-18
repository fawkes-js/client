import { type DiscordAPIGuild } from "@fawkes.js/api-types";
import { type Client } from "../../Client";
import { Guild } from "../../structures/Guild";

export class GUILD_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_CREATE", (packet) => {
      void (async (packet: DiscordAPIGuild) => {
        if ((await this.client.cache.has("guild:" + packet.id)) === false) {
          await this.client.cache.set("guild:" + packet.id, packet);

          const guild = new Guild(this.client, packet);
          this.client.emit("guildCreate", guild);
        } else await this.client.cache.set("guild:" + packet.id, packet);
      })(packet);
    });
  }
}
