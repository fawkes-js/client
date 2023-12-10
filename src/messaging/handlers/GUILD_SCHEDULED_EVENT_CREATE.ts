import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { Guild } from "../../structures/Guild";
import { GuildMember } from "../../structures/GuildMember";
import { GuildScheduledEvent } from "../../structures/GuildScheduledEvent";
import { getCacheChannel, getCacheGuild, getCacheGuildMember } from "../../utils/CacheUpdate";
import { type CacheChannel } from "../structures/CacheChannel";
import { CacheGuildScheduledEvent, type CacheGuild } from "../structures/CacheGuild";
import { type CacheGuildMember } from "../structures/CacheGuildMember";

export class GUILD_SCHEDULED_EVENT_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_SCHEDULED_EVENT_CREATE", (packet) => {
      void (async (packet) => {
        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        const cacheChannel: CacheChannel | null = await getCacheChannel(this.client, packet.guild_id, packet.channel_id);
        const cacheGuildMember: CacheGuildMember | null = await getCacheGuildMember(this.client, packet.guild_id, packet.creator_id);
        const cacheEvent = new CacheGuildScheduledEvent(packet);
        if (cacheGuild) {
          cacheGuild.guildScheduledEvents.push(cacheEvent);
          await this.client.cache.set(`guild:${<string>packet.guild_id}`, cacheGuild);
        }

        this.client.emit(
          "guildScheduledEventCreate",
          new GuildScheduledEvent(
            this.client,
            cacheEvent,
            cacheGuild ? new Guild(this.client, cacheGuild) : null,
            cacheChannel ? new Channel(this.client, cacheChannel) : null,
            cacheGuildMember && cacheGuild ? new GuildMember(this.client, cacheGuild, cacheGuildMember) : null
          )
        );
      })(packet);
    });
  }
}
