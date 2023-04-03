import { DiscordAPIMessage, Snowflake } from "@fawkes.js/api-types";
import { EventEmitter } from "node:events";
import { Client } from "../Client";

export class Message {
    id: Snowflake
    content: string;
    client: Client;
    constructor(client: Client, message: DiscordAPIMessage) {
        this.client = client;

        this.id = message.id;

        this.content = message.content
    }

    reply() { }

    delete() { }

    async createCollector() {



        class Collector extends EventEmitter {

            constructor() {
                super()
            }
        }

        const collector = new Collector();

        await this.client.cache.set('event:message:' + this.id, this.client.messager.queue.queue)

        this.client.on('event:message' + this.id, (interaction) => {
            console.log('yo! it came through!')
            collector.emit('collect', interaction)
        })
        console.log(collector)
        return collector;

    }
}