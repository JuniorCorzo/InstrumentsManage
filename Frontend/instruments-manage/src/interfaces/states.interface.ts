import { BrandDomain } from "./brand-domain.interface";
import { CampDomain } from "./camp-domain.interface";
import { InstrumentDomain } from "./instrument-domain.interface";
import { TagsDomain } from "./tags-domain.interface";
import { UnitProcessDomain } from "./unit-process-domain.interface";

export interface InstrumentsState {
    data: InstrumentDomain[]
}

export interface BrandsState {
    data: BrandDomain[]
}

export interface TagsState {
    data: TagsDomain[]
}

export interface UnitProcessState {
    data: UnitProcessDomain[]
}

export interface CampState {
    data: CampDomain[]
}