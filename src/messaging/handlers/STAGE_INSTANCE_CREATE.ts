import { type Client } from "../../Client";

export class STAGE_INSTANCE_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("STAGE_INSTANCE_CREATE", (packet) => {
      void (async (packet) => {
        this.client.emit("stageInstanceCreate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
