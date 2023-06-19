import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INTEGRATION_CREATE", (packet) => {
      void (async (packet) => {
        this.client.emit("integrationCreate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
