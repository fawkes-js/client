import { type Client } from "../../Client";

export class TYPING_START {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("TYPING_START", (packet) => {
      void (async (packet) => {
        this.client.emit("typingStart", "PLACE VARIABLE");
      })(packet);
    });
  }
}
