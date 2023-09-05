import { type DiscordAPIAutoModerationRule, type FawkesGuild } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CacheAutoModerationRule } from "../structures/CacheAutoModerationRule";
import { AutoModerationRule } from "../../structures/AutoModerationRule";

export class AUTO_MODERATION_RULE_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_RULE_CREATE", (packet: DiscordAPIAutoModerationRule) => {
      void (async (packet: DiscordAPIAutoModerationRule) => {
        const cacheGuild: FawkesGuild = await this.client.cache.get("guild:" + packet.guild_id);
        cacheGuild.autoModerationRules.push(new CacheAutoModerationRule(packet));
        await this.client.cache.set("guild:" + packet.guild_id, cacheGuild);

        console.log(packet);
        this.client.emit("autoModerationRuleCreate", new AutoModerationRule(this.client, packet));
      })(packet);
    });
  }
}
