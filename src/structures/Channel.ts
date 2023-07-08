import { type DiscordAPIChannel, type Snowflake } from "@fawkes.js/typings";
import { type Client } from "../Client";

export class Channel {
  id: Snowflake;
  name: string | null;
  constructor(client: Client, channel: DiscordAPIChannel) {
    this.id = channel.id;

    this.name = channel.name != null ? channel.name : null;
  }
}
