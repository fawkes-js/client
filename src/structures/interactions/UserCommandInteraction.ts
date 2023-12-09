import { type DiscordAPIApplicationCommandInteraction } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { CommandInteraction } from "./CommandInteraction";
import { type CacheGuild } from "../../messaging/structures/CacheGuild";
import { type CacheChannel } from "../../messaging/structures/CacheChannel";

export class UserCommandInteraction extends CommandInteraction {
  constructor(client: Client, interaction: DiscordAPIApplicationCommandInteraction, guild: CacheGuild, channel: CacheChannel) {
    super(client, interaction, guild, channel);
  }
}
