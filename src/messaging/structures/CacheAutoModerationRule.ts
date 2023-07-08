import {
  type FawkesAutoModerationRule,
  type DiscordAPIAutoModerationRule,
  type DiscordAPIAutoModerationRuleTriggerEventType,
  type DiscordAPIAutoModerationRuleTriggerType,
  type FawkesAutoModerationAction,
  type FawkesAutoModerationRuleTriggerMetadata,
  type DiscordAPIAutoModerationRuleKeywordPresetType,
  type DiscordAPIAutoModerationActionType,
  type FawkesAutoModerationActionMetadata,
  type DiscordAPIAutoModerationAction,
  type DiscordAPIAutoModerationRuleTriggerMetadata,
  type DiscordAPIAutoModerationActionMetadata,
} from "@fawkes.js/typings";

export class CacheAutoModerationRule implements FawkesAutoModerationRule {
  constructor(packet: DiscordAPIAutoModerationRule) {
    this.id = packet.id;
    this.guildId = packet.guild_id;
    this.name = packet.name;
    this.creatorId = packet.creator_id;
    this.eventType = packet.event_type;
    this.triggerType = packet.trigger_type;
    this.triggerMetadata = new CacheAutoModerationRuleTriggerMetadata(packet.trigger_metadata);
    this.actions = packet.actions.map((action) => {
      return new CacheAutoModerationAction(action);
    });
    this.enabled = packet.enabled;
    this.exemptRoles = packet.exempt_roles;
    this.exemptChannels = packet.exempt_channels;
  }

  id: string;
  guildId: string;
  name: string;
  creatorId: string;
  eventType: DiscordAPIAutoModerationRuleTriggerEventType;
  triggerType: DiscordAPIAutoModerationRuleTriggerType;
  triggerMetadata: FawkesAutoModerationRuleTriggerMetadata;
  actions: FawkesAutoModerationAction[];
  enabled: boolean;
  exemptRoles: string[];
  exemptChannels: string[];
}

export class CacheAutoModerationRuleTriggerMetadata implements FawkesAutoModerationRuleTriggerMetadata {
  constructor(packet: DiscordAPIAutoModerationRuleTriggerMetadata) {
    this.keywordFilter = packet.keyword_filter;
    this.regexPatterns = packet.regex_patterns;
    this.presets = packet.presets;
    this.allowList = packet.allow_list;
    this.mentionTotalLimit = packet.mention_total_limit;
    this.mentionRaidProtectionEnabled = packet.mention_raid_protection_enabled;
  }

  keywordFilter: string[];
  regexPatterns: string[];
  presets: DiscordAPIAutoModerationRuleKeywordPresetType;
  allowList: string[];
  mentionTotalLimit: number;
  mentionRaidProtectionEnabled: boolean;
}

export class CacheAutoModerationActionMetadata implements FawkesAutoModerationActionMetadata {
  constructor(packet: DiscordAPIAutoModerationActionMetadata) {
    this.channelId = packet.channel_id;
    this.durationSeconds = packet.duration_seconds;
    this.customMessage = packet.custom_message;
  }

  channelId: string;
  durationSeconds: number;
  customMessage?: string | undefined;
}

export class CacheAutoModerationAction implements FawkesAutoModerationAction {
  constructor(packet: DiscordAPIAutoModerationAction) {
    this.type = packet.type;
    this.metadata = packet.metadata ? new CacheAutoModerationActionMetadata(packet.metadata) : undefined;
  }

  type: DiscordAPIAutoModerationActionType;
  metadata?: FawkesAutoModerationActionMetadata | undefined;
}
