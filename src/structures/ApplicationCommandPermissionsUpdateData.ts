import {
  type FawkesApplicationCommandPermission,
  type DiscordAPIApplicationCommandPermissionsStructure,
  type Snowflake,
} from "@fawkes.js/typings";

export class ApplicationCommandPermissionsUpdateData {
  applicationId: Snowflake;
  id: Snowflake;
  guildId: Snowflake;
  permissions: FawkesApplicationCommandPermission[];
  constructor(packet: DiscordAPIApplicationCommandPermissionsStructure) {
    this.applicationId = packet.application_id;
    this.id = packet.id;
    this.guildId = packet.guild_id;
    this.permissions = packet.permissions;
  }
}
