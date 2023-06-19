import { type Client } from "../../Client";

export class MESSAGE_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("MESSAGE_DELETE", (packet) => {
      void (async (packet) => {
        this.client.emit("messageDelete", "PLACE VARIABLE");
      })(packet);
    });
  }
}
