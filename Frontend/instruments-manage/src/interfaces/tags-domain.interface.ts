import { InstrumentDomain } from "./instrument-domain.interface";
import { UnitProcessDomain } from "./unit-process-domain.interface";

export interface TagsDomain {
  id: string;
  tag: string;
  description: string;
  instruments: InstrumentDomain;
  unitProcess: UnitProcessDomain;
  typeUnit: string;
  alarms: {
    ll: number;
    l: number;
    h: number;
    hh: number;
  };
  shutDown: boolean;
}
