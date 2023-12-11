import { type Client } from "../../../Client";
import { Channel } from "../../../structures/Channel";
import { Guild } from "../../../structures/Guild";
import { GuildMember } from "../../../structures/GuildMember";
import { GuildScheduledEvent } from "../../../structures/GuildScheduledEvent";
import { getCacheChannel, getCacheGuild, getCacheGuildMember, getCacheGuildScheduledEvent } from "../../../utils/CacheUpdate";
import { type CacheGuildScheduledEvent } from "../../structures/CacheGuild";

export const guildScheduledEventUserAddRemove = async function (client: Client, packet: any): Promise<void> {
  const cacheEvent: CacheGuildScheduledEvent | null = await getCacheGuildScheduledEvent(
    client,
    packet.guild_id,
    packet.guild_scheduled_event_id
  );
  if (!cacheEvent) return;
  const [cacheGuild, cacheChannel, cacheGuildMember] = await Promise.all([
    await getCacheGuild(this.client, packet.guild_id),
    await getCacheChannel(this.client, packet.guild_id, packet.channel_id),
    await getCacheGuildMember(this.client, packet.guild_id, packet.creator_id),
  ]);

  if (!cacheGuild || !cacheGuildMember || !cacheChannel) return;

  // Need to update the userCount stored in the event in the cache.

  // if (cacheGuild) {
  //   cacheGuild.guildScheduledEvents.push(cacheEvent);
  //   await client.cache.set(`guild:${<string>packet.guild_id}`, cacheGuild);
  // }

  client.emit(
    "guildScheduledEventUserAdd",
    new GuildScheduledEvent(
      client,
      cacheEvent,
      new Guild(client, cacheGuild),
      new Channel(client, cacheChannel),
      new GuildMember(client, cacheGuild, cacheGuildMember)
    ),
    new GuildMember(client, cacheGuild, cacheGuildMember)
  );
};
