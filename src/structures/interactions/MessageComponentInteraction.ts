import {
  Routes,
  type DiscordAPIGuild,
  DiscordAPIMessageComponentType,
  type DiscordAPIChannel,
  type DiscordAPIMessageComponentInteraction,
} from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { BaseInteraction } from "./BaseInteraction";

export class MessageComponentInteraction extends BaseInteraction {
  data: any;
  componentType: any;
  componentId: string | undefined;
  constructor(client: Client, interaction: DiscordAPIMessageComponentInteraction, guild: DiscordAPIGuild, channel: DiscordAPIChannel) {
    super(client, interaction, guild, channel);
    this.data = interaction.data;

    this.componentType = interaction.data?.component_type;

    this.componentId = interaction.data?.custom_id;
  }

  async deferUpdate(): Promise<void> {
    await this.client.rest.request(Routes.interactionCallback(this.id, this.token), { type: 6 });
  }

  isButton(): true | false {
    if (this.componentType === DiscordAPIMessageComponentType.Button) return true;
    else return false;
  }
}
