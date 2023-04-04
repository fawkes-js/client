import { type DiscordAPIGuild, type DiscordAPIButtonComponentButtonStyleType, type DiscordAPIEmoji, type DiscordAPIMessageComponentType, Routes, DiscordAPICommandOptionType, type DiscordAPIInteraction } from '@fawkes.js/api-types'
import { type Client } from '../Client'
import { User } from './User'
import { Message } from './Message'
import { APIEmbed, type Embed } from './APIEmbed'
import { BaseInteraction } from './BaseInteraction'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Attachment {}

interface ButtonComponent {
  type: 2
  style: DiscordAPIButtonComponentButtonStyleType
  label?: string
  emoji?: DiscordAPIEmoji
  custom_id?: string
  url?: string
  disabled?: boolean
}

interface StringSelectComponentOption {
  label: string
  value: string
  description?: string
  emoji?: DiscordAPIEmoji
}
interface StringSelectComponent {
  type: DiscordAPIMessageComponentType.StringSelect
  custom_id: string
  options: StringSelectComponentOption[]
}

interface TextInputComponent {
  type: DiscordAPIMessageComponentType.TextInput
}

interface UserSelectComponent {
  type: DiscordAPIMessageComponentType.UserSelect
}

interface RoleSelectComponent {
  type: DiscordAPIMessageComponentType.RoleSelect
}

interface MentionableSelectComponent {
  type: DiscordAPIMessageComponentType.MentionableSelect
}

interface ChannelSelectComponent {
  type: DiscordAPIMessageComponentType.ChannelSelect
}

interface ActionRowComponent {
  type: DiscordAPIMessageComponentType.ActionRow
  components: Array<ButtonComponent | StringSelectComponent | TextInputComponent | UserSelectComponent | RoleSelectComponent | MentionableSelectComponent | ChannelSelectComponent>
}

interface InteractionResponseOptions {
  content?: string
  embeds?: Embed[]
  attachments?: Attachment[]
  fetchReply?: boolean
  components?: ActionRowComponent[]
}

export class ChatInputCommandInteraction extends BaseInteraction {
  command: string
  options: any[]
  constructor (client: Client, interaction: DiscordAPIInteraction,guild:DiscordAPIGuild) {
    super(client, interaction,guild)
    const options: any[] = []

    if ((interaction.data?.options) != null) {
      interaction.data?.options.forEach( async (option) => {
        switch (option.type) {
          case DiscordAPICommandOptionType.SubCommand:
            break
          case DiscordAPICommandOptionType.SubCommandGroup:
            break
          case DiscordAPICommandOptionType.String:
            options.push({ name: option.name, data: option.value, type: option.type })
            break
          case DiscordAPICommandOptionType.Integer:
            break
          case DiscordAPICommandOptionType.Boolean:
            break
          case DiscordAPICommandOptionType.User:
            const member = guild.members.find((m) => m.user?.id === option.value)

            member?.user ? options.push({ name: option.name, data: new User(member.user), type: option.type }) : null
            break
          case DiscordAPICommandOptionType.Channel:
            break
          case DiscordAPICommandOptionType.Role:
            break
          case DiscordAPICommandOptionType.Mentionable:
            break
          case DiscordAPICommandOptionType.Number:
            break
          case DiscordAPICommandOptionType.Attachment:
            break
        }
      })
    }

    this.command = <string>interaction.data?.name

    this.options = ((interaction.data?.options) != null) ? options : []
  }

  async reply (data: InteractionResponseOptions): Promise<any> {
    function APIEmbeds (embeds: Embed[]): APIEmbed[] {
      const APIEmbeds: APIEmbed[] = []
      embeds.map((embed) => APIEmbeds.push(new APIEmbed(embed)))
      return APIEmbeds
    }

    const APIData: any = { ...data }
    APIData.embeds = (data.embeds != null) ? APIEmbeds(data.embeds) : []

    await this.client.rest.request(Routes.createInteractionResponse(this.id, this.token), { type: 4, data: APIData })

    const fetchReply = async (): Promise<Message> => {
      return new Message(this.client, await this.client.rest.request(Routes.getOriginalInteractionResponse(this.client?.application?.id, this.token)))
    }
    if (data.fetchReply === true) return await fetchReply()
    else return null
  }

  getUser (): User[] {
    const users: any[] = []

    this.options.forEach((option): void => {
      if (option.type === DiscordAPICommandOptionType.User) users.push(option.data)
    })
    return users
  }

  getOption (name: string): void { }
}
