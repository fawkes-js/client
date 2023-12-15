import { type MessageResponseOptions, type Snowflake, Routes } from "@fawkes.js/typings";
import { type Client } from "../Client";
import { type CacheChannel } from "../messaging/structures/CacheChannel";

export class Channel {
  id: Snowflake;
  name: string | null;
  client: any;
  constructor(client: Client, channel: CacheChannel) {
    this.id = channel.id;

    this.name = channel.name != null ? channel.name : null;
  }

  async send(data: MessageResponseOptions): Promise<void> {
    await this.client.rest.request(Routes.createMessage(this.id), {
      content: data.content ?? "",
      embeds: data.embeds ?? [],
      components: data.components ?? [],
      attachments: data.attachments ?? [],
    });
  }
}
