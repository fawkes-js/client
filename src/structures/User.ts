import { type DiscordAPIUser } from '@fawkes.js/api-types';

export class User {
  id: string;
  username: string;
  discriminator: string;
  iconHash: string | null;
  constructor (user: DiscordAPIUser) {
    this.id = user.id;

    this.username = user.username;

    this.discriminator = user.discriminator;

    this.iconHash = user.avatar;
  }

  iconURL (): string | null {
    if (this.id === undefined) return null;
    if (this.iconHash === null) return null;

    return `http://cdn.discordapp.com/avatars/${this.id}/${ this.iconHash}`;
  }
}
