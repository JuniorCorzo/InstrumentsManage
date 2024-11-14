import { ObjectId } from "mongodb"
import { camp } from "../../camp/model/camp.model" 
import { Collection } from "src/common/decorator/collection.decorator"

type IUnitProcess = {
    id?: ObjectId
    name: string
    camp: camp
}

@Collection("unitProcessCollection")
export class UnitProcess implements IUnitProcess {
    id: ObjectId
    name: string
    camp: camp
}