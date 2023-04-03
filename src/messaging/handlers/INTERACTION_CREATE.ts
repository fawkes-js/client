import { DiscordAPIGuild, DiscordAPIGuildMember, DiscordAPIInteraction, DiscordAPIInteractionType, Routes } from "@fawkes.js/api-types";
import { Client } from "../../Client";
import { ChatInputCommandInteraction } from "../../structures/ChatInputCommandInteraction";
import { MessageComponentInteraction } from "../../structures/MessageComponentInteraction";


export type Interaction =
  ChatInputCommandInteraction |
  MessageComponentInteraction


export class INTERACTION_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  initialize() {
    this.client.on("INTERACTION_CREATE", async (packet: DiscordAPIInteraction) => {
      const guild: DiscordAPIGuild = packet.guild_id ? await this.client.cache.get('guild:' + packet.guild_id) : null

      console.log('GUILD:', guild)
      const channel = guild.channels.find((channel) => channel.id === packet.channel_id);



      let interaction!: Interaction;
      switch (packet.type) {
        case DiscordAPIInteractionType.ApplicationCommand:
          interaction = new ChatInputCommandInteraction(this.client, {
            interaction: packet,
            member: packet.member ? packet.member : null,
            user: packet.user ? packet.user : null,
            guild: guild,
          });
          break;
        case DiscordAPIInteractionType.MessageComponent:
          interaction = new MessageComponentInteraction(this.client, {
            interaction: packet,
            member: packet.member ? packet.member : null,
            user: packet.user ? packet.user : null,
            guild: guild,
          })
          break;
        case DiscordAPIInteractionType.ApplicationCommandAutocomplete:
          break;

        case DiscordAPIInteractionType.ModalSubmit:
          break;
        case DiscordAPIInteractionType.Ping:
          break;
      }
      this.client.emit("interactionCreate", interaction);
    });
  }
}
