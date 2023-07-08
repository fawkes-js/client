import { type DiscordAPIUser, type FawkesUser } from "@fawkes.js/typings";

export class CacheUser implements FawkesUser {
  constructor(packet: DiscordAPIUser) {
    this.id = packet.id;
    this.username = packet.username;
    this.avatar = packet.avatar;
    this.bot = packet.bot ? packet.bot : undefined;
    this.system = packet.system ? packet.system : undefined;
    this.mfaEnabled = packet.mfa_enabled ? packet.mfa_enabled : undefined;
    this.banner = packet.banner ? packet.banner : undefined;
    this.accentColor = packet.accent_color ? packet.accent_color : undefined;
    this.locale = packet.locale ? packet.locale : undefined;
    this.verified = packet.verified ? packet.verified : undefined;
    this.email = packet.email ? packet.email : undefined;
    this.flags = packet.flags ? packet.flags : undefined;
    this.premiumType = packet.premium_type ? packet.premium_type : undefined;
    this.publicFlags = packet.public_flags ? packet.public_flags : undefined;
  }

  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean | undefined;
  system?: boolean | undefined;
  mfaEnabled?: boolean | undefined;
  banner?: string | null | undefined;
  accentColor?: string | null | undefined;
  locale?: string | undefined;
  verified?: boolean | undefined;
  email?: string | null | undefined;
  flags?: number | undefined;
  premiumType?: number | undefined;
  publicFlags?: number | undefined;
}
