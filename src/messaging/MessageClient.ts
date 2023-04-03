import { Client } from "../Client.js";
import { RabbitOptions } from '@fawkes.js/api-types'
import { connect } from 'amqplib/callback_api'


export class MessageClient {
    options: RabbitOptions
    connection: any;
    channel: any;
    queue: any;
    client: Client
    constructor(Client: Client) {
        this.options = Client.options.rabbit

        this.client = Client

    }

    async connect() {
        // Create a connection with the AMQP Server,
        connect(this.options.hostname, (err, connection) => {
            if (err) {
                console.log('AMQP Error - Error Connecting,')
                return;
            }

            this.connection = connection;
            // Create a channel witin the connection,
            this.channel = this.connection.createChannel((err, channel) => {
                if (err) {
                    console.log('AMQP Error - Error creating a channel,')
                    return;
                }

                this.channel = channel;

                //Primary Functions:
                this.channel.consume('primary', (message) => {
                    const packet = JSON.parse(message.content.toString())
                    console.log('consume', packet)

                    this.client.emit(packet.t, packet.d);
                }, { noAck: true })

                // Secondary Return Functions:

                // Create the exchange if it does not exist, and then bind a temporary channel to it,
                this.channel.assertExchange('return', 'fanout', { durable: false })
                this.channel.assertQueue('', { exclusive: true }, (err, q) => {
                    if (err) {
                        console.log('AMQP ERROR - Error asserting queue');
                        return;
                    }
                    this.queue = q
                    this.channel.bindQueue(q.queue, 'return', '',)

                    this.channel.consume(q.queue, (message) => {
                        const packet = JSON.parse(message.content.toString())

                        this.client.emit(packet.tag, packet.data)
                    }, { noAck: true })
                })
            })
        })
    }
}
