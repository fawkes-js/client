import { type EmbedAuthor, type Embed } from "@fawkes.js/typings";

export class APIEmbed {
  title: any;
  description: any;
  timestamp: any;
  color: any;
  footer: any;
  image: any;
  thumbnail: any;
  video: any;
  provider: any;
  author: APIEmbedAuthor | undefined;
  fields: any;

  constructor(embed: Embed) {
    this.title = embed.title;

    this.description = embed.description;

    this.timestamp = embed.timestamp;

    this.color = embed.color ? parseInt(embed.color.replace(/#/i, ""), 16) : 0;

    this.footer = embed.footer;

    this.image = embed.image;

    this.thumbnail = embed.thumbnail;

    this.video = embed.video;

    this.provider = embed.provider;

    this.author = embed.author != null ? new APIEmbedAuthor(embed.author) : undefined;

    this.fields = embed.fields;
  }
}

export class APIEmbedAuthor {
  name: string;
  url: string | undefined;
  icon_url: string | null;
  constructor(author: EmbedAuthor) {
    this.name = author.name;

    this.url = author.url;

    this.icon_url = author.iconURL;
  }
}
