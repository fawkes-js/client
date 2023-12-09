import {
  type DiscordAPIInteractionType,
  type DiscordAPILocale,
  type DiscordAPIBaseInteraction,
  type DiscordAPIGuildMember,
  type DiscordAPIUser,
} from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Guild } from "../Guild";
import { GuildMember } from "../GuildMember";
import { User } from "../User";
import { Channel } from "../Channel";
import { DiscordSnowflake } from "../../utils/Snowflake";
import { type CacheGuild } from "../../messaging/structures/CacheGuild";
import { type CacheChannel } from "../../messaging/structures/CacheChannel";
import { CacheGuildMember } from "../../messaging/structures/CacheGuildMember";

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
  createdAt: any;
  constructor(
    client: Client,
    interaction: DiscordAPIBaseInteraction<DiscordAPIInteractionType, unknown>,
    guild: CacheGuild,
    channel: CacheChannel
  ) {
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

    this.member =
      interaction.member !== null
        ? new GuildMember(client, guild, new CacheGuildMember(<DiscordAPIGuildMember>interaction.member))
        : null;

    this.user = interaction.user ? new User(client, interaction.user) : new User(client, <DiscordAPIUser>interaction?.member?.user);

    this.locale = interaction.locale;

    this.guildLocale = interaction.guild_locale ? interaction.guild_locale : null;

    this.version = interaction.version;

    this.createdAt = DiscordSnowflake.getTimestamp(interaction.id);
  }
}
