import { InstrumentDTO } from "./instruments.model"

export interface TagsDTO {
    _id: string
    description: string
    instruments: InstrumentDTO,
    unitProcess: string
    typeUnit: string
    alarms: {
        ll: number
        l: number
        h: number
        hh: number
    }
    shutDown: boolean
}