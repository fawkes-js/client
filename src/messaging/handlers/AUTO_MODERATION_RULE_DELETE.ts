import { type Client } from "../../Client";

export class AUTO_MODERATION_RULE_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_RULE_DELETE", (packet) => {
      void (async (packet) => {
        this.client.emit("autoModerationRuleDelete", "PLACE VARIABLE");
      })(packet);
    });
  }
}
