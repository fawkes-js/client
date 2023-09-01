import { EventEmitter } from "node:events";
import { RedisClient } from "./messaging/RedisClient";
import { handlers } from "./messaging/handlers/index";
import { REST, type RESTOptions } from "@fawkes.js/rest";
import { GuildHub } from "./hubs/GuildHub";
import { Application } from "./structures/Application";
import { defaultRESTOptions, mergeOptions } from "./utils/Options";
import { Routes, type RabbitOptions, type REDISOptions, type DiscordAPIApplication } from "@fawkes.js/typings";
import { MessageClient } from "./messaging/MessageClient";

interface RESTClientOptions {
  prefix?: string;
  api?: string;
  version?: string;
  versioned?: boolean;
}

interface ClientOptions {
  redis: REDISOptions;
  rest?: RESTClientOptions;
  token: string;
  rabbit: RabbitOptions;
  db?: any;
}

export class Client extends EventEmitter {
  cache: RedisClient;
  options: ClientOptions;
  rest: REST;
  guilds: GuildHub;
  ready: { cache: boolean; subscriber: boolean };
  application!: Application;
  messager: MessageClient;
  db: any;
  constructor(options: ClientOptions) {
    super();
    this.options = options;
    this.cache = new RedisClient(this);
    this.rest = new REST(
      <RESTOptions>(
        mergeOptions([defaultRESTOptions, <object>options.rest, { discord: { token: options.token } }, { redis: options.redis }])
      )
    );
    this.guilds = new GuildHub(this);
    this.ready = {
      cache: false,
      subscriber: false,
    };
    this.messager = new MessageClient(this);

    this.db = options.db ?? null;

    Object.defineProperty(this, "application", { value: null, writable: true });
  }

  async initialize(): Promise<void> {
    await this.rest.initialise();
    await this.cache.connect();
    await this.messager.connect();

    this.application = <Application>await this.cache.get("application");

    handlers.forEach((Handler): void => {
      new Handler(this).initialize();
    });

    const ready = await this.cache.get("ready");

    if (ready !== null) {
      const application = await this.rest.request(Routes.application());
      this.application = new Application(this, <DiscordAPIApplication>application);
      if (this.options.db) await this._initializeDb();

      this.emit("ready", ready);
    } else {
      if (this.options.db) await this._initializeDb();

      this.on("readyGateway", (ready) => this.emit("ready", ready));
    }
  }

  private async _initializeDb(): Promise<void> {
    await this.db.initialize();
  }
}
