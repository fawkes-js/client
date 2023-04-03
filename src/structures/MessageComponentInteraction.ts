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

export class MessageComponentInteraction extends BaseInteraction {
    constructor(client: Client, data: InteractionData) {
        super(client, data)

    }

}
