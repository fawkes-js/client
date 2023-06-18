import { type DiscordAPIGuild, type REDISOptions } from "@fawkes.js/api-types/";
import { createClient, type RedisClientType } from "redis";
import { type Client } from "../Client.js";

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

  async connect(): Promise<void> {
    const url =
      (<string>this.options.url).length > 0
        ? this.options.url
        : `redis://${<string>this.options.username}:${<string>this.options.password}@${<string>this.options.hostname}:${<string>(
            this.options.port
          )}`;

    this.cache = createClient({ url });

    await this.cache.connect();
  }

  async get(id: string): Promise<any> {
    const data = await this.cache.get(id);
    if (data === null) return null;
    else return JSON.parse(data);
  }

  async set(id: string, data: any): Promise<any> {
    return await this.cache.set(id, JSON.stringify(data));
  }

  async delete(id: string): Promise<any> {
    const key = `guild:${id}`;
    return await this.cache.del(key);
  }

  async has(id: string): Promise<any> {
    const key = `guild:${id}`;
    if ((await this.cache.get(key)) !== null) return true;
    else return false;
  }

  async patch(id: string, data: DiscordAPIGuild): Promise<any> {
    const key = `guild:${id}`;

    return await this.cache.set(key, JSON.stringify(data));
  }
}
