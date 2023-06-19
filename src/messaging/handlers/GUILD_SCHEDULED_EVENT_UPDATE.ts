import { type Client } from "../../Client";

export class GUILD_SCHEDULED_EVENT_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_SCHEDULED_EVENT_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildScheduledEventUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
