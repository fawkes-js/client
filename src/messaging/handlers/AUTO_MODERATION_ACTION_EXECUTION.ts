import { type DiscordAPIAutoModerationActionExecutionEvent } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { type CacheGuild } from "../structures/CacheGuild";
import { AutoModerationActionExecution } from "../../structures/AutoModerationActionExecution";
import { getAutoModerationRule, getGuild } from "../../utils/CacheUpdate";
import { CacheAutoModerationRule } from "../structures/CacheAutoModerationRule";

export class AUTO_MODERATION_ACTION_EXECUTION {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_ACTION_EXECUTION", (packet: DiscordAPIAutoModerationActionExecutionEvent) => {
      void (async (packet) => {
        const guild: CacheGuild =
          (await this.client.cache.get(`guild:${packet.guild_id}`)) ?? (await getGuild(this.client, packet.guild_id));
        if (!guild) console.log("THROW AN ERROR");

        let rule: CacheAutoModerationRule | undefined;

        const cacheRule = guild.autoModerationRules.find((rule) => rule.id === packet.rule_id);

        if (cacheRule) rule = cacheRule;
        else {
          const cacheRule = await getAutoModerationRule(this.client, packet.guild_id, packet.rule_id);
          if (!cacheRule) return; // THROW AN ERROR
          rule = new CacheAutoModerationRule(cacheRule);
        }

        this.client.emit("autoModerationActionExecution", new AutoModerationActionExecution(this.client, rule));
      })(packet);
    });
  }
}
