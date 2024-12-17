export interface TagsDTO {
    _id: string
    description: string
    instruments: string
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