import { type DiscordAPIEmoji } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CacheEmoji } from "../structures/CacheEmoji";

export class GUILD_EMOJIS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_EMOJIS_UPDATE", (packet) => {
      void (async (packet) => {
        packet.emojis.forEach(async (emoji: DiscordAPIEmoji) => {
          await this.client.cache.set(`guild:${<string>packet.guild_id}:emoji:${<string>emoji.id}`, new CacheEmoji(emoji));
        });

        const cacheKeys = await this.client.cache.keys(`guild:${<string>packet.guild_id}:emoji:`);

        if (packet.emojis.length < cacheKeys.length) {
          cacheKeys.forEach(async (key: string) => {
            const emoji = packet.emojis.find((emoji: DiscordAPIEmoji) => emoji.id === key.split(":")[3]);
            if (!emoji) await this.client.cache.del(key);
          });
        }
        this.client.emit("guildEmojisUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
