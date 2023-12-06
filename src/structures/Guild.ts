import { type DiscordAPIGuild } from "@fawkes.js/typings";
import { type Client } from "../Client";
import { ChannelHub } from "../hubs/ChannelHub";
import { GuildMembersHub } from "../hubs/GuildMembersHub";
import { GuildRoleHub } from "../hubs/GuildRoleHub";
import { type User } from "./User";

export class Guild {
  channels: ChannelHub;
  members: GuildMembersHub;
  roles: any;
  id: string;
  name: string;
  description: string | null;
  client!: Client;
  owner: User | null;
  afkTimeout: number;
  verificationLevel: number;
  constructor(client: Client, guild: DiscordAPIGuild) {
    Object.defineProperty(this, "client", { value: client });

    this.id = guild.id;

    this.name = guild.name;

    this.description = guild.description;

    this.afkTimeout = guild.afk_timeout;

    this.verificationLevel = guild.verification_level;

    this.channels = new ChannelHub(this.client, this);

    this.members = new GuildMembersHub(this.client, guild);

    this.roles = new GuildRoleHub(client, guild);
  }

  leave(): void {}

  async dbGuild(): Promise<object | undefined> {
    if (this.client.db) return this.client.db.getGuild(this.id);
  }
}
