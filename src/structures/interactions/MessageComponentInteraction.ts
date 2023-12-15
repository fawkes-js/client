import { Routes, DiscordAPIMessageComponentType, type DiscordAPIMessageComponentInteraction } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { BaseInteraction } from "./BaseInteraction";
import { type CacheGuild } from "../../messaging/structures/CacheGuild";
import { type CacheChannel } from "../../messaging/structures/CacheChannel";

export class MessageComponentInteraction extends BaseInteraction {
  data: any;
  componentType: any;
  componentId: string | undefined;
  constructor(client: Client, interaction: DiscordAPIMessageComponentInteraction, guild: CacheGuild, channel: CacheChannel) {
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
