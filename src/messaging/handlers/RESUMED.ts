import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("RESUMED", (packet) => {
      void (async (packet) => {
        this.client.emit("resumed", "PLACE VARIABLE");
      })(packet);
    });
  }
}
