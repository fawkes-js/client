import { type Client } from "../../Client";

export class THREAD_MEMBERS_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("THREAD_MEMBERS_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("threadMembersUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
