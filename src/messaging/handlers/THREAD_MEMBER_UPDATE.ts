import { type Client } from "../../Client";

export class THREAD_MEMBER_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("THREAD_MEMBER_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("threadMemberUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
