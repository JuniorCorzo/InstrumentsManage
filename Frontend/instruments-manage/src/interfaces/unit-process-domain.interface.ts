import { CampDomain } from "./camp-domain.interface";

export interface UnitProcessDomain {
  id: string;
  name: string;
  description: string;
  camp: CampDomain;
}
