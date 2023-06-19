import { type Client } from "../../Client";

export class INTEGRATION_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INTEGRATION_DELETE", (packet) => {
      void (async (packet) => {
        this.client.emit("integrationDelete", "PLACE VARIABLE");
      })(packet);
    });
  }
}
