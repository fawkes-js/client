import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_ACTION_EXECUTION", (packet) => {
      void (async (packet) => {
        this.client.emit("autoModerationActionExecution", "PLACE VARIABLE");
      })(packet);
    });
  }
}
