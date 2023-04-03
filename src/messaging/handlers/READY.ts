import { Routes } from "@fawkes.js/api-types";
import { Client } from "../../Client";
import { Application } from "../../structures/Application";

export class READY {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  initialize() {
    this.client.on("READY", async (packet) => {
      const application = await this.client.rest.request(Routes.application());

      this.client.cache.set('application', application)
      this.client.application = new Application(this.client, application);
      this.client.emit("ready", packet);
    });
  }
}
