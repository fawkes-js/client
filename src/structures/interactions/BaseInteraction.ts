import {
  type DiscordAPIInteractionType,
  type DiscordAPILocale,
  type DiscordAPIInteraction,
  type DiscordAPIGuild,
  type DiscordAPIGuildMember,
  type DiscordAPIUser,
  type DiscordAPIChannel,
} from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Guild } from "../Guild";
import { GuildMember } from "../GuildMember";
import { User } from "../User";
import { Channel } from "../Channel";

export class BaseInteraction {
  guild: Guild;
  member: GuildMember | null;
  user: User | null;
  client!: Client;
  id: string;
  token!: string;
  locale?: DiscordAPILocale | undefined;
  type: DiscordAPIInteractionType;
  channel: Channel;
  applicationId: string;
  appPermissions: string | undefined;
  version: number;
  channelId: string | undefined;
  guildId: string | undefined;
  guildLocale: string | null;
  constructor(client: Client, interaction: DiscordAPIInteraction, guild: DiscordAPIGuild, channel: DiscordAPIChannel) {
    Object.defineProperty(this, "client", { value: client });

    Object.defineProperty(this, "token", { value: interaction.token });

    this.id = interaction.id;

    this.applicationId = interaction.application_id;

    this.type = interaction.type;
    // need to sort these
    this.appPermissions = interaction.app_permissions;

    this.channelId = interaction.channel_id;

    this.channel = new Channel(client, channel);

    this.guildId = interaction.guild_id;

    this.guild = new Guild(client, guild);

    this.member = interaction.member !== null ? new GuildMember(client, guild, <DiscordAPIGuildMember>interaction.member) : null;

    this.user = interaction.user ? new User(interaction.user) : new User(<DiscordAPIUser>interaction?.member?.user);

    this.locale = interaction.locale;

    this.guildLocale = interaction.guild_locale ? interaction.guild_locale : null;

    this.version = interaction.version;
  }
}
