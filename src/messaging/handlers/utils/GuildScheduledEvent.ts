import { type Client } from "../../../Client";
import { Channel } from "../../../structures/Channel";
import { Guild } from "../../../structures/Guild";
import { GuildMember } from "../../../structures/GuildMember";
import { GuildScheduledEvent } from "../../../structures/GuildScheduledEvent";
import { getCacheChannel, getCacheGuild, getCacheGuildMember, getCacheGuildScheduledEvent } from "../../../utils/CacheUpdate";
import { type CacheChannel } from "../../structures/CacheChannel";
import { type CacheGuild, type CacheGuildScheduledEvent } from "../../structures/CacheGuild";
import { type CacheGuildMember } from "../../structures/CacheGuildMember";

export const guildScheduledEventUserAddRemove = async function (client: Client, packet: any): Promise<void> {
  const cacheGuild: CacheGuild | null = await getCacheGuild(client, packet.guild_id);
  const cacheGuildMember: CacheGuildMember | null = await getCacheGuildMember(client, packet.guild_id, packet.user_id);
  const cacheEvent: CacheGuildScheduledEvent | null = await getCacheGuildScheduledEvent(
    client,
    packet.guild_id,
    packet.guild_scheduled_event_id
  );

  if (!cacheGuild || !cacheGuildMember || !cacheEvent) return;

  // Need to update the userCount stored in the event in the cache.

  const cacheChannel: CacheChannel | null = await getCacheChannel(client, packet.guild_id, cacheEvent.channelId);

  if (!cacheChannel) return;

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
