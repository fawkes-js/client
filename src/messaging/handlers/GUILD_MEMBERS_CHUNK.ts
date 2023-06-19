import { type Client } from "../../Client";

export class CHANNEL_CREATE {
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
