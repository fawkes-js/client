import { type DiscordAPIInteraction, DiscordAPIInteractionType, type DiscordAPIGuild } from "@fawkes.js/api-types";
import { type Client } from "../../Client";
import { ChatInputCommandInteraction } from "../../structures/ChatInputCommandInteraction";
import { MessageComponentInteraction } from "../../structures/MessageComponentInteraction";

export type Interaction = ChatInputCommandInteraction | MessageComponentInteraction;

export class INTERACTION_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INTERACTION_CREATE", (packet) => {
      void (async (packet: DiscordAPIInteraction) => {
        let interaction!: Interaction;

        const guild: DiscordAPIGuild =
          packet.guild_id !== null ? await this.client.cache.get("guild:" + <string>packet.guild_id) : null;

        switch (packet.type) {
          case DiscordAPIInteractionType.ApplicationCommand:
            interaction = new ChatInputCommandInteraction(this.client, packet, guild);
            break;
          case DiscordAPIInteractionType.MessageComponent:
            interaction = new MessageComponentInteraction(this.client, packet, guild);
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
