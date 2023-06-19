import { type Client } from "../../Client";

export class USER_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("USER_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("userUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
