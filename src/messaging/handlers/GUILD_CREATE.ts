import { type DiscordAPIGuild } from "@fawkes.js/typings";
import { type Client } from "../../Client";
import { Guild } from "../../structures/Guild";
import { CacheGuild } from "../structures/CacheGuild";

export class GUILD_CREATE {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  initialize(): void {
    this.client.on("GUILD_CREATE", (packet) => {
      void (async (packet: DiscordAPIGuild) => {
        if (this.client.db) this.client.db.updateGuild(packet.id);

        const cacheGuild: CacheGuild = await this.client.cache.get("guild:" + packet.id);
        if (cacheGuild) {
          const newGuild: CacheGuild = new CacheGuild(packet);

          // function update(x, y): any {
          //   // if (Array.isArray(x)) {
          //   //   return x.map((element, i) => update(element, y[i]));
          //   // }

          //   if (typeof x === "object") {
          //     console.log("--//--");
          //     return Object.keys(x).reduce((obj: any, k) => console.log("hi"));
          //   }

          //   return y;
          // }

          // // console.log(newGuild, "==//==", cacheGuild);
          // console.log(update(cacheGuild, newGuild));

          // console.log(cacheGuild, "--//--", newGuild);

          await this.client.cache.set("guild:" + packet.id, Object.assign(cacheGuild, newGuild));

          this.client.emit("guildCreate", new Guild(this.client, packet));
        } else await this.client.cache.set("guild:" + packet.id, new CacheGuild(packet));

        // console.log(packet.members[0].user, "---/---");
        // console.log((await this.client.cache.get("guild:" + packet.id)).members[0].user);
      })(packet);
    });
  }
}
