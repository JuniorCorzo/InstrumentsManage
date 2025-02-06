import { ObjectId } from 'mongodb'

interface ICampDTO {
    id: ObjectId
    name: string
}

export class CampDTO implements ICampDTO {
  readonly id: ObjectId
  readonly name: string

  constructor (id: ObjectId, name: string) {
    this.id = id
    this.name = name
  }
}
