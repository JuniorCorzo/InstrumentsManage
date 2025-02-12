import { BrandDomain } from "@/interfaces/brand-domain.interface";
import { BrandDTO } from "@/models";

export const BrandAdapter = (brands: BrandDTO): BrandDomain => {
  const { id, name, country, website } = brands;

  return {
    id,
    name,
    country,
    website,
  };
};
