import { TagsDTO } from "@/models";
import { instrumentAdapter } from "./instruments.adapter";
import { TagsDomain } from "@/interfaces/tags-domain.interface";

export const TagsAdapter = (tags: TagsDTO): TagsDomain => {
    const {_id, description, instruments, unitProcess, typeUnit, alarms, shutDown} = tags

    return {
        id: _id,
        description,
        instruments: instrumentAdapter(instruments),
        unitProcess,
        typeUnit,
        alarms,
        shutDown
    }
}