import { type Client } from "../../Client";

export class INVALID_SESSION {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INVALID_SESSION", (packet) => {
      void (async (packet) => {
        // Not in use
        this.client.emit("invalidSession", "Invalid Session");
      })(packet);
    });
  }
}
