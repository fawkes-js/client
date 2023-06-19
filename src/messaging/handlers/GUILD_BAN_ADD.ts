import { type Client } from "../../Client";

export class GUILD_BAN_ADD {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_BAN_ADD", (packet) => {
      void (async (packet) => {
        this.client.emit("guildBanAdd", "PLACE VARIABLE");
      })(packet);
    });
  }
}
