import { Inject, Injectable } from "@nestjs/common";
import { UnitProcess } from "src/unitProcess/model/unit-process.model";
import { MongoRepository } from "src/common/utils/MongoRepository";
import { MongoClient } from "mongodb";
import { ConnectDB } from "src/common/config/ConnectDB";
import { Collection } from "src/common/decorator/collection.decorator";


@Injectable()
export class UnitProcessRepository extends MongoRepository<UnitProcess, string>{
       
}