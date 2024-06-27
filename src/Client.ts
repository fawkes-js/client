import { EventEmitter } from "node:events";
import { handlers } from "./messaging/handlers/index";
import { REST, type RESTOptions } from "@fawkes.js/rest";
import { GuildHub } from "./hubs/GuildHub";
import { Application } from "./structures/Application";
import { defaultRESTOptions, mergeOptions } from "./utils/Options";
import { Routes, type DiscordAPIApplication, type RabbitOptions, Events } from "@fawkes.js/typings";
import { RabbitMQMessageClient } from "./messaging/messaging/RabbitMQMessageClient";
import { LocalClient, RedisClient, type REDISOptions } from "@fawkes.js/cache";
import { LocalMessageClient } from "./messaging/messaging/LocalMessageClient";
interface RESTClientOptions {
  prefix?: string;
  api?: string;
  version?: string;
  versioned?: boolean;
}

interface ClientOptions {
  redis?: REDISOptions;
  rest?: RESTClientOptions;
  token: string;
  rabbit: RabbitOptions;
  db?: any;
  gateway?: any;
}

export class Client extends EventEmitter {
  cache: RedisClient | LocalClient;
  options: ClientOptions;
  rest: REST;
  guilds: GuildHub;
  ready: { cache: boolean; subscriber: boolean };
  application!: Application;
  messager: RabbitMQMessageClient | LocalMessageClient;
  db: any;
  gateway: any | null;
  constructor(options: ClientOptions) {
    super();
    this.options = options;
    this.cache = options.redis ? new RedisClient(options.redis) : new LocalClient();
    this.rest = new REST(
      <RESTOptions>(
        mergeOptions([defaultRESTOptions, <object>options.rest, { discord: { token: options.token } }, { redis: options.redis }])
      ),
      this.cache
    );
    this.guilds = new GuildHub(this);
    this.ready = {
      cache: false,
      subscriber: false,
    };
    this.messager = this.options.rabbit ? new RabbitMQMessageClient(this) : new LocalMessageClient(this);

    this.gateway = this.options.gateway ?? null;

    this.db = options.db ?? null;

    Object.defineProperty(this, "application", { value: null, writable: true });
  }

  async initialize(): Promise<void> {
    await this.cache.init();

    if (this.gateway) {
      this.gateway.login();
    }

    await this.messager.connect();

    this.application = <Application>await this.cache.get("application");

    handlers.forEach((Handler): void => {
      new Handler(this).initialize();
    });

    let ready = await this.cache.get("ready");

    if (ready !== null) {
      const application = await this.rest.request(Routes.application());
      this.application = new Application(this, <DiscordAPIApplication>application);
      if (this.options.db) await this._initializeDb();

      this.emit("ready", ready);
    } else {
      if (this.options.db) await this._initializeDb();

      this.on("readyGateway", (r) => {
        if (ready) return;
        ready = r;
        this.emit("ready", ready);
      });
    }
  }

  private async _initializeDb(): Promise<void> {
    await this.db.initialize();
  }
}
