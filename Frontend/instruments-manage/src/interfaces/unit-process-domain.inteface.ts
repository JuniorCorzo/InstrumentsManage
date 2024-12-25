import { CampDomain } from "./camp-domain.interface"

export interface UnitProcessDomain {
    id: string
    name: string
    camp: CampDomain
}