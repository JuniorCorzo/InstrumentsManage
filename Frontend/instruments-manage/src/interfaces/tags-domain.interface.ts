import { InstrumentDomain } from "./instrument-domain.interface"

export interface TagsDomain {
    id: string
    description: string
    instruments: InstrumentDomain
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