import { type DiscordAPIUser } from "@fawkes.js/typings";
import { type Client } from "../Client";

export class User {
  client: Client;
  id: string;
  username: string;
  discriminator: string;
  iconHash: string | null;
  constructor(client: Client, user: DiscordAPIUser) {
    Object.defineProperty(this, "client", { value: client });

    this.id = user.id;

    this.username = user.username;

    this.discriminator = user.discriminator;

    this.iconHash = user.avatar;
  }

  iconURL(): string | null {
    if (this.id === undefined) return null;
    if (this.iconHash === null) return null;

    return `http://cdn.discordapp.com/avatars/${this.id}/${this.iconHash}`;
  }

  async dbUser(): Promise<object | null> {
    if (this.client.db) return this.client.db.getUser(this.id);
    else return null;
  }
}
