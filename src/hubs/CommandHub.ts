import { Routes, type DiscordAPICommandOptionType } from '@fawkes.js/api-types'
import { type Client } from '../Client'

interface CommandOption {
  name: string
  description: string
  type: DiscordAPICommandOptionType
  required: boolean
}
interface CommandOptions2 {
  name: string
  description: string
  options?: CommandOption[]
}

export class CommandHub {
  client: Client
  constructor (client: Client) {
    this.client = client
  }

  async create (options: CommandOptions2): Promise<void> {
    await this.client.rest.request(Routes.createApplicationCommand(<string> this.client.application?.id), options)
  }

  delete (): void { }
}
