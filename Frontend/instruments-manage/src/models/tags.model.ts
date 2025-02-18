import { InstrumentDTO } from "./instruments.model";
import { UnitProcessDTO } from "./unit-process.model";

export interface TagsDTO {
  _id: string;
  tag: string;
  description: string;
  instrument: InstrumentDTO;
  unitProcess: UnitProcessDTO;
  typeUnit: string;
  alarms: {
    ll: number;
    l: number;
    h: number;
    hh: number;
  };
  shutDown: boolean;
}
