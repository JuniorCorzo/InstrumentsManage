import { TagsDTO } from "@/models";
import { instrumentAdapter } from "./instruments.adapter";
import { TagsDomain } from "@/interfaces/tags-domain.interface";
import { unitProcessAdapter } from "./unit-process.adapter";

export const TagsAdapter = (tags: TagsDTO): TagsDomain => {
  const {
    _id,
    tag,
    description,
    instruments,
    unitProcess,
    typeUnit,
    alarms,
    shutDown,
  } = tags;

  return {
    id: _id,
    tag,
    description,
    instruments: instrumentAdapter(instruments),
    unitProcess: unitProcessAdapter(unitProcess),
    typeUnit,
    alarms,
    shutDown,
  };
};
