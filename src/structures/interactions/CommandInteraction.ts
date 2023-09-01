import {
  DiscordAPICommandOptionType,
  type DiscordAPIChannel,
  type DiscordAPIGuild,
  type DiscordAPIApplicationCommandInteraction,
  type DiscordAPIApplicationCommandInteractionDataOption,
  type DiscordAPIMessageComponentType,
  type DiscordAPIButtonComponentButtonStyleType,
  type DiscordAPIEmoji,
  Routes,
  DiscordAPIInteractionCallbackType,
  RequestMethod,
} from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { BaseInteraction } from "./BaseInteraction";
import { User } from "../User";
import { APIEmbed, type Embed } from "../APIEmbed";
import { Message } from "../Message";

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
  emoji?: any;
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

export interface ActionRowComponent {
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

interface InteractionResponseOptions {
  content?: string;
  embeds?: Embed[];
  attachments?: Attachment[];
  fetchReply?: boolean;
  components?: ActionRowComponent[];
  ephemeral?: boolean;
}

export interface InteractionResponseEditOptions {
  maintainDefaults: true;
}
function optionsResolver(
  client: Client,
  interactionOptions: DiscordAPIApplicationCommandInteractionDataOption[],
  guild: DiscordAPIGuild
): any[] {
  const options: any[] = [];

  if (interactionOptions != null) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    interactionOptions.forEach(async (option) => {
      switch (option.type) {
        case DiscordAPICommandOptionType.SubCommand:
          break;
        case DiscordAPICommandOptionType.SubCommandGroup:
          break;
        case DiscordAPICommandOptionType.String:
          options.push({
            name: option.name,
            data: option.value,
            type: option.type,
          });
          break;
        case DiscordAPICommandOptionType.Integer:
          break;
        case DiscordAPICommandOptionType.Boolean:
          break;
        case DiscordAPICommandOptionType.User:
          // eslint-disable-next-line no-case-declarations
          const member = guild.members.find((m) => m.user?.id === option.value);

          if (member?.user)
            options.push({
              name: option.name,
              data: new User(client, member.user),
              type: option.type,
            });
          break;
        case DiscordAPICommandOptionType.Channel:
          break;
        case DiscordAPICommandOptionType.Role:
          break;
        case DiscordAPICommandOptionType.Mentionable:
          break;
        case DiscordAPICommandOptionType.Number:
          break;
        case DiscordAPICommandOptionType.Attachment:
          break;
      }
    });
  }
  return options;
}

export class CommandInteraction extends BaseInteraction {
  commandId: string | undefined;
  commandName: string | undefined;
  commandType: number | undefined;
  options: any[] | [];
  deferred: boolean;
  replied: boolean;
  private _response: undefined | InteractionResponseOptions;
  constructor(
    client: Client,
    interaction: DiscordAPIApplicationCommandInteraction,
    guild: DiscordAPIGuild,
    channel: DiscordAPIChannel
  ) {
    super(client, interaction, guild, channel);

    this.commandId = interaction.data?.id;

    this.commandName = interaction.data?.name;

    this.commandType = interaction.data?.type;

    this.options = interaction.data?.options ? optionsResolver(client, interaction.data.options, guild) : [];

    this.deferred = false;

    this.replied = false;

    this._response = undefined;
  }

  async reply<T extends InteractionResponseOptions>(data: T): Promise<T["fetchReply"] extends true ? Message : null> {
    if (this.replied || this.deferred)
      console.log("need to throw an error here... but this has already been replied too or deferred!");

    this._response = data;

    let flags = 0;
    if (data.ephemeral) flags = (1 << 6) | flags;

    const embeds: APIEmbed[] = [];

    data.embeds?.forEach((embed) => embeds.push(new APIEmbed(embed)));
    await this.client.rest.request(Routes.interactionCallback(this.id, this.token), {
      type: DiscordAPIInteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: data.content ?? "",
        embeds: embeds ?? [],
        components: data.components ?? [],
        attachments: data.attachments ?? [],
        flags,
      },
    });

    this.replied = true;

    if (data.fetchReply) return <any>await this.fetchReply();
    else return <any>null;
  }

  async deferReply(): Promise<any> {
    if (this.replied || this.deferred)
      console.log("need to throw an error here... but this has already been replied too or deferred!");

    await this.client.rest.request(Routes.interactionCallback(this.id, this.token), {
      type: DiscordAPIInteractionCallbackType.DeferredChannelMessageWithSource,
    });

    this.deferred = true;
  }

  async fetchReply(): Promise<Message | undefined> {
    if (!this.replied) {
      console.log("need to throw an error");
      return;
    }

    const reply = await this.client.rest.request(
      Routes.webhookMessage(this.applicationId, this.token, "@original", RequestMethod.Get)
    );

    return new Message(this.client, reply);
  }

  async editReply(data: InteractionResponseOptions, options?: InteractionResponseEditOptions): Promise<any> {
    const reply = await this.client.rest.request(
      Routes.webhookMessage(this.applicationId, this.token, "@original", RequestMethod.Patch),
      data
    );

    return new Message(this.client, reply);
  }

  async deleteReply(): Promise<void> {
    await this.client.rest.request(Routes.webhookMessage(this.applicationId, this.token, "@original", RequestMethod.Delete));
  }

  async followUp(): Promise<Message> {
    const res = await this.client.rest.request(Routes.webhook(this.applicationId, this.token), { content: "hi" });
    return new Message(this.client, res);
  }

  // async deferUpdate(): Promise<void> {}

  // update() {}
}
