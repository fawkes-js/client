import { type Client } from "../../Client";

export class INVALID_SESSION {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INVALID_SESSION", (packet) => {
      void (async (packet) => {
        this.client.emit("invalidSession", "PLACE VARIABLE");
      })(packet);
    });
  }
}
