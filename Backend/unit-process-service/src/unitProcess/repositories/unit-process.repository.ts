import { Injectable } from "@nestjs/common";
import { unitProcess } from "src/unitProcess/model/unit-process.model";
import { MongoRepository } from "src/shared/utils/MongoRepository";


@Injectable()
export class UnitProcessRepository extends MongoRepository<unitProcess>{
    
}