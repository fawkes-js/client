import {
  type DiscordAPIBaseInteraction,
  DiscordAPIInteractionType,
  type DiscordAPIGuild,
  DiscordAPIApplicationCommandType,
  type DiscordAPIApplicationCommandInteraction,
  type DiscordAPIMessageComponentInteraction,
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
      void (async (packet: DiscordAPIBaseInteraction<DiscordAPIInteractionType, unknown>) => {
        this.client.db.updateGuildMember(packet.member ? packet.member?.user?.id : packet.user?.id, packet.guild_id);
        this.client.db.updateUser(packet.member ? packet.member?.user?.id : packet.user?.id);

        let interaction!: BaseInteraction;

        const guild: DiscordAPIGuild =
          packet.guild_id !== null ? await this.client.cache.get("guild:" + <string>packet.guild_id) : null;

        const channel = guild.channels.find((channel) => channel.id === packet.channel_id);

        if (!channel) return; // THROW AN ERROR

        switch (packet.type) {
          case DiscordAPIInteractionType.ApplicationCommand:
            // eslint-disable-next-line no-case-declarations
            const commandPacket = <DiscordAPIApplicationCommandInteraction>packet;

            if (commandPacket.data?.type === DiscordAPIApplicationCommandType.ChatInput)
              interaction = new ChatInputCommandInteraction(this.client, commandPacket, guild, channel);
            else if (commandPacket.data?.type === DiscordAPIApplicationCommandType.Message) {
              interaction = new MessageCommandInteraction(this.client, commandPacket, guild, channel);
            } else if (commandPacket.data?.type === DiscordAPIApplicationCommandType.User)
              interaction = new UserCommandInteraction(this.client, commandPacket, guild, channel);
            break;
          case DiscordAPIInteractionType.MessageComponent:
            // eslint-disable-next-line no-case-declarations
            const componentPacket = <DiscordAPIMessageComponentInteraction>packet;
            interaction = new MessageComponentInteraction(this.client, componentPacket, guild, channel);
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
