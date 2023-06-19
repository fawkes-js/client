import { type DiscordAPIGuild, type DiscordAPIGuildMember } from "@fawkes.js/typings";
import { type Client } from "../Client";
// import { Role } from '../structures/Role'

export class GuildRoleHub {
  guild: DiscordAPIGuild;
  member: DiscordAPIGuildMember;
  client!: Client;
  constructor(client: Client, guild: DiscordAPIGuild) {
    Object.defineProperty(this, "client", { value: client });

    this.guild = guild;
  }
}
