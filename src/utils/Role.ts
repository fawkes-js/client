import { type DiscordAPIGuild, type DiscordAPIGuildMember, type DiscordAPIRole, type Snowflake } from '@fawkes.js/api-types'
import { type Client } from '../Client'

async function getMember (client: Client, guildId: Snowflake, userId: Snowflake): Promise<any> {
  const guild: DiscordAPIGuild = await client.cache.get(guildId)

  const member = guild.members.find((member: DiscordAPIGuildMember) => member.user?.id === userId)

  return { guild, member }
}
export async function addRole (client: Client, guildId: Snowflake, userId: Snowflake, role: DiscordAPIRole): Promise<void> {
  const { guild, member } = await getMember(client, guildId, userId)

  if (member !== null) member.roles.push(role.id)

  await client.cache.set('guild:' + guildId, guild)
}

export async function removeRole (client: Client, guildId: Snowflake, userId: Snowflake, role: DiscordAPIRole): Promise<void> {
  const { guild, member } = await getMember(client, guildId, userId)

  member.roles = (member != null)
    ? member.roles.filter((r: string) => {
      return r !== role.id
    })
    : []

  await client.cache.set('guild:' + guildId, guild)
}

export function updateRole (): void { }
