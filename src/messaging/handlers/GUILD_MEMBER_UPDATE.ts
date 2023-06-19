import { type Client } from "../../Client";

export class GUILD_MEMBER_UPDATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_MEMBER_UPDATE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildMemberUpdate", "PLACE VARIABLE");
      })(packet);
    });
  }
}
