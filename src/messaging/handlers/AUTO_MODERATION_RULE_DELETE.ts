import { type DiscordAPIAutoModerationRule, type FawkesAutoModerationRule } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { AutoModerationRule } from "../../structures/AutoModerationRule";
import { CacheAutoModerationRule } from "../structures/CacheAutoModerationRule";
import { getCacheGuild } from "../../utils/CacheUpdate";
import { type CacheGuild } from "../structures/CacheGuild";

export class AUTO_MODERATION_RULE_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_RULE_DELETE", (packet: DiscordAPIAutoModerationRule) => {
      void (async (packet: DiscordAPIAutoModerationRule) => {
        const cacheGuild: CacheGuild = await getCacheGuild(this.client, packet.guild_id);

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
