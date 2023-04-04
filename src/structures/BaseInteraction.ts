import { type DiscordAPIInteractionType, type DiscordAPIUser, type DiscordAPILocale, type DiscordAPIInteraction, DiscordAPIGuild, DiscordAPIGuildMember } from '@fawkes.js/api-types'
import { type Client } from '../Client'
import { Guild } from './Guild'
import { GuildMember } from './GuildMember'
import { User } from './User'


export class BaseInteraction {
  guild: Guild
  member: GuildMember | null
  user: User | null
  client!: Client
  id: string
  token!: string
  locale?: DiscordAPILocale | undefined
  type: DiscordAPIInteractionType
  constructor (client: Client, interaction: DiscordAPIInteraction,guild:DiscordAPIGuild) {
    Object.defineProperty(this, 'client', { value: client })

    Object.defineProperty(this, 'token', { value: interaction.token })

    this.id = interaction.id

    this.guild = new Guild(client, guild)

    this.member = interaction.member !== null ? new GuildMember(client, guild, <DiscordAPIGuildMember>interaction.member) : null

    this.user = (interaction.user !== undefined) ? new User(<DiscordAPIUser>interaction.user) : null

    this.locale = interaction.locale

    this.type = interaction.type

  }
}
