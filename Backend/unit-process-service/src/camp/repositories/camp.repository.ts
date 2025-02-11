import { MongoRepository } from 'src/common/repository/mongo-repository.repository'
import { CampEntity } from '../entity/camp.entity'
import { Injectable } from '@nestjs/common'
import { Collection } from 'src/common/decorator/collection.decorator'

@Injectable()
@Collection('campCollection')
export class CampRepository extends MongoRepository<CampEntity, string> {}
