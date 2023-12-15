import { type DiscordAPIGuildMember, type DiscordAPIRole, Routes } from "@fawkes.js/typings";
import { type Client } from "../Client";
import { Role } from "../structures/Role";
import { addRole, removeRole } from "../utils/Role";
import { Guild } from "../structures/Guild";
import { type CacheGuild } from "../messaging/structures/CacheGuild";
import { type CacheGuildMember } from "../messaging/structures/CacheGuildMember";

export class GuildMemberRoleHub {
  guild: Guild;
  private readonly member: CacheGuildMember;
  client!: Client;

  constructor(client: Client, guild: CacheGuild, member: CacheGuildMember) {
    Object.defineProperty(this, "client", { value: client });

    this.guild = new Guild(client, guild);

    Object.defineProperty(this, "member", { value: member });
  }

  async get(roleId?: string): Promise<Role[] | null> {
    const memberRoles = (await this.client.cache.get("guild:" + this.guild.id)).members.find(
      (member: DiscordAPIGuildMember) => member.user?.id === this.member.user?.id
    ).roles;

    if (roleId != null) {
      const role = this.guild.roles.find((role) => role.id === roleId);

      if (role == null) return null;
      if (memberRoles.includes(role.id) === false) return null;
      else return [new Role(role)];
    } else {
      const roles: Role[] = [];

      this.guild.roles.forEach((role): null | undefined => {
        if (memberRoles.includes(role.id) === null) return null;

        roles.push(new Role(role));
      });
      return roles;
    }
  }

  async add(roleId: string): Promise<Role | null> {
    const cacheGuild = await this.client.cache.get(`guild:${this.guild.id}`);

    const role = cacheGuild.roles.find((role) => role.id === roleId);

    if (role == null) {
      // Throw an error!
      console.log("invalid role id");
      return null;
    }
    await this.client.rest.request(Routes.addMemberRole(this.guild.id, <string>this.member.user?.id, roleId));

    await addRole(this.client, this.guild.id, <string>this.member.user?.id, role);

    return new Role(role);
  }

  async remove(roleId: string): Promise<Role | null> {
    const role = this.guild.roles.find((role) => role.id === roleId);
    if (role == null) {
      // Throw an error!
      console.log("invalid role id");
      return null;
    }

    await this.client.rest.request(Routes.removeMemberRole(this.guild.id, <string>this.member.user?.id, roleId));

    await removeRole(this.client, this.guild.id, <string>this.member.user?.id, role);

    return new Role(role);
  }

  async highest(): Promise<Role | null> {
    let highest: DiscordAPIRole | null = null;

    (await this.get())?.forEach((role): any => {
      const guildRole = this.guild.roles.find((guildRole) => guildRole.id === role.id);
      if (guildRole == null) return;
      if (highest === null || guildRole.position > highest.position) highest = guildRole;
    });
    if (highest === null) return null;

    return new Role(highest);
  }
}
