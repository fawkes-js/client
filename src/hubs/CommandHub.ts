import { Routes } from "@fawkes.js/api-types";
import { DiscordAPICommandOptionType } from "@fawkes.js/api-types";
import { Client } from "../Client";


type CommandOption = {
  name: string;
  description: string;
  type: DiscordAPICommandOptionType
  required: boolean;
}
type CommandOptions2 = {
  name: string;
  description: string;
  options?: CommandOption[];
};

export class CommandHub {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  create(options: CommandOptions2) {
    return this.client.rest.request(Routes.createApplicationCommand(this.client.application.id), options);
  }

  delete() { }
}
