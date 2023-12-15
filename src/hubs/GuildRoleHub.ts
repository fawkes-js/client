import { type DiscordAPIGuildMember, Routes, type DiscordAPIRole } from "@fawkes.js/typings";
import { type Client } from "../Client";
import { Role } from "../structures/Role";
import { type Emoji } from "../structures/Emoji";
import { type CacheGuild } from "../messaging/structures/CacheGuild";
import { CacheRole } from "../messaging/structures/CacheRole";

export interface RoleOptions {
  name: string;
  permissions: string;
  color: any;
  hoist: boolean;
  icon: string;
  emoji: string | Emoji;
  mentionable: boolean;
}

export class GuildRoleHub {
  guild: CacheGuild;
  member: DiscordAPIGuildMember;
  client!: Client;
  constructor(client: Client, guild: CacheGuild) {
    Object.defineProperty(this, "client", { value: client });

    Object.defineProperty(this, "guild", { value: guild });
  }

  async fetch(id?: string): Promise<Role[] | Role | null> {
    const cacheGuild = await this.client.cache.get(`guild:${this.guild.id}`);

    let rawRoles;
    if (cacheGuild.roles) rawRoles = cacheGuild.roles;
    else rawRoles = await this.client.rest.request(Routes.getGuildRoles(this.guild.id));

    const roles: Role[] = [];

    if (!id) {
      rawRoles.map((rawRole: DiscordAPIRole) => roles.push(new Role(new CacheRole(rawRole))));
      return roles;
    } else {
      const rawRole = rawRoles.find((rawRole: DiscordAPIRole) => rawRole.id === id);
      if (rawRole) return new Role(rawRole);
      else return null;
    }
  }

  async create(options: RoleOptions): Promise<Role | null> {
    const data = { ...options };

    if (options.color) data.color = parseInt(options.color.replace("#", ""), 16);
    const role = await this.client.rest.request(Routes.createGuildRole(this.guild.id), data);

    const cacheGuild = await this.client.cache.get(`guild:${this.guild.id}`);

    cacheGuild.roles.push(role);
    await this.client.cache.set(`guild:${this.guild.id}`, cacheGuild);

    if (role) return new Role(role);
    else {
      console.log("need to throw an error");
      return null;
    }
  }

  async delete(id: string): Promise<null> {
    await this.client.rest.request(Routes.deleteGuildRole(this.guild.id, id));
    return null;
  }

  async update(id: string, data: RoleOptions): Promise<Role | null> {
    const role = await this.client.rest.request(Routes.updateGuildRole(this.guild.id, id), data);

    if (role) return new Role(role);
    else {
      console.log("need to throw an error");
      return null;
    }
  }
}
