import { ObjectId } from 'mongodb'
import { CampDTO } from 'src/camp/dtos/camp.dto'

 interface IUnitProcessDTO {
    id: ObjectId,
    name: string,
    camp: CampDTO
}

export class UnitProcessDTO implements IUnitProcessDTO {
  readonly id: ObjectId
  readonly name: string
  readonly camp: CampDTO

  constructor (id: ObjectId, name: string, camp: CampDTO) {
    this.id = id
    this.name = name
    this.camp = camp
  }
}
