import { type Client } from "../../Client";

export class GUILD_ROLE_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_ROLE_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildRoleUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
