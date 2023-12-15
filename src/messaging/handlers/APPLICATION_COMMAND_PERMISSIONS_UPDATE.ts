import { type DiscordAPIApplicationCommandPermissionsStructure } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { ApplicationCommandPermissionsUpdateData } from "../../structures/ApplicationCommandPermissionsUpdateData";
import { getCacheGuild } from "../../utils/CacheUpdate";
import { type CacheGuild } from "../structures/CacheGuild";

export class APPLICATION_COMMAND_PERMISSIONS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("APPLICATION_COMMAND_PERMISSIONS_UPDATE", (packet) => {
      void (async (packet: DiscordAPIApplicationCommandPermissionsStructure) => {
        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        if (!cacheGuild) return;

        let app = cacheGuild.applicationCommandPermissions.find((app) => app.id === packet.application_id);

        if (!app) {
          cacheGuild.applicationCommandPermissions.push({ id: packet.application_id, permissions: [] });
          app = cacheGuild.applicationCommandPermissions.find((app) => app.id === packet.application_id);
          if (!app) {
            console.log("error!");
            return;
          }
        }

        app.permissions = packet.permissions;

        await this.client.cache.set(`guild:${packet.guild_id}`, cacheGuild);

        this.client.emit("applicationCommandPermissionsUpdate", new ApplicationCommandPermissionsUpdateData(packet));
      })(packet);
    });
  }
}
