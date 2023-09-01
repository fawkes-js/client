import { type DiscordAPIChannel, type DiscordAPIGuild, type DiscordAPIApplicationCommandInteraction } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CommandInteraction } from "./CommandInteraction";

export class MessageCommandInteraction extends CommandInteraction {
  constructor(
    client: Client,
    interaction: DiscordAPIApplicationCommandInteraction,
    guild: DiscordAPIGuild,
    channel: DiscordAPIChannel
  ) {
    super(client, interaction, guild, channel);
  }
}
