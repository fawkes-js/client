import {
  type DiscordAPIBaseInteraction,
  DiscordAPIInteractionType,
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
import { getCacheChannel, getCacheGuild } from "../../utils/CacheUpdate";
import { type CacheGuild } from "../structures/CacheGuild";
import { type CacheChannel } from "../structures/CacheChannel";

export type Interaction = ChatInputCommandInteraction | MessageComponentInteraction;

export class INTERACTION_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INTERACTION_CREATE", (packet) => {
      console.log("Interaction Create Handler Start", Date.now());
      void (async (packet: DiscordAPIBaseInteraction<DiscordAPIInteractionType, unknown>) => {
        if (this.client.db)
          this.client.db.updateGuildMember(packet.member ? packet.member?.user?.id : packet.user?.id, packet.guild_id);
        if (this.client.db) this.client.db.updateUser(packet.member ? packet.member?.user?.id : packet.user?.id);

        let interaction!: BaseInteraction;

        const cacheGuild: CacheGuild | null = await getCacheGuild(this.client, <string>packet.guild_id);
        if (!cacheGuild) return;

        const cacheChannel: CacheChannel | null = await getCacheChannel(
          this.client,
          <string>packet.guild_id,
          <string>packet.channel_id
        );
        if (!cacheChannel) return;

        switch (packet.type) {
          case DiscordAPIInteractionType.ApplicationCommand:
            // eslint-disable-next-line no-case-declarations
            const commandPacket = <DiscordAPIApplicationCommandInteraction>packet;

            if (commandPacket.data?.type === DiscordAPIApplicationCommandType.ChatInput)
              interaction = new ChatInputCommandInteraction(this.client, commandPacket, cacheGuild, cacheChannel);
            else if (commandPacket.data?.type === DiscordAPIApplicationCommandType.Message) {
              interaction = new MessageCommandInteraction(this.client, commandPacket, cacheGuild, cacheChannel);
            } else if (commandPacket.data?.type === DiscordAPIApplicationCommandType.User)
              interaction = new UserCommandInteraction(this.client, commandPacket, cacheGuild, cacheChannel);
            break;
          case DiscordAPIInteractionType.MessageComponent:
            // eslint-disable-next-line no-case-declarations
            const componentPacket = <DiscordAPIMessageComponentInteraction>packet;
            interaction = new MessageComponentInteraction(this.client, componentPacket, cacheGuild, cacheChannel);
            break;
          case DiscordAPIInteractionType.ApplicationCommandAutocomplete:
            break;

          case DiscordAPIInteractionType.ModalSubmit:
            break;
          case DiscordAPIInteractionType.Ping:
            break;
        }
        console.log("Interaction Create Handler End", Date.now());

        this.client.emit("interactionCreate", interaction);
      })(packet);
    });
  }
}
