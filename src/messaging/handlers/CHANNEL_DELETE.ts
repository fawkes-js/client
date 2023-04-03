import { DiscordAPIChannel, DiscordAPIGuild } from "@fawkes.js/api-types";
import { Client } from "../../Client";
import { Channel } from '../../structures/Channel'

export class CHANNEL_DELETE {
    client: Client;
    constructor(client: Client) {
        this.client = client;
    }
    initialize() {
        this.client.on("CHANNEL_DELETE", async (packet) => {
            const guild = await this.client.cache.get('guild:' + packet.guild_id)

            guild.channels = guild.channels.filter((channel: DiscordAPIChannel) => channel.id !== packet.id)
            this.client.cache.set('guild:' + packet.guild_id, guild);

            const channel = new Channel(packet)
            this.client.emit("channelCreate", channel);
        });
    }
}
