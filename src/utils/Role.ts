import { DiscordAPIGuild, DiscordAPIGuildMember, DiscordAPIRole, Snowflake } from "@fawkes.js/api-types";
import { Client } from "../Client";

async function getMember(client: Client, guildId: Snowflake, userId: Snowflake) {
    const guild: DiscordAPIGuild = await client.cache.get(guildId);

    const member = guild.members.find((member: DiscordAPIGuildMember) => member.user?.id === userId)

    return { guild, member }
}
export async function addRole(client: Client, guildId: Snowflake, userId: Snowflake, role: DiscordAPIRole) {
    const { guild, member } = await getMember(client, guildId, userId)

    member ? member.roles.push(role.id) : null

    await client.cache.set('guild:' + guildId, guild);

}

export async function removeRole(client: Client, guildId: Snowflake, userId: Snowflake, role: DiscordAPIRole) {
    const { guild, member } = await getMember(client, guildId, userId)

    member!.roles = member ? member.roles.filter((r: string) => {
        return r !== role.id
    }) : []


    await client.cache.set('guild:' + guildId, guild);

}

export function updateRole() { }