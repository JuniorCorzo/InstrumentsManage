import { ObjectId } from 'mongodb'
import { Location } from '../interfaces/location.interface'

interface ICampDTO {
    id: ObjectId
    name: string
    location: Location
}

export class CampDTO implements ICampDTO {
  readonly id: ObjectId
  readonly name: string
  readonly location: Location

  constructor (id: ObjectId, name: string, location: Location) {
    this.id = id
    this.name = name
    this.location = location
  }
}
