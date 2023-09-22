import { type Client } from "../Client";
import { AutoModerationRule } from "./AutoModerationRule";
import { type CacheAutoModerationRule } from "../messaging/structures/CacheAutoModerationRule";

export class AutoModerationActionExecution {
  rule: AutoModerationRule;
  constructor(client: Client, rule: CacheAutoModerationRule) {
    this.rule = new AutoModerationRule(client, rule);
  }
}
