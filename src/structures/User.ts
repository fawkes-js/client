import { DiscordAPIUser } from "@fawkes.js/api-types";

export class User {
  id: string;
  username: string;
  discriminator: string;
  iconHash: string | null;
  constructor(user: DiscordAPIUser) {
    this.id = user.id;

    this.username = user.username;

    this.discriminator = user.discriminator;

    this.iconHash = user.avatar
  }

  iconURL() {

    if (!this.id) return null
    if (!this.iconHash) return null;

    return `http://cdn.discordapp.com/avatars/${this.id}/${this.iconHash}`
  }
}
