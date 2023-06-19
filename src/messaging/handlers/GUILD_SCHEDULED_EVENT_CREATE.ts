import { type Client } from "../../Client";

export class GUILD_SCHEDULED_EVENT_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_SCHEDULED_EVENT_CREATE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildScheduledEventCreate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
