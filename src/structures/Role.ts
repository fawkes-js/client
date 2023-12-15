import { type CacheRole } from "../messaging/structures/CacheRole";

export class Role {
  id: string;
  name: string;
  color: number;
  position: number;
  constructor(role: CacheRole) {
    this.id = role.id;

    this.name = role.name;

    this.color = role.color;

    this.position = role.position;
  }
}
