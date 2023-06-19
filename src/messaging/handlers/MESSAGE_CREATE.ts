import { type Client } from "../../Client";

export class MESSAGE_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("MESSAGE_CREATE", (packet) => {
      void (async (packet) => {
        this.client.emit("messageCreate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
