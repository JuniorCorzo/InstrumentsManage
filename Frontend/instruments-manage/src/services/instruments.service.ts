import { instrumentAdapter } from "@/adapters/instruments.adapter"
import { InstrumentDomain } from "@/interfaces/instrument-domain.interface"
import { RetrieveDataDTO } from "@/interfaces/retrieve-data.interface"
import { InstrumentDTO } from "@/models"
import axios from "axios"

export const getAllInstruments = async (): Promise<InstrumentDomain[]> => {
    const response: RetrieveDataDTO = await axios.get("http://localhost:8080/instruments/all")
     .then(response => {
        if (response.status !== 200) throw Error(response.statusText)
        return response.data as RetrieveDataDTO
     })

    return response.data.map(instrument => instrumentAdapter(instrument as InstrumentDTO))
}