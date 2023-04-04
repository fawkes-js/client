import { Routes } from '@fawkes.js/api-types'
import { type Client } from '../../Client'
import { Application } from '../../structures/Application'

export class READY {
  client: Client
  constructor (client: Client) {
    this.client = client
  }

  initialize (): void {
    this.client.on('READY', (packet) => {
      void (async (packet) => {
        console.log('ready!')
        const application = await this.client.rest.request(Routes.application())
        await this.client.cache.set('application', application)
        await this.client.cache.set('ready', packet)
        this.client.application = new Application(this.client, application)
        this.client.emit('ready', packet)
      })(packet)
    })
  }
}
