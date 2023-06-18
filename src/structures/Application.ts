import { type DiscordAPIApplication, type Snowflake } from '@fawkes.js/api-types';
import { type Client } from '../Client';
import { CommandHub } from '../hubs/CommandHub';

export interface ClientUser {
  id: Snowflake
}
export class Application {
  id: string;
  commands: CommandHub;
  client: ClientUser;
  constructor (client: Client, application: DiscordAPIApplication) {
    this.id = application.id;

    this.commands = new CommandHub(client);

    this.client = {
      id: application.id
    };
  }
}
