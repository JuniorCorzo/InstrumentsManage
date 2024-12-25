import { BrandDomain } from "./brand-domain.interface"

export interface InstrumentDomain {
    model: string
    brand: BrandDomain
    type: string
    id?: string
}