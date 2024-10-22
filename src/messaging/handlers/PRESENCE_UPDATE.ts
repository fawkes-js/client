import { type Client } from "../../Client";

export class PRESENCE_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("PRESENCE_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("presenceUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
