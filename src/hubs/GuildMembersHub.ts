import { DiscordAPIGuild, DiscordAPIGuildMember, Snowflake } from "@fawkes.js/api-types";
import { Client } from "../Client";
import { Guild } from "../structures/Guild";
import { GuildMember } from "../structures/GuildMember";

export class GuildMembersHub {
  client!: Client;
  guild: DiscordAPIGuild
  constructor(client: Client, guild: DiscordAPIGuild) {
    Object.defineProperty(this, 'client', { value: client });


    this.guild = guild;
  }

  async fetch(id: Snowflake) {
    const cachedGuild = await this.client.cache.get('guild:' + this.guild.id);
    const member = cachedGuild.members.find((member: DiscordAPIGuildMember) => member.user?.id === id);
    if (member) return new GuildMember(this.client, this.guild, member)
    else return null;
  }

  async me() {
    return await this.fetch(this.client.application.client.id)
  }
}
