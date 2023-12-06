import {
  type DiscordAPIRole,
  type DiscordAPIFeature,
  type DiscordAPIGuild,
  type DiscordAPIGuildVerificationLevel,
  type FawkesAutoModerationRule,
  type FawkesChannel,
  type FawkesEmoji,
  type FawkesGuild,
  type FawkesGuildMember,
  type FawkesGuildScheduledEvent,
  type FawkesPresenceUpdate,
  type FawkesRole,
  type FawkesStageInstance,
  type FawkesSticker,
  type FawkesVoiceState,
  type FawkesWelcomeScreen,
  type DiscordAPIEmoji,
  type DiscordAPIWelcomeScreen,
  type FawkesWelcomeScreenChannel,
  type DiscordAPIWelcomeScreenChannel,
  type DiscordAPISticker,
  type DiscordAPIVoiceState,
  type DiscordAPIGuildMember,
  type DiscordAPIChannel,
  type DiscordAPIPresenceUpdate,
  type FawkesActivity,
  type DiscordAPIActivitySecrets,
  type DiscordAPIActivityParty,
  type DiscordAPIActivityAssets,
  type FawkesClientStatus,
  type FawkesUser,
  type DiscordAPIActivity,
  type FawkesActivityAssets,
  type FawkesActivityButton,
  type FawkesActivityParty,
  type FawkesActivitySecrets,
  type FawkesActivityTimestamps,
  type DiscordAPIClientStatus,
  type DiscordAPIActivityTimestamps,
  type DiscordAPIActivityButton,
  type DiscordAPIStageInstance,
  type DiscordAPIStagePrivacyLevel,
  type DiscordAPIGuildScheduledEvent,
  type DiscordAPIGuildScheduledEventEntityType,
  type DiscordAPIGuildScheduledEventPrivacyLevel,
  type DiscordAPIGuildScheduledEventStatus,
  type FawkesGuildScheduledEventEntityMetadata,
  type DiscordAPIGuildScheduledEventEntityMetadata,
  type Snowflake,
  type FawkesApplicationCommandPermissionStructure,
} from "@fawkes.js/typings";
import { CacheRole } from "./CacheRole";
import { CacheEmoji } from "./CacheEmoji";
import { CacheSticker } from "./CacheSticker";
import { CacheGuildMember } from "./CacheGuildMember";
import { CacheChannel } from "./CacheChannel";
import { CacheUser } from "./CacheUser";

