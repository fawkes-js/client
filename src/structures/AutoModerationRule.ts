import { type Client } from "../Client";
import { type CacheAutoModerationRule } from "../messaging/structures/CacheAutoModerationRule";

export class AutoModerationRule {
  id: string;
  client: Client;
  constructor(client: Client, rule: CacheAutoModerationRule) {
    Object.defineProperty(this, "client", { value: client });

    this.id = rule.id;
  }
}
