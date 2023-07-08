import { type DiscordAPIAutoModerationRule } from "@fawkes.js/typings";
import { type Client } from "../Client";

export class AutoModerationRule {
  id: string;
  client: Client;
  constructor(client: Client, rule: DiscordAPIAutoModerationRule) {
    this.client = client;

    this.id = rule.id;
  }
}
