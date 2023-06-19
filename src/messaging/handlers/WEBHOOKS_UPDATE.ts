import { type Client } from "../../Client";

export class WEBHOOKS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("WEBHOOKS_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("webhooksUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
