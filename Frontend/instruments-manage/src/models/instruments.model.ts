import { Brand } from '@/models';

export interface Instrument {
    _id: string,
    model: string,
    brand: Brand
    type: string
}