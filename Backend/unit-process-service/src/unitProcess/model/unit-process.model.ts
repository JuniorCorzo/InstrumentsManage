import { ObjectId } from "mongodb"
import { camp } from "./camp.model" 
import { Collection } from "src/shared/decorator/collection.decorator"

@Collection("unitProcessCollection")
export class UnitProcess {
    id: ObjectId
    name: string
    camp: camp
}