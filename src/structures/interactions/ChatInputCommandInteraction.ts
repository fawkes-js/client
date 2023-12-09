import { DiscordAPICommandOptionType, type DiscordAPIApplicationCommandInteraction } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { type User } from "../User";
import { CommandInteraction } from "./CommandInteraction";
import { type CacheGuild } from "../../messaging/structures/CacheGuild";
import { type CacheChannel } from "../../messaging/structures/CacheChannel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export class ChatInputCommandInteraction extends CommandInteraction {
  command: string;
  options: any[];
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(client: Client, interaction: DiscordAPIApplicationCommandInteraction, guild: CacheGuild, channel: CacheChannel) {
    super(client, interaction, guild, channel);
  }

  getUser(): User[] {
    const users: any[] = [];

    this.options.forEach((option): void => {
      if (option.type === DiscordAPICommandOptionType.User) users.push(option.data);
    });
    return users;
  }

  getOption(name: string): void {}
}
