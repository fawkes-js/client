import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("THREAD_DELETE", (packet) => {
      void (async (packet) => {
        this.client.emit("threadDelete", "PLACE VARIABLE");
      })(packet);
    });
  }
}
