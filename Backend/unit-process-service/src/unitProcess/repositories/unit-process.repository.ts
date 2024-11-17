import { Injectable } from '@nestjs/common'
import { UnitProcess } from 'src/unitProcess/model/unit-process.model'
import { MongoRepository } from 'src/common/repository/mongo-repository.repository'
import { Collection } from 'src/common/decorator/collection.decorator'

@Injectable()
@Collection('unitProcessCollection')
export class UnitProcessRepository extends MongoRepository<UnitProcess, string> {

}
