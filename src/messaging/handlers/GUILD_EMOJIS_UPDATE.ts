import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_EMOJIS_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildEmojisUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
