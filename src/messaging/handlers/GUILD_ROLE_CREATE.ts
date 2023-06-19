import { type Client } from "../../Client";

export class GUILD_ROLE_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_ROLE_CREATE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildRoleCreate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
