import { DiscordAPIButtonComponentButtonStyleType, DiscordAPIEmoji, DiscordAPIGuild, DiscordAPIGuildMember, DiscordAPIInteraction, DiscordAPIInteractionType, DiscordAPIMessageComponentType, DiscordAPIUser, Routes } from "@fawkes.js/api-types";
import { DiscordAPILocale } from "@fawkes.js/api-types";
import { DiscordAPICommandOptionType } from "@fawkes.js/api-types";
import { Client } from "../Client";
import { Guild } from "./Guild";
import { GuildMember } from "./GuildMember";
import { User } from "./User";
import { Message } from './Message';
import { APIEmbed } from "./APIEmbed";
import { Embed } from './APIEmbed'

type InteractionData = {
    interaction: DiscordAPIInteraction;
    guild: DiscordAPIGuild;
    member: DiscordAPIGuildMember | null;
    user: DiscordAPIUser | null;
};

export class BaseInteraction {
    guild: Guild;
    member: GuildMember | null;
    user: User
    client!: Client;
    id: string;
    token!: string;
    locale?: DiscordAPILocale | undefined;
    type: DiscordAPIInteractionType
    constructor(client: Client, data: InteractionData) {

        Object.defineProperty(this, 'client', { value: client });

        Object.defineProperty(this, 'token', { value: data.interaction.token });

        this.id = data.interaction.id;

        this.guild = new Guild(client, data.guild);

        this.member = data.member ? new GuildMember(client, data.guild, data.member) : null;

        this.user = this.member ? this.member.user : new User(<DiscordAPIUser>data.user)

        this.locale = data.interaction.locale

        this.type = data.interaction.type
    }


}
