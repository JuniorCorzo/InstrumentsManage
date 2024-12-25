import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";
import { UnitProcessDTO } from "@/models";
import { CampAdapter } from "./camp.adapter";

export const unitProcessAdapter = (unitProcess: UnitProcessDTO): UnitProcessDomain => {
    const { _id, name, camp } = unitProcess

    return {
        id: _id,
        name,
        camp: CampAdapter(camp)
    }
} 