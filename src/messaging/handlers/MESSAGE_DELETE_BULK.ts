import { type Client } from "../../Client";

export class MESSAGE_DELETE_BULK {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("MESSAGE_DELETE_BULK", (packet) => {
      void (async (packet) => {
        this.client.emit("messageDeleteBulk", "PLACE VARIABLE");
      })(packet);
    });
  }
}
