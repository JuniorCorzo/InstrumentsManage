import { ObjectId } from "mongodb"
import { Camp } from "../../camp/model/camp.model" 
import { Collection } from "src/common/decorator/collection.decorator"

type IUnitProcess = {
    _id?: ObjectId
    name: string
    camp: Camp
}

@Collection("unitProcessCollection")
export class UnitProcess implements IUnitProcess {
    _id: ObjectId
    name: string
    camp: Camp
}