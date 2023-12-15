import { Routes } from "@fawkes.js/typings";
import { type Client } from "../Client";
import { GuildMemberRoleHub } from "../hubs/GuildMemberRoleHub";
import { Guild } from "./Guild";
import { User } from "./User";
import { type Role } from "./Role";
import { type CacheGuild } from "../messaging/structures/CacheGuild";
import { type CacheGuildMember } from "../messaging/structures/CacheGuildMember";
import { type CacheUser } from "../messaging/structures/CacheUser";

export class GuildMember {
  client!: Client;
  user: User;
  roles: GuildMemberRoleHub;
  guild: Guild;
  constructor(client: Client, guild: CacheGuild, member: CacheGuildMember) {
    Object.defineProperty(this, "client", { value: client });

    this.guild = new Guild(client, guild);

    this.user = new User(client, <CacheUser>member.user);

    this.roles = new GuildMemberRoleHub(client, guild, member);
  }

  async ban(): Promise<void> {
    await this.client.rest.request(Routes.createGuildBan(this.guild.id, this.user.id));

    // const cachedGuild = await this.client.cache.get("guild:" + this.guild.id);

    // cachedGuild.members = cachedGuild.members.filter((member: any) => {
    //   return member.user.id !== this.user.id;
    // });

    // await this.client.cache.set("guild:" + this.guild.id, cachedGuild);

    await this.client.cache.del(`guild:${this.guild.id}:member:${this.user.id}`);
  }

  kick(): void {}

  async bannable(): Promise<any> {
    if (!this.manageable()) return false;

    if ((await this.roles.highest()) === null && (<Role>await (await this.guild.members.me())?.roles.highest()).position !== null)
      return true;
    else if ((await this.roles.highest()) === null && (<Role>await (await this.guild.members.me())?.roles.highest()).position === null)
      return false;
    else if ((<Role>await this.roles.highest()).position < (<Role>await (await this.guild.members.me())?.roles.highest()).position)
      return true;
    else return false;
  }

  manageable(): boolean {
    if (this.user.id === this.guild.owner?.id) return false;
    if (this.user.id === this.client.application?.client.id) return false;
    else return true;
  }

  async dbMember(): Promise<object | undefined> {
    if (this.client.db) return this.client.db.getGuildMember(this.user.id, this.guild.id);
  }

  async dbUser(): Promise<object | undefined> {
    if (this.client.db) return this.client.db.getUser(this.user.id);
  }

  async dbGuild(): Promise<object | undefined> {
    if (this.client.db) return this.client.db.getGuild(this.guild.id);
  }
}
