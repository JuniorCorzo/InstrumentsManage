import { BrandDomain } from "./brand-domain.interface";
import { CampDomain } from "./camp-domain.interface";
import { InstrumentDomain } from "./instrument-domain.interface";
import { TagsDomain } from "./tags-domain.interface";
import { UnitProcessDomain } from "./unit-process-domain.interface";

interface StateBase {
  loading: boolean;
}

export interface InstrumentsState extends StateBase {
  instruments: InstrumentDomain[];
}

export interface BrandsState extends StateBase {
  brands: BrandDomain[];
}

export interface TagsState extends StateBase {
  tags: TagsDomain[];
}

export interface UnitProcessState extends StateBase {
  unitProcess: UnitProcessDomain[];
}

export interface CampState extends StateBase {
  camps: CampDomain[];
}
