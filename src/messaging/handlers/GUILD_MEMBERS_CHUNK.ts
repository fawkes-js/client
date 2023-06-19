import { type Client } from "../../Client";

export class GUILD_MEMBERS_CHUNK {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_MEMBER_CHUNK", (packet) => {
      void (async (packet) => {
        this.client.emit("guildMemberChunk", "PLACE VARIABLE");
      })(packet);
    });
  }
}
