import { type Client } from "../../Client";

export class GUILD_BAN_REMOVE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_BAN_REMOVE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildBanRemove", "PLACE VARIABLE");
      })(packet);
    });
  }
}
