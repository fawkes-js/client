import { type DiscordAPIChannel, type DiscordAPIGuild, type DiscordAPIInteraction } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CommandInteraction } from "./CommandInteraction";

export class UserCommandInteraction extends CommandInteraction {
  constructor(client: Client, interaction: DiscordAPIInteraction, guild: DiscordAPIGuild, channel: DiscordAPIChannel) {
    super(client, interaction, guild, channel);
  }
}
