import { type DiscordAPIApplicationCommandPermissionsStructure } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { type CacheGuild } from "../structures/CacheGuild";
import { ApplicationCommandPermissionsUpdateData } from "../../structures/ApplicationCommandPermissionsUpdateData";

export class APPLICATION_COMMAND_PERMISSIONS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("APPLICATION_COMMAND_PERMISSIONS_UPDATE", (packet) => {
      void (async (packet: DiscordAPIApplicationCommandPermissionsStructure) => {
        const cachePermissions = {
          applicationId: packet.application_id,
          id: packet.id,
          permissions: packet.permissions,
        };

        const guild: CacheGuild = await this.client.cache.get(`guild:${packet.guild_id}`);

        const app = guild.applicationCommandPermissions.find((application) => application.applicationId === packet.application_id);

        if (app)
          guild.applicationCommandPermissions.splice(
            guild.applicationCommandPermissions.findIndex((application) => application.applicationId === packet.application_id),
            0,
            cachePermissions
          );
        else guild.applicationCommandPermissions.push(cachePermissions);

        await this.client.cache.set(`guild:${packet.guild_id}`, guild);

        this.client.emit("applicationCommandPermissionsUpdate", new ApplicationCommandPermissionsUpdateData(packet));
      })(packet);
    });
  }
}
