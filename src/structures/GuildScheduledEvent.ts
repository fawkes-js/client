import {
  type DiscordAPIGuildScheduledEventEntityMetadata,
  type DiscordAPIGuildScheduledEventEntityType,
  type DiscordAPIGuildScheduledEventPrivacyLevel,
  type Snowflake,
} from "@fawkes.js/typings";
import { type Client } from "../Client";
import { type CacheGuildScheduledEvent } from "../messaging/structures/CacheGuild";
import { type Channel } from "./Channel";
import { type Guild } from "./Guild";
import { type GuildMember } from "./GuildMember";

export class GuildScheduledEvent {
  client: Client;
  channel: Channel | null;
  status: number;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  privacyLevel: DiscordAPIGuildScheduledEventPrivacyLevel;
  name: string;
  image: string | null;
  id: string;
  guildId: string;
  guild: Guild | null;
  entityType: DiscordAPIGuildScheduledEventEntityType;
  entityMetadata: DiscordAPIGuildScheduledEventEntityMetadata | null;
  entityId: Snowflake;
  description: string | undefined;
  creatorId: Snowflake | undefined;
  creator: GuildMember | null;
  channelId: Snowflake;
  userCount: number | undefined;
  constructor(client: Client, guildScheduledEvent: CacheGuildScheduledEvent, guild: Guild, channel: Channel, creator: GuildMember) {
    Object.defineProperty(this, "client", { value: client });

    // this.autoStart = guildScheduledEvent.
    this.channelId = guildScheduledEvent.channelId;

    this.channel = channel;

    this.creatorId = guildScheduledEvent.creatorId;

    this.creator = creator;

    this.description = guildScheduledEvent.description;

    this.entityId = guildScheduledEvent.entityId;

    this.entityMetadata = guildScheduledEvent.entityMetadata;

    this.entityType = guildScheduledEvent.entityType;

    this.guildId = guildScheduledEvent.guildId;

    this.guild = guild;

    // this.eventExceptions = guildScheduledEvent

    this.id = guildScheduledEvent.id;

    this.image = guildScheduledEvent.image ? guildScheduledEvent.image : null;

    this.name = guildScheduledEvent.name;

    this.privacyLevel = guildScheduledEvent.privacyLevel;

    // this.recurrenceRule = guildScheduledEvent.recu

    this.scheduledEndTime = guildScheduledEvent.scheduledEndTime;

    this.scheduledStartTime = guildScheduledEvent.scheduledStartTime;

    // this.skuIds = guildScheduledEvent.sku

    this.status = guildScheduledEvent.status;

    this.userCount = guildScheduledEvent.userCount;
  }
}
