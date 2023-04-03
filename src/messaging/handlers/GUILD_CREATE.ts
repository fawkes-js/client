import { DiscordAPIGuild } from "@fawkes.js/api-types";
import { Client } from "../../Client";
import { Guild } from "../../structures/Guild";

export class GUILD_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  initialize() {
    this.client.on("GUILD_CREATE", async (packet: DiscordAPIGuild) => {
      if (!(await this.client.cache.has('guild:' + packet.id))) {
        this.client.cache.set('guild:' + packet.id, packet);

        const guild = new Guild(this.client, packet)
        this.client.emit("guildCreate", guild);
      } else this.client.cache.set('guild:' + packet.id, packet);
    });
  }
}
