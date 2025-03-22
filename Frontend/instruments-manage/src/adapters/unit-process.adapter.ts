import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";
import { UnitProcessDTO } from "@/models";
import { CampAdapter } from "./camp.adapter";

export const unitProcessAdapter = (
  unitProcess: UnitProcessDTO
): UnitProcessDomain => {
  const { id, name, description, camp } = unitProcess;

  return {
    id: id,
    name,
    description,
    camp: CampAdapter(camp),
  };
};
