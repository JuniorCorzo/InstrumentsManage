import { BrandDTO } from '@/models';

export interface InstrumentDTO {
    _id: string,
    model: string,
    brand: BrandDTO
    type: string
}