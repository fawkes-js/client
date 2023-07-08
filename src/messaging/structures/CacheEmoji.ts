import { type FawkesEmoji, type FawkesUser, type DiscordAPIEmoji } from "@fawkes.js/typings";
import { CacheUser } from "./CacheUser";

export class CacheEmoji implements FawkesEmoji {
  constructor(packet: DiscordAPIEmoji) {
    this.id = packet.id;
    this.name = packet.name;
    this.roles = packet.roles;
    this.user = packet.user ? new CacheUser(packet.user) : undefined;
    this.requireColons = packet.require_colons ? packet.require_colons : undefined;
    this.managed = packet.managed ? packet.managed : undefined;
    this.animated = packet.animated ? packet.animated : undefined;
    this.available = packet.available ? packet.available : undefined;
  }

  id: string | null;
  name: string | null;
  roles: string[];
  user?: FawkesUser | undefined;
  requireColons?: boolean | undefined;
  managed?: boolean | undefined;
  animated?: boolean | undefined;
  available?: boolean | undefined;
}
