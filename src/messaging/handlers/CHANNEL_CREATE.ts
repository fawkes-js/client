import { type Client } from '../../Client'
import { Channel } from '../../structures/Channel'

export class CHANNEL_CREATE {
  client: Client
  constructor (client: Client) {
    this.client = client
  }

  initialize (): void {
    this.client.on('CHANNEL_CREATE', (packet) => {
      void (async (packet) => {
        const guild = await this.client.cache.get('guild:' + <string>packet.guild_id)

        const cacheChannel = {
          id: packet.id,
          last_message_id: packet.last_message_id,
          name: packet.name,
          nsfw: packet.nsfw,
          parent_id: packet.parent_id,
          permission_overwrites: packet.permission_overwrites,
          position: packet.position,
          rate_limit_per_user: packet.rate_limit_per_user,
          topic: packet.topic,
          type: packet.type,
          version: packet.version
        }
        guild.channels.push(cacheChannel)
        await this.client.cache.set('guild:' + <string>packet.guild_id, guild)

        const channel = new Channel(packet)
        this.client.emit('channelCreate', channel)
      })(packet)
    })
  }
}
