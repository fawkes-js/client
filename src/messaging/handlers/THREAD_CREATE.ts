import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("THREAD_CREATE", (packet) => {
      void (async (packet) => {
        this.client.emit("threadCreate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
