import { EventEmitter } from 'node:events';
import { RedisClient } from './messaging/RedisClient';
import { handlers } from './messaging/handlers/index';
import { REST, type RESTOptions } from '@fawkes.js/rest';
import { GuildHub } from './hubs/GuildHub';
import { type Application } from './structures/Application';
import { defaultRESTOptions, mergeOptions } from './utils/Options';
import { type RabbitOptions, type REDISOptions } from '@fawkes.js/api-types';
import { MessageClient } from './messaging/MessageClient';

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
}

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
    this.rest = new REST(
      <RESTOptions>(
        mergeOptions([
          defaultRESTOptions,
          <object>options.rest,
          { token: options.token },
          { redis: options.redis },
        ])
      )
    );
    this.guilds = new GuildHub(this);
    this.ready = {
      cache: false,
      subscriber: false,
    };
    this.messager = new MessageClient(this);

    Object.defineProperty(this, 'application', { value: null, writable: true });
  }

  async initialize(): Promise<void> {
    void this.rest.initialise();
    await this.cache.connect();
    await this.messager.connect();

    this.application = <Application>await this.cache.get('application');

    handlers.forEach((Handler): void => {
      new Handler(this).initialize();
    });

    const ready = await this.cache.get('ready');
    if (ready !== null) this.emit('READY', ready);
  }
}
