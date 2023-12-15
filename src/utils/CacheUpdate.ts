import {
  Routes,
  type DiscordAPIGuild,
  type DiscordAPIUser,
  type DiscordAPIChannel,
  type DiscordAPIGuildMember,
  type DiscordAPIAutoModerationRule,
  type Snowflake,
  type DiscordAPIGuildScheduledEvent,
} from "@fawkes.js/typings";
import { type Client } from "../Client";
import { CacheGuild, CacheGuildScheduledEvent } from "../messaging/structures/CacheGuild";
import { CacheChannel } from "../messaging/structures/CacheChannel";
import { CacheGuildMember } from "../messaging/structures/CacheGuildMember";
import { CacheUser } from "../messaging/structures/CacheUser";

export const getGuild = async function (client: Client, guildId: string): Promise<DiscordAPIGuild> {
  const guild = await client.rest.request(Routes.getGuild(guildId));
  await client.cache.set(`guild:${guildId}`, new CacheGuild(guild));
  return guild;
};

export const getUser = async function (client: Client, userId: string): Promise<DiscordAPIUser> {
  const user = await client.rest.request(Routes.getUser(userId));
  await client.cache.set(`user:${userId}`, new CacheUser(user));
  return user;
};

export const getChannel = async function (client: Client, channelId: string): Promise<DiscordAPIChannel> {
  const channel = await client.rest.request(Routes.getChannel(channelId));
  await client.cache.set(`channels:${channelId}`, new CacheChannel(channel));
  return channel;
};

export const getGuildMember = async function (client: Client, guildId: string, userId: string): Promise<DiscordAPIGuildMember> {
  const member = await client.rest.request(Routes.getGuildMember(guildId, userId));
  await client.cache.set(`guild:${guildId}:members:${userId}`, new CacheGuildMember(member));
  return member;
};

export const getAutoModerationRule = async function (
  client: Client,
  guildId: string,
  ruleId: string
): Promise<DiscordAPIAutoModerationRule | null> {
  const fetchedRule = await this.client.rest.request(Routes.getAutoModerationRule(guildId, ruleId));
  if (!fetchedRule) {
    console.log("THROW AN ERROR");
    return null;
  }
  const cacheGuild: CacheGuild | null = await getCacheGuild(client, guildId);
  if (!cacheGuild) {
    console.log("THROW AN ERROR");
    return null;
  }

  cacheGuild.autoModerationRules.push(fetchedRule);
  await client.cache.set(`guild:${guildId}`, cacheGuild);
  return fetchedRule;
};

export const getGuildScheduledEvent = async function (
  client: Client,
  guildId: Snowflake,
  eventId: Snowflake
): Promise<DiscordAPIGuildScheduledEvent | null> {
  const fetchedGuildScheduledEvent = await this.client.rest.request(Routes.getGuildScheduledEvent(guildId, eventId));
  if (!fetchedGuildScheduledEvent) {
    console.log("THROW AN ERROR!");
    return null;
  }

  const cacheGuild: CacheGuild | null = await getCacheGuild(client, guildId);
  if (!cacheGuild) {
    console.log("THROW AN ERROR");
    return null;
  }

  cacheGuild.guildScheduledEvents.push(new CacheGuildScheduledEvent(fetchedGuildScheduledEvent));
  await client.cache.set(`guild:${guildId}`, cacheGuild);
  return fetchedGuildScheduledEvent;
};

export const updateCache = async (client: Client, key, newValue): Promise<void> => {
  const cacheData: any = await client.cache.get(key);
  const newData = cacheData ? Object.assign(cacheData, newValue) : newValue;

  await client.cache.set(key, newData);
};

export const getCacheGuild = async (client: Client, guildId: Snowflake): Promise<CacheGuild | null> => {
  let cacheGuild: CacheGuild = await client.cache.get(`guild:${guildId}`);

  if (!cacheGuild) {
    await getGuild(client, guildId);
    cacheGuild = await client.cache.get(`guild:${guildId}`);
  }

  return cacheGuild;
};

export const getCacheChannel = async (client: Client, guildId: Snowflake, channelId: Snowflake): Promise<CacheChannel | null> => {
  let cacheChannel: CacheChannel = await client.cache.get(`guild:${guildId}:channel:${channelId}`);

  if (!cacheChannel) {
    await getChannel(client, channelId);
    cacheChannel = await client.cache.get(`guild:${guildId}:channel:${channelId}`);
  }

  return cacheChannel;
};

export const getCacheGuildMember = async (client: Client, guildId: Snowflake, userId: Snowflake): Promise<CacheGuildMember | null> => {
  let cacheGuildMember: CacheGuildMember = await client.cache.get(`guild:${guildId}:member:${userId}`);

  if (!cacheGuildMember) {
    await getGuildMember(client, guildId, userId);
    cacheGuildMember = await client.cache.get(`guild:${guildId}:member:${userId}`);
  }

  return cacheGuildMember;
};

export const getCacheGuildScheduledEvent = async (
  client: Client,
  guildId: Snowflake,
  eventId: Snowflake
): Promise<CacheGuildScheduledEvent | null> => {
  const cacheGuild: CacheGuild | null = await getCacheGuild(client, guildId);
  if (!cacheGuild) return null;

  let cacheGuildScheduledEvent: CacheGuildScheduledEvent | undefined | null = cacheGuild.guildScheduledEvents.find(
    (event) => event.id === eventId
  );

  if (!cacheGuildScheduledEvent) {
    const guildScheduledEvent: DiscordAPIGuildScheduledEvent | null = await getGuildScheduledEvent(client, guildId, eventId);

    if (!guildScheduledEvent) {
      console.log("THROW AN ERROR");
      return null;
    }

    cacheGuildScheduledEvent = new CacheGuildScheduledEvent(guildScheduledEvent);
  }

  return cacheGuildScheduledEvent;
};
