import { ObjectId } from "mongodb"
import { camp } from "./camp.model" 
import { Collection } from "src/common/decorator/collection.decorator"

@Collection("unitProcessCollection")
export class UnitProcess {
    id: ObjectId
    name: string
    camp: camp
}