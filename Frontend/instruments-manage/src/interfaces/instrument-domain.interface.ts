import { CampDTO } from "@/models"

export interface InstrumentDomain {
    model: string
    brand: CampDTO
    type: string
    id?: string
}