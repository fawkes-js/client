import { type Client } from "../../Client";

export class CHANNEL_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("STAGE_INSTANCE_DELETE", (packet) => {
      void (async (packet) => {
        this.client.emit("stageInstanceDelete", "PLACE VARIABLE");
      })(packet);
    });
  }
}
