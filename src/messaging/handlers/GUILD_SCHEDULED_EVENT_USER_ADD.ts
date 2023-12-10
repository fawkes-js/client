import { type Client } from "../../Client";
import { Channel } from "../../structures/Channel";
import { Guild } from "../../structures/Guild";
import { GuildMember } from "../../structures/GuildMember";
import { GuildScheduledEvent } from "../../structures/GuildScheduledEvent";
import { getCacheChannel, getCacheGuild, getCacheGuildMember, getCacheGuildScheduledEvent } from "../../utils/CacheUpdate";
import { type CacheChannel } from "../structures/CacheChannel";
import { type CacheGuild, CacheGuildScheduledEvent } from "../structures/CacheGuild";
import { type CacheGuildMember } from "../structures/CacheGuildMember";

export class GUILD_SCHEDULED_EVENT_USER_ADD {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_SCHEDULED_EVENT_USER_ADD", (packet) => {
      void (async (packet) => {
        console.log(packet);
        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, packet.guild_id);
        const cacheGuildMember: CacheGuildMember | null = await getCacheGuildMember(this.client, packet.guild_id, packet.user_id);
        const cacheEvent: CacheGuildScheduledEvent | null = await getCacheGuildScheduledEvent(
          this.client,
          packet.guild_id,
          packet.guild_scheduled_event_id
        );

        if (!cacheEvent || !cacheGuild || !cacheGuildMember) {
          console.log("THROW AN ERROR");
          return;
        }
        const cacheChannel: CacheChannel | null = await getCacheChannel(this.client, packet.guild_id, cacheEvent.channelId);

        if (cacheGuild) {
          cacheGuild.guildScheduledEvents.push(cacheEvent);
          await this.client.cache.set(`guild:${<string>packet.guild_id}`, cacheGuild);
        }
        this.client.emit(
          "guildScheduledEventUserAdd",
          new GuildScheduledEvent(
            this.client,
            new CacheGuildScheduledEvent(packet),
            cacheGuild ? new Guild(this.client, cacheGuild) : null,
            cacheChannel ? new Channel(this.client, cacheChannel) : null,
            cacheGuildMember && cacheGuild ? new GuildMember(this.client, cacheGuild, cacheGuildMember) : null
          ),
          new GuildMember(this.client, cacheGuild, cacheGuildMember)
        );
      })(packet);
    });
  }
}
