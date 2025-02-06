import { ObjectId } from "mongodb";
import { Collection } from "src/common/decorator/collection.decorator";
import { Location } from "../interfaces/location.interface";

type ICampEntity = {
  _id?: ObjectId;
  name: string;
  location: Location;
};

@Collection("Camps")
export class CampEntity implements ICampEntity {
  _id: ObjectId;
  name: string;
  location: Location;
}
