import { ObjectId } from "mongodb";
import { CampDTO } from "src/camp/dtos/camp.dto";

interface IUnitProcessDTO {
  id: ObjectId;
  name: string;
  description: string;
  camp: CampDTO;
}

export class UnitProcessDTO implements IUnitProcessDTO {
  readonly id: ObjectId;
  readonly name: string;
  readonly camp: CampDTO;
  readonly description: string;

  constructor(id: ObjectId, name: string, description: string, camp: CampDTO) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.camp = camp;
  }
}
