import { type DiscordAPIAutoModerationActionExecutionEvent } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { AutoModerationActionExecution } from "../../structures/AutoModerationActionExecution";
import { getAutoModerationRule, getCacheGuild } from "../../utils/CacheUpdate";
import { CacheAutoModerationRule } from "../structures/CacheAutoModerationRule";
import { type CacheGuild } from "../structures/CacheGuild";

export class AUTO_MODERATION_ACTION_EXECUTION {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_ACTION_EXECUTION", (packet: DiscordAPIAutoModerationActionExecutionEvent) => {
      void (async (packet) => {
        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        if (!cacheGuild) return;

        let rule: CacheAutoModerationRule | undefined;

        const cacheRule = cacheGuild.autoModerationRules.find((rule) => rule.id === packet.rule_id);

        if (cacheRule) rule = cacheRule;
        else {
          const cacheRule = await getAutoModerationRule(this.client, packet.guild_id, packet.rule_id);
          if (!cacheRule) {
            console.log("ERROR");
            return;
          }
          rule = new CacheAutoModerationRule(cacheRule);
        }

        this.client.emit("autoModerationActionExecution", new AutoModerationActionExecution(this.client, rule));
      })(packet);
    });
  }
}
