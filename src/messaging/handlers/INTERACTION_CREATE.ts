import {
  type DiscordAPIInteraction,
  DiscordAPIInteractionType,
  type DiscordAPIGuild,
  DiscordAPIApplicationCommandType,
} from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { ChatInputCommandInteraction } from "../../structures/interactions/ChatInputCommandInteraction";
import { MessageComponentInteraction } from "../../structures/interactions/MessageComponentInteraction";
import { UserCommandInteraction } from "../../structures/interactions/UserCommandInteraction";
import { MessageCommandInteraction } from "../../structures/interactions/MessageCommandInteraction";
import { type BaseInteraction } from "../../structures/interactions/BaseInteraction";

export type Interaction = ChatInputCommandInteraction | MessageComponentInteraction;

export class INTERACTION_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INTERACTION_CREATE", (packet) => {
      void (async (packet: DiscordAPIInteraction) => {
        let interaction!: BaseInteraction;

        const guild: DiscordAPIGuild =
          packet.guild_id !== null ? await this.client.cache.get("guild:" + <string>packet.guild_id) : null;

        const channel = guild.channels.find((channel) => channel.id === packet.channel_id);

        if (!channel) return; // THROW AN ERROR

        switch (packet.type) {
          case DiscordAPIInteractionType.ApplicationCommand:
            if (packet.data?.type === DiscordAPIApplicationCommandType.ChatInput)
              interaction = new ChatInputCommandInteraction(this.client, packet, guild, channel);
            else if (packet.data?.type === DiscordAPIApplicationCommandType.Message) {
              interaction = new MessageCommandInteraction(this.client, packet, guild, channel);
            } else if (packet.data?.type === DiscordAPIApplicationCommandType.User)
              interaction = new UserCommandInteraction(this.client, packet, guild, channel);
            break;
          case DiscordAPIInteractionType.MessageComponent:
            interaction = new MessageComponentInteraction(this.client, packet, guild, channel);
            break;
          case DiscordAPIInteractionType.ApplicationCommandAutocomplete:
            break;

          case DiscordAPIInteractionType.ModalSubmit:
            break;
          case DiscordAPIInteractionType.Ping:
            break;
        }
        this.client.emit("interactionCreate", interaction);
      })(packet);
    });
  }
}