export class CacheGuild implements FawkesGuild {
  constructor(packet: DiscordAPIGuild) {
    this.id = packet.id;
    this.name = packet.name;
    this.icon = packet.icon;
    this.iconHash = packet.icon_hash ? packet.icon_hash : undefined;
    this.splash = packet.splash;
    this.discoverySplash = packet.discovery_splash;
    this.owner = packet.owner ? packet.owner : undefined;
    this.ownerId = packet.owner_id;
    this.permissions = packet.permissions ? packet.permissions : undefined;
    this.region = packet.region ? packet.region : undefined;
    this.afkChannelId = packet.afk_channel_id;
    this.afkTimeout = packet.afk_timeout;
    this.widgetEnabled = packet.widget_enabled ? packet.widget_enabled : undefined;
    this.widgetChannelId = packet.widget_channel_id ? packet.widget_channel_id : undefined;
    this.verificationLevel = packet.verification_level;
    this.defaultMessageNotifications = packet.default_message_notifications;
    this.explicitContentFilter = packet.explicit_content_filter;
    this.roles = packet.roles.map((role: DiscordAPIRole) => {
      return new CacheRole(role);
    });
    this.emojis = packet.emojis.map((emoji: DiscordAPIEmoji) => {
      return new CacheEmoji(emoji);
    });
    this.features = packet.features;
    this.mfaLevel = packet.mfa_level;
    this.applicationId = packet.application_id;
    this.systemChannelId = packet.system_channel_id;
    this.systemChannelFlags = packet.system_channel_flags;
    this.rulesChannelId = packet.rules_channel_id;
    this.maxPresences = packet.max_presences ? packet.max_presences : undefined;
    this.maxMembers = packet.max_members ? packet.max_members : undefined;
    this.vanityUrlCode = packet.vanity_url_code;
    this.description = packet.description;
    this.banner = packet.banner;
    this.premiumTier = packet.premium_tier;
    this.premiumSubscriptionCount = packet.premium_subscription_count ? packet.premium_subscription_count : undefined;
    this.preferredLocale = packet.preferred_locale;
    this.publicUpdatesChannelId = packet.public_updates_channel_id;
    this.maxVideoChannelUsers = packet.max_video_channel_users ? packet.max_video_channel_users : undefined;
    this.approximateMemberCount = packet.approximate_member_count ? packet.approximate_member_count : undefined;
    this.approximatePresenceCount = packet.approximate_presence_count ? packet.approximate_presence_count : undefined;
    this.welcomeScreen = packet.welcome_screen ? new CacheWelcomeScreen(packet.welcome_screen) : undefined;
    this.nsfwLevel = packet.nsfw_level;
    this.stickers = packet.stickers
      ? packet.stickers.map((sticker: DiscordAPISticker) => {
          return new CacheSticker(sticker);
        })
      : undefined;
    this.premiumProgressBarEnabled = packet.premium_progress_bar_enabled;
    this.joinedAt = packet.joined_at;
    this.large = packet.large;
    this.unavailable = packet.unavailable ? packet.unavailable : undefined;
    this.memberCount = packet.member_count;
    this.voiceStates = packet.voice_states.map((voiceState: DiscordAPIVoiceState) => {
      return new CacheVoiceState(voiceState);
    });
    this.members = packet.members.map((member: DiscordAPIGuildMember) => {
      return new CacheGuildMember(member);
    });
    this.channels = packet.channels.map((channel: DiscordAPIChannel) => {
      return new CacheChannel(channel);
    });
    this.presences = packet.presences.map((presence: DiscordAPIPresenceUpdate) => {
      return new CachePresenceUpdate(presence);
    });
    this.stageInstances = packet.stage_instances.map((stageInstance: DiscordAPIStageInstance) => {
      return new CacheStageInstance(stageInstance);
    });
    this.guildScheduledEvents = packet.guild_scheduled_events.map((guildScheduledEvent: DiscordAPIGuildScheduledEvent) => {
      return new CacheGuildScheduledEvent(guildScheduledEvent);
    });
    this.autoModerationRules = [];
    this.bans = [];
    this.applicationCommandPermissions = [];
  }

  id: string;
  name: string;
  icon: string | null;
  iconHash?: string | null | undefined;
  splash: string | null;
  discoverySplash: string | null;
  owner?: boolean | undefined;
  ownerId: string;
  permissions?: string | undefined;
  region?: string | null | undefined;
  afkChannelId: string | null;
  afkTimeout: number;
  widgetEnabled?: boolean | undefined;
  widgetChannelId?: string | null | undefined;
  verificationLevel: DiscordAPIGuildVerificationLevel;
  defaultMessageNotifications: number;
  explicitContentFilter: number;
  roles: FawkesRole[];
  emojis: FawkesEmoji[];
  features: DiscordAPIFeature[];
  mfaLevel: number;
  applicationId: string | null;
  systemChannelId: string | null;
  systemChannelFlags: number;
  rulesChannelId: string | null;
  maxPresences?: number | null | undefined;
  maxMembers?: number | undefined;
  vanityUrlCode: string | null;
  description: string | null;
  banner: string | null;
  premiumTier: number;
  premiumSubscriptionCount?: number | undefined;
  preferredLocale: string;
  publicUpdatesChannelId: string | null;
  maxVideoChannelUsers?: number | undefined;
  approximateMemberCount?: number | undefined;
  approximatePresenceCount?: number | undefined;
  welcomeScreen?: FawkesWelcomeScreen | undefined;
  nsfwLevel: number;
  stickers?: FawkesSticker[] | undefined;
  premiumProgressBarEnabled: boolean;
  joinedAt: Date;
  large: boolean;
  unavailable?: boolean | undefined;
  memberCount: number;
  voiceStates: FawkesVoiceState[];
  members: FawkesGuildMember[];
  channels: FawkesChannel[];
  presences: FawkesPresenceUpdate[];
  stageInstances: FawkesStageInstance[];
  guildScheduledEvents: FawkesGuildScheduledEvent[];
  autoModerationRules: FawkesAutoModerationRule[];
  bans: Snowflake[];
  applicationCommandPermissions: FawkesApplicationCommandPermissionStructure[];
}

