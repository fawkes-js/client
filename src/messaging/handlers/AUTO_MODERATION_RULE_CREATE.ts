import { type DiscordAPIAutoModerationRule } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CacheAutoModerationRule } from "../structures/CacheAutoModerationRule";
import { AutoModerationRule } from "../../structures/AutoModerationRule";
import { type CacheGuild } from "../structures/CacheGuild";
import { getCacheGuild } from "../../utils/CacheUpdate";

export class AUTO_MODERATION_RULE_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_RULE_CREATE", (packet: DiscordAPIAutoModerationRule) => {
      void (async (packet: DiscordAPIAutoModerationRule) => {
        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        if (!cacheGuild) return;

        cacheGuild.autoModerationRules.push(new CacheAutoModerationRule(packet));
        await this.client.cache.set("guild:" + packet.guild_id, cacheGuild);

        this.client.emit("autoModerationRuleCreate", new AutoModerationRule(this.client, new CacheAutoModerationRule(packet)));
      })(packet);
    });
  }
}
