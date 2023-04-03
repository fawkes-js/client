import { DiscordAPIGuild, DiscordAPIGuildMember, DiscordAPIInteraction, DiscordAPIUser, Routes } from "@fawkes.js/api-types";
import { DiscordAPILocale } from "@fawkes.js/api-types";
import { DiscordAPICommandOptionType } from "@fawkes.js/api-types";
import { Client } from "../Client";
import { Guild } from "./Guild";
import { GuildMember } from "./GuildMember";
import { User } from "./User";
import { Message } from './Message';

type EmbedFooter = {
    text: string;
    iconURL?: string;
};

type EmbedImage = {
    url: string;
    height?: number;
    width?: number;
};

type EmbedThumbnail = {
    url: string;
    height?: number;
    width?: number;
};

type EmbedVideo = {
    url?: string;
    height?: number;
    width?: number;
};

type EmbedProvider = {
    name?: string;
    url?: string;
};

type EmbedAuthor = {
    name: string;
    url?: string;
    iconURL: string | null;
};

type EmbedField = {
    name: string;
    value: string;
    inline?: boolean
};

export type Embed = {
    title?: string;
    description?: string;
    timestamp?: Date;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    provider?: EmbedProvider;
    author?: EmbedAuthor;
    fields?: EmbedField[];
}

export class APIEmbed {
    title: any
    description: any
    timestamp: any
    color: any
    footer: any
    image: any
    thumbnail: any
    video: any
    provider: any
    author: APIEmbedAuthor | undefined;
    fields: any

    constructor(embed: Embed) {
        this.title = embed.title;

        this.description = embed.description;

        this.timestamp = embed.timestamp;

        this.color = embed.color;

        this.footer = embed.footer;

        this.image = embed.image;

        this.thumbnail = embed.thumbnail;

        this.video = embed.video;

        this.provider = embed.provider;

        this.author = embed.author ? new APIEmbedAuthor(embed.author) : undefined

        this.fields = embed.fields
    }


}

export class APIEmbedAuthor {
    name: string;
    url: string | undefined
    icon_url: string | null;
    constructor(author: EmbedAuthor) {
        this.name = author.name;

        this.url = author.url;

        this.icon_url = author.iconURL;
    }
}