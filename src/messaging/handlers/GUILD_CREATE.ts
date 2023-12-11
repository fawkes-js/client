import {
  type DiscordAPIChannel,
  type DiscordAPIRole,
  type DiscordAPIGuild,
  type DiscordAPIEmoji,
  type DiscordAPIGuildMember,
  type DiscordAPISticker,
} from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CacheGuild } from "../structures/CacheGuild";
import { CacheChannel } from "../structures/CacheChannel";
import { CacheEmoji } from "../structures/CacheEmoji";
import { CacheRole } from "../structures/CacheRole";
import { updateCache } from "../../utils/CacheUpdate";
import { CacheGuildMember } from "../structures/CacheGuildMember";
import { CacheSticker } from "../structures/CacheSticker";

export class GUILD_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_CREATE", (packet) => {
      void (async (packet: DiscordAPIGuild) => {
        // Check if DB is enabled, and if enabled invoke updateGuild() to check if the guild exists in the dB.
        if (this.client.db) this.client.db.updateGuild(packet.id);

        // Update Cache Guild:
        await updateCache(this.client, `guild:${packet.id}`, new CacheGuild(packet));

        // if (!cacheGuild) this.client.emit("guildCreate", new Guild(this.client, packet));

        // Update Cache Channels:
        packet.channels.map(async (channel: DiscordAPIChannel) => {
          await updateCache(this.client, `guild:${packet.id}:channel:${channel.id}`, new CacheChannel(channel));
        });

        // Update Cache Roles:
        packet.roles.map(async (role: DiscordAPIRole) => {
          await updateCache(this.client, `guild:${packet.id}:role:${role.id}`, new CacheRole(role));
        });

        // Update Cache Emojis
        packet.emojis.map(async (emoji: DiscordAPIEmoji) => {
          await updateCache(this.client, `guild:${packet.id}:emoji:${<string>emoji.id}`, new CacheEmoji(emoji));
        });

        // Update Cache Stickers
        if (packet.stickers)
          packet.stickers.map(async (sticker: DiscordAPISticker) => {
            await updateCache(this.client, `guild:${packet.id}:sticker:${sticker.id}`, new CacheSticker(sticker));
          });

        // Update Cache Members

        packet.members.map(async (member: DiscordAPIGuildMember) => {
          if (!member.user) {
            console.log("ERROR");
            return;
          }
          await updateCache(this.client, `guild:${packet.id}:member:${member.user.id}`, new CacheGuildMember(member));
        });
      })(packet);
    });
  }
}
