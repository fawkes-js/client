import { type DiscordAPIGuild } from '@fawkes.js/api-types'
import { type Client } from '../Client'
import { Guild } from '../structures/Guild'

export class GuildHub {
  client!: Client
  constructor (client: Client) {
    Object.defineProperty(this, 'client', { value: client })
  }

  async fetch (id: string): Promise<Guild> {
    const guild: DiscordAPIGuild = await this.client.cache.get('guild:' + id)

    return new Guild(this.client, guild)
  }
}
