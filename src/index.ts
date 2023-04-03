import { Client } from "./Client";

export * from "./Client";

export * from './structures/ChatInputCommandInteraction'
export * from './structures/MessageComponentInteraction'

export * from './structures/User'
export * from './structures/Role'
export * from './structures/Message'

export * from './messaging/handlers/INTERACTION_CREATE'

// const Phoenix = new Client({
//     token: <string>process.env.DISCORD_BOT_TOKEN,
//     redis: {
//         url: "redis://default:redispw@127.0.0.1:55000",
//     },
// });

// Phoenix.initialize();