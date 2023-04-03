import { DiscordAPIGuild, DiscordAPIGuildMember, DiscordAPIRole, Routes } from "@fawkes.js/api-types";
import { Client } from "../Client";
import { Role } from "../structures/Role";
import { addRole, removeRole } from "../utils/Role";

export class GuildMemberRoleHub {
  guild: DiscordAPIGuild;
  member: DiscordAPIGuildMember;
  client!: Client;
  constructor(client: Client, guild: DiscordAPIGuild, member: DiscordAPIGuildMember) {
    Object.defineProperty(this, 'client', { value: client });


    this.guild = guild;

    this.member = member;
  }

  async get(roleId?: string) {
    const memberRoles = (await this.client.cache.get('guild:' + this.guild.id)).members.find((member: DiscordAPIGuildMember) => member.user?.id === this.member.user?.id).roles

    if (roleId) {
      const role = this.guild.roles.find((role) => role.id === roleId);

      if (!role) return null;
      if (!memberRoles.includes(role.id)) return;
      else return new Role(role);
    } else {
      const roles: Role[] = [];

      this.guild.roles.map((role) => {
        if (!memberRoles.includes(role.id)) return;

        roles.push(new Role(role))
      });
      return roles;
    }
  }

  async add(roleId: string) {
    const role = this.guild.roles.find((role) => role.id === roleId);
    if (!role) {
      // Throw an error!
      console.log("invalid role id");
      return;
    }
    await this.client.rest.request(Routes.addMemberRole(this.guild.id, <string>this.member.user?.id, roleId));

    addRole(this.client, this.guild.id, <string>this.member.user?.id, role)

    return new Role(role);
  }

  async remove(roleId: string) {
    const role = this.guild.roles.find((role) => role.id === roleId);
    if (!role) {
      // Throw an error!
      console.log("invalid role id");
      return;
    }

    const res = await this.client.rest.request(Routes.removeMemberRole(this.guild.id, <string>this.member.user?.id, roleId));

    removeRole(this.client, this.guild.id, <string>this.member.user?.id, role)

    return new Role(role)
  }

  async highest() {
    let highest: DiscordAPIRole | null = null;

    (<Role[]>await this.get())!.map((role) => {
      const guildRole = this.guild.roles.find((guildRole) => guildRole.id === role.id)
      if (!guildRole) return;
      if (highest === null || guildRole.position > highest!.position) highest = guildRole
    })
    if (!highest) return null;

    return new Role(highest)
  }
}
