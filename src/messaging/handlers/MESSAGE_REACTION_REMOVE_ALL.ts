import { type Client } from "../../Client";

export class MESSAGE_REACTION_REMOVE_ALL {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("MESSAGE_REACTION_REMOVE_ALL", (packet) => {
      void (async (packet) => {
        this.client.emit("messageReactionRemoveAll", "PLACE VARIABLE");
      })(packet);
    });
  }
}
