import { Inject, Injectable } from "@nestjs/common";
import { UnitProcess } from "src/unitProcess/model/unit-process.model";
import { MongoRepository } from "src/shared/utils/MongoRepository";
import { MongoClient } from "mongodb";
import { ConnectDB } from "src/shared/config/ConnectDB";
import { Collection } from "src/shared/decorator/collection.decorator";


@Injectable()
export class UnitProcessRepository extends MongoRepository<UnitProcess, string>{
    constructor(private readonly mongoClient: ConnectDB) {
        super(mongoClient , 'unitProcessCollection')
    }   
}