export class CacheGuildScheduledEventEntityMetadata implements FawkesGuildScheduledEventEntityMetadata {
  constructor(packet: DiscordAPIGuildScheduledEventEntityMetadata) {
    this.location = packet.location ? packet.location : undefined;
  }

  location?: string | undefined;
}

export class CacheGuildScheduledEvent implements FawkesGuildScheduledEvent {
  constructor(packet: DiscordAPIGuildScheduledEvent) {
    this.id = packet.id;
    this.guildId = packet.guild_id;
    this.channelId = packet.channel_id;
    this.creatorId = packet.creator_id ? packet.creator_id : undefined;
    this.name = packet.name;
    this.description = packet.description ? packet.description : undefined;
    this.scheduledStartTime = packet.scheduled_start_time;
    this.scheduledEndTime = packet.scheduled_end_time;
    this.privacyLevel = packet.privacy_level;
    this.status = packet.status;
    this.entityType = packet.entity_type;
    this.entityId = packet.entity_id;
    this.entityMetadata = new CacheGuildScheduledEventEntityMetadata(packet.entity_metadata);
    this.creator = packet.creator ? new CacheUser(packet.creator) : undefined;
    this.userCount = packet.user_count ? packet.user_count : undefined;
    this.image = packet.image ? packet.image : undefined;
  }

  id: string;
  guildId: string;
  channelId: string;
  creatorId?: string | undefined;
  name: string;
  description?: string | undefined;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  privacyLevel: DiscordAPIGuildScheduledEventPrivacyLevel;
  status: DiscordAPIGuildScheduledEventStatus;
  entityType: DiscordAPIGuildScheduledEventEntityType;
  entityId: string;
  entityMetadata: FawkesGuildScheduledEventEntityMetadata;
  creator?: FawkesUser | undefined;
  userCount?: number | undefined;
  image?: string | undefined;
}
export class CacheStageInstance implements FawkesStageInstance {
  constructor(packet: DiscordAPIStageInstance) {
    this.id = packet.id;
    this.guildId = packet.guild_id;
    this.channelId = packet.channel_id;
    this.topic = packet.topic;
    this.privacyLevel = packet.privacy_level;
    this.discoverableDisabled = packet.discoverable_disabled;
    this.guildScheduledEventId = packet.guild_scheduled_event_id;
  }

  id: string;
  guildId: string;
  channelId: string;
  topic: string;
  privacyLevel: DiscordAPIStagePrivacyLevel;
  discoverableDisabled: boolean;
  guildScheduledEventId: string | undefined;
}

export class CacheWelcomeScreen implements FawkesWelcomeScreen {
  constructor(packet: DiscordAPIWelcomeScreen) {
    this.description = packet.description;
    this.welcomeChannels = packet.welcome_channels.map((welcomeScreenChannel: DiscordAPIWelcomeScreenChannel) => {
      return new CacheWelcomeScreenChannel(welcomeScreenChannel);
    });
  }

  description: string | null;
  welcomeChannels: FawkesWelcomeScreenChannel[];
}

export class CacheWelcomeScreenChannel implements FawkesWelcomeScreenChannel {
  constructor(packet: DiscordAPIWelcomeScreenChannel) {
    this.channelId = packet.channel_id;
    this.description = packet.description;
    this.emojiId = packet.emoji_id;
    this.emojiName = packet.emoji_name;
  }

  channelId: string;
  description: string;
  emojiId: string | null;
  emojiName: string | null;
}

export class CacheVoiceState implements FawkesVoiceState {
  constructor(packet: DiscordAPIVoiceState) {
    this.guildId = packet.guild_id ? packet.guild_id : undefined;
  }

  guildId?: string | undefined;
  channelId: string | null;
  userId: string;
  member?: FawkesGuildMember | undefined;
  sessionId: string;
  deaf: boolean;
  mute: boolean;
  selfDeaf: boolean;
  selfMute: boolean;
  selfStream?: boolean | undefined;
  selfVideo: boolean;
  suppress: boolean;
  requestToSpeakTimestamp: Date | null;
}

export class CacheActivityTimestamps implements FawkesActivityTimestamps {
  constructor(packet: DiscordAPIActivityTimestamps) {
    this.start = packet.start ? packet.start : undefined;
    this.end = packet.end ? packet.end : undefined;
  }

