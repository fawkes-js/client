import {
  type DiscordAPIChannel,
  type FawkesChannel,
  type FawkesDefaultReaction,
  type FawkesOverwrite,
  type FawkesThreadMember,
  type FawkesThreadMetadata,
  type FawkesUser,
} from "@fawkes.js/typings";
import { CacheUser } from "./CacheUser";

export class CacheChannel implements FawkesChannel {
  constructor(packet: DiscordAPIChannel) {
    this.id = packet.id;
    this.type = packet.type;
    this.guildId = packet.guild_id;
    this.position = packet.position;
    this.permissionOverwrites = packet.permission_overwrites;
    this.name = packet.name ? packet.name : undefined;
    this.topic = packet.topic ? packet.topic : undefined;
    this.nsfw = packet.nsfw ? packet.nsfw : undefined;
    this.lastMessageId = packet.last_message_id ? packet.last_message_id : undefined;
    this.bitrate = packet.bitrate ? packet.bitrate : undefined;
    this.userLimit = packet.user_limit ? packet.user_limit : undefined;
    this.rateLimitPerUser = packet.rate_limit_per_user ? packet.rate_limit_per_user : undefined;
    this.recipients = packet.recipients ? packet.recipients : undefined;
    this.icon = packet.icon ? packet.icon : undefined;
    this.recipients = packet.recipients?.map((user) => {
      return new CacheUser(user);
    });
    this.icon = packet.icon ? packet.icon : undefined;
    this.ownerId = packet.owner_id ? packet.owner_id : undefined;
    this.applicationId = packet.application_id ? packet.application_id : undefined;
    this.parentId = packet.parent_id ? packet.parent_id : undefined;
    this.lastPinTimestamp = packet.last_pin_timestamp ? packet.last_pin_timestamp : undefined;
    this.rtcRegion = packet.rtc_region ? packet.rtc_region : undefined;
    this.videoQualityMode = packet.video_quality_mode ? packet.video_quality_mode : undefined;
    this.messageCount = packet.message_count ? packet.message_count : undefined;
    this.threadMetadata = packet.thread_metadata ? packet.thread_metadata : undefined;
    this.member = packet.member ? packet.member : undefined;
    this.defaultAutoArchiveDuration = packet.default_auto_archive_duration ? packet.default_auto_archive_duration : undefined;
    this.permissions = packet.permissions ? packet.permissions : undefined;
    this.flags = packet.flags ? packet.flags : undefined;
    this.totalMessagesSent = packet.total_messages_sent ? packet.total_messages_sent : undefined;
    this.availableTags = packet.available_tags ? packet.available_tags : undefined;
    this.defaultReactionEmoji = packet.default_reaction_emoji;
    this.version = packet.version;
  }

  id: string;
  type: number;
  guildId: string;
  position?: number | undefined;
  permissionOverwrites?: FawkesOverwrite[] | undefined;
  name?: string | null | undefined;
  topic?: string | null | undefined;
  nsfw?: boolean | undefined;
  lastMessageId?: string | null | undefined;
  bitrate?: number | undefined;
  userLimit?: number | undefined;
  rateLimitPerUser?: number | undefined;
  recipients?: FawkesUser[] | undefined;
  icon?: string | null | undefined;
  ownerId?: string | undefined;
  applicationId?: string | undefined;
  parentId?: string | null | undefined;
  lastPinTimestamp?: Date | null | undefined;
  rtcRegion?: string | null | undefined;
  videoQualityMode?: number | undefined;
  messageCount?: number | undefined;
  memberCount?: number | undefined;
  threadMetadata?: FawkesThreadMetadata | undefined;
  member?: FawkesThreadMember | undefined;
  defaultAutoArchiveDuration?: number | undefined;
  permissions?: string | undefined;
  flags?: number | undefined;
  totalMessagesSent?: number | undefined;
  availableTags?: string[] | undefined;
  defaultReactionEmoji: FawkesDefaultReaction | null;
  version: number;
}
