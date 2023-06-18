import { Routes, type DiscordAPICommandOptionType } from '@fawkes.js/api-types';
import { type Client } from '../Client';

interface CommandOption {
  name: string;
  description: string;
  type: DiscordAPICommandOptionType;
  required: boolean;
}
interface CommandOptions2 {
  name: string;
  description: string;
  options?: CommandOption[];
}

export class CommandHub {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  async create(options: CommandOptions2): Promise<void> {
    function deepEqual(x, y) {
      const ok = Object.keys,
        tx = typeof x,
        ty = typeof y;
      return x && y && tx === 'object' && tx === ty
        ? ok(x).length === ok(y).length &&
            ok(x).every((key) => deepEqual(x[key], y[key]))
        : x === y;
    }
    const createCommand = async () => {
      const command = await this.client.rest.request(
        Routes.createApplicationCommand(<string>this.client.application?.id),
        options
      );
      this.client.cache.set(`command:${options.name}`, {
        id: command.id,
        options: options,
      });
    };
    const cachedCommand = await this.client.cache.get(
      `command:${options.name}`
    );
    if (cachedCommand) {
      if (deepEqual(cachedCommand.options, options)) {
        return;
      } else {
        createCommand();
      }
    } else {
      createCommand();
    }

    // const command = await this.client.rest.request(
    //   Routes.createApplicationCommand(<string>this.client.application?.id),
    //   options
    // );
  }

  delete(): void {}
}
