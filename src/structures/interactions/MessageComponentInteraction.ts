import {
  Routes,
  type DiscordAPIButtonComponentButtonStyleType,
  type DiscordAPIEmoji,
  type DiscordAPIGuild,
  DiscordAPIMessageComponentType,
  type DiscordAPIMessageComponentEmoji,
  type DiscordAPIChannel,
  type DiscordAPIMessageComponentInteraction,
} from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { type Embed } from "./../APIEmbed";
import { BaseInteraction } from "./BaseInteraction";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Attachment {}

interface ButtonComponent {
  type: 2;
  style: DiscordAPIButtonComponentButtonStyleType;
  label?: string;
  emoji?: DiscordAPIEmoji;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

interface StringSelectComponentOption {
  label: string;
  value: string;
  description?: string;
  emoji?: DiscordAPIMessageComponentEmoji;
}
interface StringSelectComponent {
  type: DiscordAPIMessageComponentType.StringSelect;
  custom_id: string;
  options: StringSelectComponentOption[];
}

interface TextInputComponent {
  type: DiscordAPIMessageComponentType.TextInput;
}

interface UserSelectComponent {
  type: DiscordAPIMessageComponentType.UserSelect;
}

interface RoleSelectComponent {
  type: DiscordAPIMessageComponentType.RoleSelect;
}

interface MentionableSelectComponent {
  type: DiscordAPIMessageComponentType.MentionableSelect;
}

interface ChannelSelectComponent {
  type: DiscordAPIMessageComponentType.ChannelSelect;
}

interface ActionRowComponent {
  type: DiscordAPIMessageComponentType.ActionRow;
  components: Array<
    | ButtonComponent
    | StringSelectComponent
    | TextInputComponent
    | UserSelectComponent
    | RoleSelectComponent
    | MentionableSelectComponent
    | ChannelSelectComponent
  >;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface InteractionResponseOptions {
  content?: string;
  embeds?: Embed[];
  attachments?: Attachment[];
  fetchReply?: boolean;
  components?: ActionRowComponent[];
}

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
