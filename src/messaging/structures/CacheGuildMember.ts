import { type DiscordAPIGuildMember, type FawkesGuildMember, type FawkesUser } from "@fawkes.js/typings";
import { CacheUser } from "./CacheUser";

export class CacheGuildMember implements FawkesGuildMember {
  constructor(packet: DiscordAPIGuildMember) {
    this.user = packet.user ? new CacheUser(packet.user) : undefined;
    this.nick = packet.nick ? packet.nick : undefined;
    this.avatar = packet.avatar ? packet.avatar : undefined;
    this.roles = packet.roles;
    this.joinedAt = packet.joined_at;
    this.premiumSince = packet.premium_since ? packet.premium_since : undefined;
    this.deaf = packet.deaf;
    this.mute = packet.mute;
    this.pending = packet.pending ? packet.pending : undefined;
    this.permissions = packet.permissions ? packet.permissions : undefined;
    this.communicationDisabledUntil = packet.communication_disabled_until ? packet.communication_disabled_until : undefined;
  }

  user?: FawkesUser | undefined;
  nick?: string | null | undefined;
  avatar?: string | null | undefined;
  roles: string[];
  joinedAt: Date;
  premiumSince?: Date | null | undefined;
  deaf: boolean;
  mute: boolean;
  pending?: boolean | undefined;
  permissions?: string | undefined;
  communicationDisabledUntil?: Date | undefined;
}
