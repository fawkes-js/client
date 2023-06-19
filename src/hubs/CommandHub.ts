import { Routes, type DiscordAPICommandOptionType } from "@fawkes.js/typings";
import { type Client } from "../Client";

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
    function deepEqual(x, y): boolean {
      const ok = Object.keys;
      const tx = typeof x;
      const ty = typeof y;
      return x && y && tx === "object" && tx === ty
        ? ok(x).length === ok(y).length && ok(x).every((key) => deepEqual(x[key], y[key]))
        : x === y;
    }
    const createCommand = async (): Promise<void> => {
      const command = await this.client.rest.request(Routes.createApplicationCommand(this.client.application?.id), options);
      void this.client.cache.set(`command:${options.name}`, {
        id: command.id,
        options,
      });
    };
    const cachedCommand = await this.client.cache.get(`command:${options.name}`);
    if (cachedCommand) {
      if (!deepEqual(cachedCommand.options, options)) void createCommand();
      else void createCommand();
    }
  }

  delete(): void {}
}
