import { type DiscordAPIGuild } from '@fawkes.js/api-types';
import { type Client } from '../../Client';

export class GUILD_CREATE {
  client: Client;
  constructor (client: Client) {
    this.client = client;
  }

  initialize (): void {
    this.client.on('APPLICATION_COMMAND_PERMISSIONS_UPDATE', (packet) => {
      void (async (packet: DiscordAPIGuild) => {
        this.client.emit('applicationCommandPermissionsUpdate', packet);
      }
      )(packet);
    });
  }
}
