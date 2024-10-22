import { type Client } from "../../Client";

export class VOICE_SERVER_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("VOICE_SERVER_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("voiceServerUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
