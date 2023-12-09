import { type DiscordAPIAutoModerationRule, type FawkesAutoModerationRule } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { AutoModerationRule } from "../../structures/AutoModerationRule";
import { CacheAutoModerationRule } from "../structures/CacheAutoModerationRule";
import { type CacheGuild } from "../structures/CacheGuild";
import { getCacheGuild } from "../../utils/CacheUpdate";

export class AUTO_MODERATION_RULE_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_RULE_UPDATE", (packet: DiscordAPIAutoModerationRule) => {
      void (async (packet: DiscordAPIAutoModerationRule) => {
        const cacheGuild: CacheGuild = await getCacheGuild(this.client, packet.guild_id);

        cacheGuild.autoModerationRules.splice(
          cacheGuild.autoModerationRules.findIndex((rule: FawkesAutoModerationRule) => rule.id === packet.id),
          1,
          new CacheAutoModerationRule(packet)
        );

        await this.client.cache.set("guild:" + packet.guild_id, cacheGuild);

        this.client.emit("autoModerationRuleUpdate", new AutoModerationRule(this.client, new CacheAutoModerationRule(packet)));
      })(packet);
    });
  }
}
