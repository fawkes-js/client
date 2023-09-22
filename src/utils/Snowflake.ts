import { type Snowflake } from "@fawkes.js/typings";

export const DiscordSnowflake = {
  getTimestamp(snowflake: Snowflake) {
    const timestamp = BigInt(snowflake) >> 22n;
    return Number(timestamp);
  },
};
