import { ObjectId } from "mongodb"
import { camp } from "./camp.model"

export interface unitProcess {
    id: ObjectId
    name: string
    camp: camp 
}