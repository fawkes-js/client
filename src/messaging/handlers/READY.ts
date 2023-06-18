import { Routes, type DiscordAPIApplication } from "@fawkes.js/api-types";
import { type Client } from "../../Client";
import { Application } from "../../structures/Application";

export class READY {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("READY", (packet) => {
      void (async (packet) => {
        const application = await this.client.rest.request(Routes.application());
        await this.client.cache.set("application", application);
        await this.client.cache.set("ready", packet);
        this.client.application = new Application(this.client, <DiscordAPIApplication>application);
        this.client.emit("readyGateway", packet);
      })(packet);
    });
  }
}
