import { CreateTagDTO, TagsDTO } from "@/models";
import { instrumentAdapter } from "./instruments.adapter";
import { TagsDomain } from "@/interfaces/tags-domain.interface";
import { unitProcessAdapter } from "./unit-process.adapter";

export const TagsAdapter = (tags: TagsDTO): TagsDomain => {
  const {
    id,
    tag,
    description,
    instrument,
    unitProcess,
    typeUnit,
    alarms,
    shutDown,
  } = tags;

  return {
    id,
    tag,
    description,
    instrument: instrumentAdapter(instrument),
    unitProcess: unitProcessAdapter(unitProcess),
    typeUnit,
    alarms,
    shutDown,
  };
};

export const formToTagsDTO = (names: {
  [key: string]: FormDataEntryValue;
}): CreateTagDTO => {
  const {
    tag,
    description,
    idInstrument,
    idUnitProcess,
    typeUnit,
    hh,
    h,
    l,
    ll,
  } = names;
  return {
    tag,
    description,
    idInstrument,
    idUnitProcess,
    typeUnit,
    alarms: {
      hh: Number(hh),
      h: Number(h),
      l: Number(l),
      ll: Number(ll),
    },
  } as CreateTagDTO;
};
