import { InstrumentDTO } from "./instruments.model";
import { UnitProcessDTO } from "./unit-process.model";

export interface TagsDTO {
  id: string;
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

export interface UpdateTagsDTO
  extends Omit<TagsDTO, "instruments" | "unitProcess"> {
  idInstrument: string;
  idUnitProcess: string;
}

export interface CreateTagDTO extends Omit<UpdateTagsDTO, "id"> {}
