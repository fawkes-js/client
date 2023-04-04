import { type DiscordAPIRole } from '@fawkes.js/api-types'

export class Role {
  id: string
  name: string
  color: number
  position: number
  constructor (role: DiscordAPIRole) {
    this.id = role.id

    this.name = role.name

    this.color = role.color

    this.position = role.position
  }
}
