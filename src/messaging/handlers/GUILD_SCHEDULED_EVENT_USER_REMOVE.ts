import { type Client } from "../../Client";

export class GUILD_SCHEDULED_EVENT_USER_REMOVE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_SCHEDULED_EVENT_USER_REMOVE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildScheduledEventUserRemove", "PLACE VARIABLE");
      })(packet);
    });
  }
}
