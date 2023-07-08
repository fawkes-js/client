import { type FawkesUser, type DiscordAPISticker, type FawkesSticker } from "@fawkes.js/typings";
import { CacheUser } from "./CacheUser";

export class CacheSticker implements FawkesSticker {
  constructor(packet: DiscordAPISticker) {
    this.id = packet.id;
    this.packId = packet.pack_id ? packet.pack_id : undefined;
    this.name = packet.name;
    this.description = packet.description;
    this.tags = packet.tags;
    this.asset = packet.asset ? packet.asset : undefined;
    this.type = packet.type;
    this.formatType = packet.format_type;
    this.available = packet.available ? packet.available : undefined;
    this.guildId = packet.guild_id ? packet.guild_id : undefined;
    this.user = packet.user ? new CacheUser(packet.user) : undefined;
    this.sortValue = packet.sort_value ? packet.sort_value : undefined;
  }

  id: string;
  packId?: string | undefined;
  name: string;
  description: string | null;
  tags: string;
  asset?: string | undefined;
  type: number;
  formatType: number;
  available?: boolean | undefined;
  guildId?: string | undefined;
  user?: FawkesUser | undefined;
  sortValue?: number | undefined;
}
