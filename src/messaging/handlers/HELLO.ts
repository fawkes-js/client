import { type Client } from "../../Client";

export class HELLO {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("HELLO", (packet) => {
      void (async (packet) => {
        this.client.emit("hello", "PLACE VARIABLE");
      })(packet);
    });
  }
}
