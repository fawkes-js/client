import { type DiscordAPIAutoModerationRule, type FawkesAutoModerationRule, type FawkesGuild } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { AutoModerationRule } from "../../structures/AutoModerationRule";
import { CacheAutoModerationRule } from "../structures/CacheAutoModerationRule";

export class AUTO_MODERATION_RULE_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_RULE_DELETE", (packet: DiscordAPIAutoModerationRule) => {
      void (async (packet: DiscordAPIAutoModerationRule) => {
        const cacheGuild: FawkesGuild = await this.client.cache.get("guild:" + packet.guild_id);
        cacheGuild.autoModerationRules.splice(
          cacheGuild.autoModerationRules.findIndex((rule: FawkesAutoModerationRule) => rule.id === packet.id),
          1
        );
        await this.client.cache.set("guild:" + packet.guild_id, cacheGuild);

        this.client.emit("autoModerationRuleDelete", new AutoModerationRule(this.client, new CacheAutoModerationRule(packet)));
      })(packet);
    });
  }
}
