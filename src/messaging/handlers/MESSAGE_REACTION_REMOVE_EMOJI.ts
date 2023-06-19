import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("MESSAGE_REACTION_REMOVE_EMOJI", (packet) => {
      void (async (packet) => {
        this.client.emit("messageReactionRemoveEmoji", "PLACE VARIABLE");
      })(packet);
    });
  }
}
