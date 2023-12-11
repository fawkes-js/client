import { type Client } from "../../Client";

export class INTEGRATION_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INTEGRATION_UPDATE", (packet) => {
      void (async (packet) => {
        // Need to do

        this.client.emit("integrationUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
