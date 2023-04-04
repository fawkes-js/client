import { type DiscordAPIGuild, type DiscordAPIGuildMember, type Snowflake } from '@fawkes.js/api-types'
import { type Client } from '../Client'
import { GuildMember } from '../structures/GuildMember'

export class GuildMembersHub {
  client!: Client
  guild: DiscordAPIGuild
  constructor (client: Client, guild: DiscordAPIGuild) {
    Object.defineProperty(this, 'client', { value: client })

    this.guild = guild
  }

  async fetch (id: Snowflake): Promise<GuildMember | null> {
    const cachedGuild = await this.client.cache.get('guild:' + this.guild.id)
    const member = cachedGuild.members.find((member: DiscordAPIGuildMember) => member.user?.id === id)
    if (member !== null) return new GuildMember(this.client, this.guild, member)
    else return null
  }

  async me (): Promise<GuildMember | null> {
    return await this.fetch(<string> this.client.application?.client.id)
  }
}
