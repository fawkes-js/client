// import { type DiscordAPIButtonComponentButtonStyleType, type DiscordAPIEmoji, type DiscordAPIGuild, type DiscordAPIGuildMember, type DiscordAPIInteraction, type DiscordAPIMessageComponentType, type DiscordAPIUser, Routes, DiscordAPILocale} from '@fawkes.js/api-types'
// import { type Client } from '../Client'
// import { type Embed } from './APIEmbed'
import { BaseInteraction } from "./BaseInteraction";

// interface InteractionData {
//   interaction: DiscordAPIInteraction
//   guild: DiscordAPIGuild
//   member: DiscordAPIGuildMember | null
//   user: DiscordAPIUser | null
// }

// interface Attachment {}

// interface ButtonComponent {
//   type: 2
//   style: DiscordAPIButtonComponentButtonStyleType
//   label?: string
//   emoji?: DiscordAPIEmoji
//   custom_id?: string
//   url?: string
//   disabled?: boolean
// }

// interface StringSelectComponentOption {
//   label: string
//   value: string
//   description?: string
//   emoji?: DiscordAPIEmoji
// }
// interface StringSelectComponent {
//   type: DiscordAPIMessageComponentType.StringSelect
//   custom_id: string
//   options: StringSelectComponentOption[]
// }

// interface TextInputComponent {
//   type: DiscordAPIMessageComponentType.TextInput
// }

// interface UserSelectComponent {
//   type: DiscordAPIMessageComponentType.UserSelect
// }

// interface RoleSelectComponent {
//   type: DiscordAPIMessageComponentType.RoleSelect
// }

// interface MentionableSelectComponent {
//   type: DiscordAPIMessageComponentType.MentionableSelect
// }

// interface ChannelSelectComponent {
//   type: DiscordAPIMessageComponentType.ChannelSelect
// }

// interface ActionRowComponent {
//   type: DiscordAPIMessageComponentType.ActionRow
//   components: Array<ButtonComponent | StringSelectComponent | TextInputComponent | UserSelectComponent | RoleSelectComponent | MentionableSelectComponent | ChannelSelectComponent>
// }

// interface InteractionResponseOptions {
//   content?: string
//   embeds?: Embed[]
//   attachments?: Attachment[]
//   fetchReply?: boolean
//   components?: ActionRowComponent[]
// }

export class MessageComponentInteraction extends BaseInteraction {
  // constructor (client: Client, data: InteractionData) {
  //   super(client, data)
  // }
}
