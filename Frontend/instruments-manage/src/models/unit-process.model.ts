import { CampDTO } from "@/models";

export interface UnitProcessDTO {
  _id: string;
  name: string;
  description: string;
  camp: CampDTO;
}
