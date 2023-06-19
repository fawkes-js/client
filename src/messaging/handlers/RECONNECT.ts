import { type Client } from "../../Client";

export class RECONNECT {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("RECONNECT", (packet) => {
      void (async (packet) => {
        this.client.emit("reconnect", "PLACE VARIABLE");
      })(packet);
    });
  }
}
