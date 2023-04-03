import { DiscordAPIButtonComponentButtonStyleType, DiscordAPIEmoji, DiscordAPIGuild, DiscordAPIGuildMember, DiscordAPIInteraction, DiscordAPIMessageComponentType, DiscordAPIUser, Routes } from "@fawkes.js/api-types";
import { DiscordAPILocale } from "@fawkes.js/api-types";
import { DiscordAPICommandOptionType } from "@fawkes.js/api-types";
import { Client } from "../Client";
import { Guild } from "./Guild";
import { GuildMember } from "./GuildMember";
import { User } from "./User";
import { Message } from './Message';
import { APIEmbed } from "./APIEmbed";
import { Embed } from './APIEmbed'
import { BaseInteraction } from "./BaseInteraction";

type InteractionData = {
  interaction: DiscordAPIInteraction;
  guild: DiscordAPIGuild;
  member: DiscordAPIGuildMember | null;
  user: DiscordAPIUser | null;
};

type Attachment = {}

type ButtonComponent = {
  type: 2;
  style: DiscordAPIButtonComponentButtonStyleType;
  label?: string;
  emoji?: DiscordAPIEmoji;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

type StringSelectComponentOption = {
  label: string;
  value: string;
  description?: string;
  emoji?: DiscordAPIEmoji;
}
type StringSelectComponent = {
  type: DiscordAPIMessageComponentType.StringSelect;
  custom_id: string;
  options: StringSelectComponentOption[]
}

type TextInputComponent = {
  type: DiscordAPIMessageComponentType.TextInput
}

type UserSelectComponent = {
  type: DiscordAPIMessageComponentType.UserSelect
}

type RoleSelectComponent = {
  type: DiscordAPIMessageComponentType.RoleSelect
}

type MentionableSelectComponent = {
  type: DiscordAPIMessageComponentType.MentionableSelect
}

type ChannelSelectComponent = {
  type: DiscordAPIMessageComponentType.ChannelSelect
}

type ActionRowComponent = {
  type: DiscordAPIMessageComponentType.ActionRow;
  components: (ButtonComponent | StringSelectComponent | TextInputComponent | UserSelectComponent | RoleSelectComponent | MentionableSelectComponent | ChannelSelectComponent)[];
}

type InteractionResponseOptions = {
  content?: string;
  embeds?: Embed[];
  attachments?: Attachment[];
  fetchReply?: boolean;
  components?: ActionRowComponent[]
};

export class ChatInputCommandInteraction extends BaseInteraction {
  command: string;
  options: any[];
  constructor(client: Client, data: InteractionData) {
    super(client, data)
    let options: any[] = [];

    if (data.interaction.data?.options) {
      data.interaction.data?.options.map((option) => {
        switch (option.type) {
          case DiscordAPICommandOptionType.SubCommand:
            break;
          case DiscordAPICommandOptionType.SubCommandGroup:
            break;
          case DiscordAPICommandOptionType.String:
            options.push({ name: option.name, data: option.value, type: option.type })
            break;
          case DiscordAPICommandOptionType.Integer:
            break;
          case DiscordAPICommandOptionType.Boolean:
            break;
          case DiscordAPICommandOptionType.User:
            const member = data.guild.members.find((m) => m.user?.id === option.value)
            member?.user ? options.push({ name: option.name, data: new User(member.user), type: option.type }) : null
            break;
          case DiscordAPICommandOptionType.Channel:
            break;
          case DiscordAPICommandOptionType.Role:
            break;
          case DiscordAPICommandOptionType.Mentionable:
            break;
          case DiscordAPICommandOptionType.Number:
            break;
          case DiscordAPICommandOptionType.Attachment:
            break;
        }
      })
    }

    this.command = <string>data.interaction.data?.name;

    this.options = data.interaction.data?.options ? options : []

  }

  reply(data: InteractionResponseOptions) {

    function APIEmbeds(embeds: Embed[]) {
      const APIEmbeds: APIEmbed[] = []
      embeds.map((embed) => APIEmbeds.push(new APIEmbed(embed)))
      return APIEmbeds
    }

    const APIData: any = { ...data }
    APIData.embeds = data.embeds ? APIEmbeds(data.embeds) : []

    console.log(APIData)
    const reply = this.client.rest.request(Routes.createInteractionResponse(this.id, this.token), { type: 4, data: APIData });

    const fetchReply = async () => {
      return new Message(this.client, await this.client.rest.request(Routes.getOriginalInteractionResponse(this.client.application.id, this.token)))
    }
    if (data.fetchReply) return fetchReply()
    else return null;
  }

  getUser() {
    let users: any[] = [];

    this.options.map((option) => {
      if (option.type === DiscordAPICommandOptionType.User) users.push(option)
    })
    return users;
  }

  getOption(name: string) { }


}
