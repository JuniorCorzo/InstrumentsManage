import { Injectable } from '@nestjs/common'
import { UnitProcessEntity } from 'src/unitProcess/entity/unit-process.entity'
import { MongoRepository } from 'src/common/repository/mongo-repository.repository'
import { Collection } from 'src/common/decorator/collection.decorator'

@Injectable()
@Collection('unitProcessCollection')
export class UnitProcessRepository extends MongoRepository<UnitProcessEntity, string> {

}
