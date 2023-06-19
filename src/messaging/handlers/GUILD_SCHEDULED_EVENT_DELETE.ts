import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_SCHEDULED_EVENT_DELETE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildScheduledEventDelete", "PLACE VARIABLE");
      })(packet);
    });
  }
}
