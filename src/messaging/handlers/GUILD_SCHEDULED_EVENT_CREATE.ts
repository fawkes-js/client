import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { Guild } from "../../structures/Guild";
import { GuildMember } from "../../structures/GuildMember";
import { GuildScheduledEvent } from "../../structures/GuildScheduledEvent";
import { getCacheChannel, getCacheGuild, getCacheGuildMember } from "../../utils/CacheUpdate";
import { CacheGuildScheduledEvent } from "../structures/CacheGuild";

export class GUILD_SCHEDULED_EVENT_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_SCHEDULED_EVENT_CREATE", (packet) => {
      void (async (packet) => {
        const [cacheGuild, cacheChannel, cacheGuildMember] = await Promise.all([
          await getCacheGuild(this.client, packet.guild_id),
          await getCacheChannel(this.client, packet.guild_id, packet.channel_id),
          await getCacheGuildMember(this.client, packet.guild_id, packet.creator_id),
        ]);
        const cacheEvent = new CacheGuildScheduledEvent(packet);

        if (cacheGuild) {
          cacheGuild.guildScheduledEvents.push(cacheEvent);
          await this.client.cache.set(`guild:${<string>packet.guild_id}`, cacheGuild);
        }

        if (!cacheGuild || !cacheChannel || !cacheGuildMember || !cacheEvent) return;

        this.client.emit(
          "guildScheduledEventCreate",
          new GuildScheduledEvent(
            this.client,
            cacheEvent,
            new Guild(this.client, cacheGuild),
            new Channel(this.client, cacheChannel),
            new GuildMember(this.client, cacheGuild, cacheGuildMember)
          )
        );
      })(packet);
    });
  }
}