  start?: number | undefined;
  end?: number | undefined;
}

export class CacheActivityParty implements FawkesActivityParty {
  constructor(packet: DiscordAPIActivityParty) {
    this.id = packet.id ? packet.id : undefined;
    this.size = packet.size ? packet.size : undefined;
  }

  id?: string | undefined;
  size?: number | undefined;
}

export class CacheActivityAssets implements FawkesActivityAssets {
  constructor(packet: DiscordAPIActivityAssets) {
    this.largeImage = packet.large_image ? packet.large_image : undefined;
    this.largeText = packet.large_text ? packet.large_text : undefined;
    this.smallImage = packet.small_image ? packet.small_image : undefined;
    this.smallText = packet.small_text ? packet.small_text : undefined;
  }

  largeImage?: string | undefined;
  largeText?: string | undefined;
  smallImage?: string | undefined;
  smallText?: string | undefined;
}

export class CacheActivitySecrets implements FawkesActivitySecrets {
  constructor(packet: DiscordAPIActivitySecrets) {
    this.join = packet.join ? packet.join : undefined;
    this.spectate = packet.spectate ? packet.spectate : undefined;
    this.match = packet.match ? packet.match : undefined;
  }

  join?: string | undefined;
  spectate?: string | undefined;
  match?: string | undefined;
}

export class CacheActivityButton implements FawkesActivityButton {
  constructor(packet: DiscordAPIActivityButton) {
    this.label = packet.label;
    this.url = packet.url;
  }

  label: string;
  url: string;
}

export class CacheActivity implements FawkesActivity {
  constructor(packet: DiscordAPIActivity) {
    this.name = packet.name;
    this.type = packet.type;
    this.url = packet.url ? packet.url : undefined;
    this.createdAt = packet.created_at;
    this.timestamps = packet.timestamps ? new CacheActivityTimestamps(packet.timestamps) : undefined;
    this.applicationId = packet.application_id ? packet.application_id : undefined;
    this.details = packet.details ? packet.details : undefined;
    this.state = packet.state ? packet.state : undefined;
    this.emoji = packet.emoji ? new CacheEmoji(packet.emoji) : undefined;
    this.party = packet.party ? new CacheActivityParty(packet.party) : undefined;
    this.assets = packet.assets ? new CacheActivityAssets(packet.assets) : undefined;
    this.secrets = packet.secrets ? new CacheActivitySecrets(packet.secrets) : undefined;
    this.instance = packet.instance ? packet.instance : undefined;
    this.flags = packet.flags ? packet.flags : undefined;
    this.buttons = packet.buttons
      ? packet.buttons.map((button: DiscordAPIActivityButton) => {
          return new CacheActivityButton(button);
        })
      : undefined;
  }

  name: string;
  type: number;
  url?: string | undefined;
  createdAt: number;
  timestamps?: FawkesActivityTimestamps | undefined;
  applicationId?: string | undefined;
  details?: string | undefined;
  state?: string | undefined;
  emoji?: FawkesEmoji | undefined;
  party?: FawkesActivityParty | undefined;
  assets?: FawkesActivityAssets | undefined;
  secrets?: FawkesActivitySecrets | undefined;
  instance?: boolean | undefined;
  flags?: number | undefined;
  buttons?: FawkesActivityButton[] | undefined;
}

export class CacheClientStatus implements FawkesClientStatus {
  constructor(packet: DiscordAPIClientStatus) {
    this.desktop = packet.desktop ? packet.desktop : undefined;
    this.mobile = packet.mobile ? packet.mobile : undefined;
    this.web = packet.web ? packet.web : undefined;
  }

  desktop?: string | undefined;
  mobile?: string | undefined;
  web?: string | undefined;
}

export class CachePresenceUpdate implements FawkesPresenceUpdate {
  constructor(packet: DiscordAPIPresenceUpdate) {
    this.user = new CacheUser(packet.user);
    this.guildId = packet.guild_id;
    this.activities = packet.activities.map((activity: DiscordAPIActivity) => {
      return new CacheActivity(activity);
    });
    this.clientStatus = new CacheClientStatus(packet.client_status);
  }

  user: FawkesUser;
  guildId: string;
  status: string;
  activities: FawkesActivity[];
  clientStatus: FawkesClientStatus;
}
