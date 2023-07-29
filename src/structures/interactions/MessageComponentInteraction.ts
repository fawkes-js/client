import {
  Routes,
  type DiscordAPIButtonComponentButtonStyleType,
  type DiscordAPIEmoji,
  type DiscordAPIGuild,
  type DiscordAPIInteraction,
  type DiscordAPIMessageComponentType,
  type DiscordAPIMessageComponentEmoji,
  type DiscordAPIChannel,
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
  interaction: DiscordAPIInteraction;
  constructor(client: Client, interaction: DiscordAPIInteraction, guild: DiscordAPIGuild, channel: DiscordAPIChannel) {
    super(client, interaction, guild, channel);
    // this.interaction = interaction;
  }

  getData(): any {
    console.log("LETS GET DATA!");
    // console.log(this.interaction);
  }

  async deferUpdate(): Promise<void> {
    await this.client.rest.request(Routes.interactionCallback(this.id, this.token), { type: 6 });
  }
}
