import { type DiscordAPIAutoModerationRule } from "@fawkes.js/typings";
import { type Client } from "../Client";
import { AutoModerationRule } from "./AutoModerationRule";

export class AutoModerationActionExecution {
  rule: AutoModerationRule;
  constructor(client: Client, rule: DiscordAPIAutoModerationRule) {
    this.rule = new AutoModerationRule(client, rule);
  }
}
