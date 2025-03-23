import axios from "axios";

import { CampAdapter } from "@/adapters/camp.adapter";
import { GATEWAY_HOST } from "@/config/env.config";
import { CampDomain } from "@/interfaces/camp-domain.interface";
import { RetrieveDataDTO } from "@/interfaces/retrieve-data.interface";
import { CampDTO, CreateCampDTO, UpdateCampDTO } from "@/models";

export const getAllCamps = async (): Promise<CampDomain[]> => {
  const response: RetrieveDataDTO = await axios
    .get(`${GATEWAY_HOST}/camps/all`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
      return response.data as RetrieveDataDTO;
    });

  return response.data.map((camp) => CampAdapter(camp as CampDTO));
};

export const getCampById = async (
  id: string | string[]
): Promise<CampDomain> => {
  const response: RetrieveDataDTO = await axios
    .get(`${GATEWAY_HOST}/camps?id=${id}`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
      return response.data as RetrieveDataDTO;
    });

  return CampAdapter(response.data[0] as CampDTO);
};

export const createCamp = async (camp: CreateCampDTO): Promise<CampDomain> => {
  const response: RetrieveDataDTO = await axios
    .post(`${GATEWAY_HOST}/camps`, camp)
    .then((response) => {
      if (response.status !== 201) throw Error(response.statusText);

      return response.data as RetrieveDataDTO;
    });

  return CampAdapter(response.data[0] as CampDTO);
};

export const updateCamp = async (camp: UpdateCampDTO): Promise<CampDomain> => {
  const response: RetrieveDataDTO = await axios
    .put(`${GATEWAY_HOST}/camps`, camp)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);

      return response.data as RetrieveDataDTO;
    });

  return CampAdapter(response.data[0] as CampDTO);
};

export const deleteCamp = async (id: string) => {
  axios.delete(`${GATEWAY_HOST}/camps?id=${id}`).then((response) => {
    if (response.status !== 200) throw Error(response.statusText);
  });
};
