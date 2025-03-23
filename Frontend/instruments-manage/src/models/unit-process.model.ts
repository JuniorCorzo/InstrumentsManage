import { CampDTO } from "@/models";

export interface UnitProcessDTO {
  id: string;
  name: string;
  description: string;
  camp: CampDTO;
}

export interface CreateUnitProcessDTO extends Omit<UnitProcessDTO, "id"> {}
export interface UpdateUnitProcessDTO extends UnitProcessDTO {}
