import { type DiscordAPIRoleTags, type DiscordAPIRole, type FawkesRole, type FawkesRoleTags } from "@fawkes.js/typings";

export class CacheRole implements FawkesRole {
  constructor(packet: DiscordAPIRole) {
    this.id = packet.id;
    this.name = packet.name;
    this.color = packet.color;
    this.hoist = packet.hoist;
    this.icon = packet.icon ? packet.icon : undefined;
    this.unicodeEmoji = packet.unicode_emoji ? packet.unicode_emoji : undefined;
    this.position = packet.position;
    this.permissions = packet.permissions;
    this.managed = packet.managed;
    this.mentionable = packet.mentionable;
    this.tags = packet.tags ? new CacheRoleTag(packet.tags) : undefined;
  }

  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string | null | undefined;
  unicodeEmoji?: string | null | undefined;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: FawkesRoleTags | undefined;
}

export class CacheRoleTag implements FawkesRoleTags {
  constructor(packet: DiscordAPIRoleTags) {
    this.botId = packet.bot_id ? packet.bot_id : undefined;
    this.integrationId = packet.integration_id ? packet.integration_id : undefined;
    this.premiumSubscriber = packet.premium_subscriber ? packet.premium_subscriber : undefined;
    this.subscriptionListingId = packet.subscription_listing_id ? packet.subscription_listing_id : undefined;
    this.availableForPurchase = packet.available_for_purchase ? packet.available_for_purchase : undefined;
    this.guildConnections = packet.guild_connections ? packet.guild_connections : undefined;
  }

  botId?: string | undefined;
  integrationId: string | undefined;
  premiumSubscriber?: null | undefined;
  subscriptionListingId?: string | undefined;
  availableForPurchase?: null | undefined;
  guildConnections?: null | undefined;
}
