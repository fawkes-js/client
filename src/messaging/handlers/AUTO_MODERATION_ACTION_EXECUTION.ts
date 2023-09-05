import { Routes, type DiscordAPIAutoModerationActionExecutionEvent } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { type CacheGuild } from "../structures/CacheGuild";
import { AutoModerationActionExecution } from "../../structures/AutoModerationActionExecution";

export class AUTO_MODERATION_ACTION_EXECUTION {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_ACTION_EXECUTION", (packet: DiscordAPIAutoModerationActionExecutionEvent) => {
      void (async (packet) => {
        console.log(packet);
        let rule;
        const guild: CacheGuild = await this.client.cache.get(`guild:${<string>packet.guild_id}`);

        const cacheRule = guild.autoModerationRules.find((rule) => rule.id === packet.rule_id);
        if (!cacheRule) {
          const fetchedRule = await this.client.rest.request(Routes.getAutoModerationRule(packet.guild_id, packet.rule_id));
          if (!fetchedRule) {
            console.log("NEED TO THROW AN ERROR");
            return;
          }
          guild.autoModerationRules.push(fetchedRule);
          rule = fetchedRule;
        } else rule = cacheRule;
        this.client.emit("autoModerationActionExecution", new AutoModerationActionExecution(this.client, rule));
      })(packet);
    });
  }
}
