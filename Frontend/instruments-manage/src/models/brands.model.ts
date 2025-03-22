export interface BrandDTO {
  id: string;
  name: string;
  country: string;
  website: string;
}

export interface CreateBrandDTO extends Omit<BrandDTO, "id"> {}
export interface UpdateBrandDTO extends BrandDTO {}
