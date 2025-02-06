import { ObjectId } from 'mongodb'
import { CampEntity } from '../../camp/entity/camp.entity'
import { Collection } from 'src/common/decorator/collection.decorator'

interface IUnitProcessEntity {
    _id?: ObjectId
    name: string
    camp: CampEntity
}

@Collection('ProcessUnits')
export class UnitProcessEntity implements IUnitProcessEntity {
  _id: ObjectId
  name: string
  camp: CampEntity
}
