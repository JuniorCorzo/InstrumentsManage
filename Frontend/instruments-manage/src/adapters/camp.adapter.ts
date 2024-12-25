import { CampDomain } from "@/interfaces/camp-domain.interface";
import { CampDTO } from "@/models";

export const CampAdapter = (camp: CampDTO): CampDomain => {
    const { _id, name } = camp

    return { id: _id, name }
}