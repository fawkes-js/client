import { type Client } from "../../Client";

export class GUILD_INTEGRATIONS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_INTEGRATIONS_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildIntegrationsUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
