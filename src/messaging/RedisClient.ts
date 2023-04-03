import { DiscordAPIGuild } from "@fawkes.js/api-types/";
import { createClient, RedisClientType } from "redis";
import { Client } from "../Client.js";
import { REDISOptions } from '@fawkes.js/api-types'

export class RedisClient {
  client: Client;
  options: REDISOptions;
  cache!: RedisClientType;
  constructor(Client: Client) {
    this.options = Client.options.redis;

    this.client = Client;

    Object.defineProperty(this, "cache", { value: null, writable: true });
    Object.defineProperty(this, "subscriber", { value: null, writable: true });
  }

  async connect() {
    const url = this.options.url
      ? this.options.url
      : `redis://${this.options.username}:${this.options.password}@${this.options.hostname}:${this.options.port}`;

    this.cache = createClient({ url });

    await this.cache.connect();
  }



  async get(id: string) {
    return JSON.parse(<string>await this.cache.get(id));
  }
  async set(id: string, data: any) {
    return await this.cache.set(id, JSON.stringify(data));
  }

  async delete(id: string) {
    const key = `guild:${id}`;
    return await this.cache.del(key);
  }

  async has(id: string) {
    const key = `guild:${id}`;
    return (await this.cache.get(key)) ? true : false;
  }

  async patch(id: string, data: DiscordAPIGuild) {
    const key = `guild:${id}`;

    return await this.cache.set(key, JSON.stringify(data));
  }
}
