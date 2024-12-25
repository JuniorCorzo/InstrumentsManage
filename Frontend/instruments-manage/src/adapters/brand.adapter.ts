import { BrandDomain } from "@/interfaces/brand-domain.interface";
import { BrandDTO } from "@/models";

export const BrandAdapter = (brands: BrandDTO): BrandDomain => {
    const { _id, name } = brands;
    
    return {
        id: _id,
        name
    }
}