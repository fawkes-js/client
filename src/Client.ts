import { EventEmitter } from "node:events";
import { RedisClient } from "./messaging/RedisClient";
import { handlers } from "./messaging/handlers/index";
import { REST, RESTOptions } from "@fawkes.js/rest";
import { GuildHub } from "./hubs/GuildHub";
import { Application } from "./structures/Application";
import { defaultRESTOptions, mergeOptions } from "./utils/Options";
import { RabbitOptions, REDISOptions } from '@fawkes.js/api-types'
import { MessageClient } from "./messaging/MessageClient";

type RESTClientOptions = {
  prefix?: string;
  api?: string;
  version?: string;
  versioned?: boolean;
};

type ClientOptions = {
  redis: REDISOptions;
  rest?: RESTClientOptions;
  token: string;
  rabbit: RabbitOptions;
};

export class Client extends EventEmitter {
  cache: RedisClient;
  options: ClientOptions;
  rest: REST;
  guilds: GuildHub;
  ready: { cache: boolean; subscriber: boolean };
  application!: Application;
  messager: MessageClient;
  constructor(options: ClientOptions) {
    super();
    this.options = options;
    this.cache = new RedisClient(this);
    this.rest = new REST(<RESTOptions>mergeOptions([defaultRESTOptions, <object>options.rest, { token: options.token }, { redis: options.redis }]));
    this.guilds = new GuildHub(this);
    this.ready = {
      cache: false,
      subscriber: false,
    };
    this.messager = new MessageClient(this)

    Object.defineProperty(this, "application", { value: null, writable: true });
  }

  async initialize() {
    this.rest.connect();
    await this.cache.connect();
    await this.messager.connect();

    this.application = await this.cache.get('application') || null
    handlers.map((handler) => {
      new handler(this).initialize();
    });
  }
}
