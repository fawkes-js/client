import { type Client } from "../../Client";

export class INVITE_DELETE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("INVITE_DELETE", (packet) => {
      void (async (packet) => {
        this.client.emit("inviteDelete", "PLACE VARIABLE");
      })(packet);
    });
  }
}
