import { type Client } from "../../Client";

export class CHANNEL_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("CHANNEL_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("channelUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
