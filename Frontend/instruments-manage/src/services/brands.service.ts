import axios from "axios";

import { BrandAdapter } from "@/adapters/brand.adapter";
import { GATEWAY_HOST } from "@/config/env.config";
import { BrandDomain } from "@/interfaces/brand-domain.interface";
import { RetrieveDataDTO } from "@/interfaces/retrieve-data.interface";
import { BrandDTO, CreateBrandDTO, UpdateBrandDTO } from "@/models";

export const getAllBrands = async (): Promise<BrandDomain[]> => {
  const response = await axios
    .get(`${GATEWAY_HOST}/brands/all`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
      return response.data as RetrieveDataDTO;
    });

  return response.data.map((brand) => BrandAdapter(brand as BrandDTO));
};

export const getBrandById = async (id: string): Promise<BrandDomain> => {
  const response: RetrieveDataDTO = await axios
    .get(`${GATEWAY_HOST}/brands?id=${id}`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
      return response.data as RetrieveDataDTO;
    });

  return BrandAdapter(response.data[0] as BrandDTO);
};

export const createBrand = async (
  brand: CreateBrandDTO
): Promise<BrandDomain> => {
  const response: RetrieveDataDTO = await axios
    .post(`${GATEWAY_HOST}/brands/create`, brand)
    .then((response) => {
      if (response.status !== 201) throw Error(response.statusText);
      return response.data as RetrieveDataDTO;
    });

  return BrandAdapter(response.data[0] as BrandDTO);
};

export const updateBrand = async (
  brand: UpdateBrandDTO
): Promise<BrandDomain> => {
  const response = await axios
    .put(`${GATEWAY_HOST}/brands/update`, brand)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
      return response.data as RetrieveDataDTO;
    });

  return BrandAdapter(response.data[0] as BrandDTO);
};

export const deleteBrand = async (id: string) => {
  axios.delete(`${GATEWAY_HOST}/brands/delete?id=${id}`).then((response) => {
    if (response.status !== 200) throw Error(response.statusText);
  });
};
