import { ObjectId } from 'mongodb'
import { Collection } from 'src/common/decorator/collection.decorator'

type ICampEntity = {
    _id?: ObjectId
    name: string
}

@Collection('Camps')
export class CampEntity implements ICampEntity {
  _id: ObjectId
  name: string
}
