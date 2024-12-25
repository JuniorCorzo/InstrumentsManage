import { InstrumentDomain } from "@/interfaces/instrument-domain.interface";
import { InstrumentDTO } from "@/models";
import { BrandAdapter } from "./brand.adapter";

export const instrumentAdapter = (instruments: InstrumentDTO): InstrumentDomain => {
    const {_id, model, brand, type} = instruments
    
    return {
        id: _id,
        model,
        brand: BrandAdapter(brand),
        type
    }
}