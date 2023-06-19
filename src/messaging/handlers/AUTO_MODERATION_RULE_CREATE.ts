import { type Client } from "../../Client";

export class AUTO_MODERATION_RULE_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_RULE_CREATE", (packet) => {
      void (async (packet) => {
        this.client.emit("autoModerationRuleCreate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
