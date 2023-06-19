import { type Client } from "../../Client";

export class GUILD_MEMBER_REMOVE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_MEMBER_REMOVE", (packet) => {
      void (async (packet) => {
        this.client.emit("guildMemberRemove", "PLACE VARIABLE");
      })(packet);
    });
  }
}
