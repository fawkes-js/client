import { type Snowflake } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Invite } from "../../structures/Invite";
import { getCacheChannel, getCacheGuild, getCacheGuildMember, getCacheInvite } from "../../utils/CacheUpdate";
import { Guild } from "../../structures/Guild";
import { Channel } from "../../structures/Channel";
import { User } from "../../structures/User";

export class INVITE_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INVITE_DELETE", (packet) => {
      void (async (packet) => {
        // let [cacheGuild, cacheChannel, cacheInvite] = await Promise.all([
        //   await getCacheGuild(this.client, <Snowflake>packet.guild_id),
        //   await getCacheChannel(this.client, <Snowflake>packet.guild_id, <Snowflake>packet.channel_id),
        //   await getCacheInvite(this.client, <Snowflake>packet.guild_id, <string>packet.code),
        // ]);
        // let cacheInviter;
        // if (!cacheGuild || !cacheChannel) return;
        // if (cacheInvite) {
        //   cacheInviter = await getCacheGuildMember(this.client, <Snowflake>packet.guild_id, cacheInvite?.inviter.id);
        // } else
        //   cacheInvite = {
        //     code: packet.code,
        //   };
        // const cacheInviter = await getCacheGuildMember(this.client, <Snowflake>packet.guild_id, cacheInvite?.inviter.id);
        // if (!cacheInviter?.user) return;
        // await this.client.cache.del(`guild:${<string>packet.guild_id}:invite:${<string>packet.code}`);
        // this.client.emit(
        //   "inviteDelete",
        //   new Invite(
        //     cacheInvite,
        //     new Guild(this.client, cacheGuild),
        //     new Channel(this.client, cacheChannel),
        //     new User(this.client, cacheInviter.user)
        //   )
        // );
      })(packet);
    });
  }
}
