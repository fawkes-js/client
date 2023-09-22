import {
  Routes,
  type DiscordAPIGuild,
  type DiscordAPIUser,
  type DiscordAPIChannel,
  type DiscordAPIGuildMember,
  type DiscordAPIAutoModerationRule,
} from "@fawkes.js/typings";
import { type Client } from "../Client";
import { CacheGuild } from "../messaging/structures/CacheGuild";
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
): Promise<DiscordAPIAutoModerationRule | undefined> {
  const fetchedRule = await this.client.rest.request(Routes.getAutoModerationRule(guildId, ruleId));
  if (!fetchedRule) return; // THROW AN ERROR
  const guild: CacheGuild = await client.cache.get(`guild:${guildId}`);
  guild.autoModerationRules.push(fetchedRule);
  await client.cache.set(`guild:${guildId}`, guild);
  return fetchedRule;
};
