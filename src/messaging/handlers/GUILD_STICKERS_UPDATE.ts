import { type Client } from "../../Client";

export class GUILD_STICKERS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_STICKERS_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildStickersUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
