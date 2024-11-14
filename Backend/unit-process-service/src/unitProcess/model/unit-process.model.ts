import { ObjectId } from "mongodb"
import { Camp } from "../../camp/model/camp.model" 
import { Collection } from "src/common/decorator/collection.decorator"

type IUnitProcess = {
    id?: ObjectId
    name: string
    camp: Camp
}

@Collection("unitProcessCollection")
export class UnitProcess implements IUnitProcess {
    id: ObjectId
    name: string
    camp: Camp
}