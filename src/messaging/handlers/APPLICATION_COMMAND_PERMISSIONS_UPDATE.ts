import { type DiscordAPIGuild } from "@fawkes.js/typings";
import { type Client } from "../../Client";

export class APPLICATION_COMMAND_PERMISSIONS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("APPLICATION_COMMAND_PERMISSIONS_UPDATE", (packet) => {
      void (async (packet: DiscordAPIGuild) => {
        this.client.emit("applicationCommandPermissionsUpdate", packet);
      })(packet);
    });
  }
}
