import { type DiscordAPISticker } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { updateCache } from "../../utils/CacheUpdate";
import { CacheSticker } from "../structures/CacheSticker";

export class GUILD_STICKERS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_STICKERS_UPDATE", (packet) => {
      void (async (packet) => {
        console.log(packet);
        // Update Cache Stickers
        packet.stickers.map(async (sticker: DiscordAPISticker) => {
          await updateCache(this.client, `guild:${<string>packet.guild_id}:sticker:${sticker.id}`, new CacheSticker(sticker));
        });
        this.client.emit("guildStickersUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
