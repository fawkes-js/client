import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("MESSAGE_REACTION_ADD", (packet) => {
      void (async (packet) => {
        this.client.emit("messageReactionAdd", "PLACE VARIABLE");
      })(packet);
    });
  }
}
