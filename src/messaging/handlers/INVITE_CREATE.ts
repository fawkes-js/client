import { type Snowflake, type DiscordAPIInvite } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CacheInvite } from "../structures/CacheInvite";
import { Invite } from "../../structures/Invite";
import { getCacheChannel, getCacheGuild, getCacheGuildMember } from "../../utils/CacheUpdate";
import { Guild } from "../../structures/Guild";
import { Channel } from "../../structures/Channel";
import { User } from "../../structures/User";

export interface GatewayInvite extends DiscordAPIInvite {
  type?: number;
  uses?: number;
  max_uses?: number;
  max_age?: number;
  temporary?: boolean;
  channel_id?: Snowflake;
  guild_id?: Snowflake;
}

export class INVITE_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INVITE_CREATE", (packet: GatewayInvite) => {
      void (async (packet) => {
        const [cacheGuild, cacheChannel, cacheInviter] = await Promise.all([
          await getCacheGuild(this.client, <Snowflake>packet.guild_id),
          await getCacheChannel(this.client, <Snowflake>packet.guild_id, <Snowflake>packet.channel_id),
          await getCacheGuildMember(this.client, <Snowflake>packet.guild_id, <Snowflake>packet.inviter?.id),
        ]);

        if (!cacheGuild || !cacheChannel || !cacheInviter || !cacheInviter.user) return;
        this.client.emit(
          "inviteCreate",
          new Invite(
            new CacheInvite(packet),
            new Guild(this.client, cacheGuild),
            new Channel(this.client, cacheChannel),
            new User(this.client, cacheInviter.user)
          )
        );
      })(packet);
    });
  }
}
