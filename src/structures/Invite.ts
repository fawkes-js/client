import { type CacheInvite } from "../messaging/structures/CacheInvite";
import { type Guild } from "./Guild";
import { type User } from "./User";
import { type DiscordAPIGuildScheduledEvent, type DiscordAPIInviteStageInstance } from "@fawkes.js/typings";
import { type Channel } from "./Channel";

export class Invite {
  code: string;
  targetUser: string;
  targetType: number | undefined;
  inviter: User;
  channel: Channel;
  guild: Guild;
  targetApplication: string;
  approximatePresenceCount: number | undefined;
  approximateMemberCount: number | undefined;
  expiresAt: Date | undefined;
  stageInstance: DiscordAPIInviteStageInstance | undefined;
  guildScheduledEvent: DiscordAPIGuildScheduledEvent | undefined;
  type: number | undefined;
  uses: number | undefined;
  maxUses: number | undefined;
  maxAge: number | undefined;
  temporary: boolean | undefined;
  constructor(invite: CacheInvite, guild: Guild, channel: Channel, inviter: User) {
    this.guild = guild;

    this.channel = channel;

    this.inviter = inviter;

    this.targetType = invite.targetType;

    this.targetUser = "need to fill";

    this.code = invite.code;

    this.targetApplication = "need to fill";

    this.approximatePresenceCount = invite.approximateMemberCount;

    this.approximateMemberCount = invite.approximateMemberCount;

    this.expiresAt = invite.expiresAt;

    this.stageInstance = invite.stageInstance;

    this.guildScheduledEvent = invite.guildScheduledEvent;

    this.type = invite.type;

    this.uses = invite.uses;

    this.maxUses = invite.maxUses;

    this.maxAge = invite.maxAge;

    this.temporary = invite.temporary;
  }
}
