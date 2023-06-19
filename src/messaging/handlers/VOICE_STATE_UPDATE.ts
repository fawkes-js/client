import { type Client } from "../../Client";

export class VOICE_STATE_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("VOICE_STATE_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("voiceStateUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
