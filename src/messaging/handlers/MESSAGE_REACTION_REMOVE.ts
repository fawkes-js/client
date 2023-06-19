import { type Client } from "../../Client";

export class MESSAGE_REACTION_REMOVE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("MESSAGE_REACTION_REMOVE", (packet) => {
      void (async (packet) => {
        this.client.emit("messageReactionRemove", "PLACE VARIABLE");
      })(packet);
    });
  }
}
