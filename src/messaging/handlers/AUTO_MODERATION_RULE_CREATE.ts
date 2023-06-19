import { type Client } from "../../Client";

export class AUTO_MODERATION_RULE_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("AUTO_MODERATION_RULE_CREATE", (packet) => {
      void (async (packet) => {
        console.log(packet);

        const cacheGuild = await this.client.cache.get("guild:" + <string>packet.guild_id);
        cacheGuild.autoModerationRules.push(packet);

        await this.client.cache.set("guild:" + <string>packet.guild_id, cacheGuild);
        this.client.emit("autoModerationRuleCreate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
