import { type Client } from "../../Client";

export class THREAD_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("THREAD_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("threadUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
