import { type Client } from "../../Client";

export class GUILD_ROLE_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_ROLE_DELETE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildRoleDelete", "PLACE VARIABLE");
      })(packet);
    });
  }
}
