import { DiscordAPIChannel, Snowflake } from "@fawkes.js/api-types";

export class Channel {
  id: Snowflake;
  name: string | null;
  constructor(channel: DiscordAPIChannel) {
    this.id = channel.id;

    this.name = channel.name ? channel.name : null
  }
}
