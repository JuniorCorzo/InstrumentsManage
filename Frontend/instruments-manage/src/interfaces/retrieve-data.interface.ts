import { BrandDTO, CampDTO, InstrumentDTO, TagsDTO, UnitProcessDTO } from "@/models";

export interface RetrieveDataDTO {
    status: string,
    data: InstrumentDTO[] | BrandDTO[] | TagsDTO[] | UnitProcessDTO[] | CampDTO[]
    message: string  
}