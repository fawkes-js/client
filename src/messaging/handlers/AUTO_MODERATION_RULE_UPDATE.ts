import { type Client } from "../../Client";

export class AUTO_MODERATION_RULE_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_RULE_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("autoModerationRuleUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
