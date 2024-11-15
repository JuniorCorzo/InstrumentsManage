import { ObjectId } from "mongodb";
import { Collection } from "src/common/decorator/collection.decorator";

type ICamp = {
    id?: ObjectId
    name: string
}

@Collection("campCollection")
export class Camp implements ICamp {
    id: ObjectId;
    name: string;
}