import { DiscordAPIGuild } from "@fawkes.js/api-types";
import { Client } from "../../Client";

export class GUILD_CREATE {
    client: Client;
    constructor(client: Client) {
        this.client = client;
    }
    initialize() {
        this.client.on("APPLICATION_COMMAND_PERMISSIONS_UPDATE", async (packet: DiscordAPIGuild) => {
            this.client.emit("applicationCommandPermissionsUpdate", packet);
        });
    }
}
