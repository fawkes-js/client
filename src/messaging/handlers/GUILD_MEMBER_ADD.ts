import { type Client } from "../../Client";

export class GUILD_MEMBER_ADD {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_MEMBER_ADD", (packet) => {
      void (async (packet) => {
        this.client.emit("guildMemberAdd", "PLACE VARIABLE");
      })(packet);
    });
  }
}
