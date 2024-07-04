import {
  type DiscordAPIUser,
  type DiscordAPIGuildScheduledEvent,
  type DiscordAPIInviteStageInstance,
  type Snowflake,
} from "@fawkes.js/typings";
import { CacheUser } from "./CacheUser";
import { type GatewayInvite } from "../handlers/INVITE_CREATE";

export class CacheInvite {
  targetType: number | undefined;
  targetUser: CacheUser | undefined;
  inviter: CacheUser;
  guildId: Snowflake | undefined;
  channelId: Snowflake | undefined;
  code: string;
  guildScheduledEvent: DiscordAPIGuildScheduledEvent | undefined;
  stageInstance: DiscordAPIInviteStageInstance | undefined;
  approximateMemberCount: number | undefined;
  approximatePresenceCount: number | undefined;
  targetApplicationId: string | undefined;
  expiresAt: Date | undefined;
  temporary?: boolean;
  maxUses?: number;
  maxAge?: number;
  uses?: number;
  type?: number;
  constructor(invite: GatewayInvite) {
    this.code = invite.code;
    this.guildId = invite.guild ? invite.guild.id : invite.guild_id;
    this.channelId = invite.channel ? invite.channel.id : invite.channel_id;
    this.inviter = new CacheUser(<DiscordAPIUser>invite.inviter);
    this.targetType = invite.target_type;
    this.targetUser = invite.target_user ? new CacheUser(invite.target_user) : undefined;
    this.targetApplicationId = invite.target_application ? invite.target_application.id : undefined;
    this.approximatePresenceCount = invite.approximate_presence_count;
    this.approximateMemberCount = invite.approximate_member_count;
    this.expiresAt = invite.expires_at;
    this.stageInstance = invite.stage_instance;
    this.guildScheduledEvent = invite.guild_scheduled_event;
    this.type = invite.type;
    this.uses = invite.uses;
    this.maxUses = invite.max_uses;
    this.maxAge = invite.max_age;
    this.temporary = invite.temporary;
  }
}
