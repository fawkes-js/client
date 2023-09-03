import { type Client } from "../../Client";
import { type IMessageClient } from "./IMessageClient";

export class LocalMessageClient implements IMessageClient {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  async connect(): Promise<void> {
    this.client.gateway.on("publishPrimary", (packet) => {
      this.client.emit(packet.t, packet.d);
    });

    this.client.gateway.on("publishSecondary", (packet) => {
      this.client.emit(packet.tag, packet.data);
    });
  }
}
