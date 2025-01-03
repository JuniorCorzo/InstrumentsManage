import axios from "axios";

import { CampAdapter } from "@/adapters/camp.adapter";
import { GATEWAY_HOST } from "@/config/env.config";
import { CampDomain } from "@/interfaces/camp-domain.interface";
import { RetrieveDataDTO } from "@/interfaces/retrieve-data.interface";
import { CampDTO } from "@/models";

export const getAllCamps = async (): Promise<CampDomain[]> => {
  const response = await axios
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
  return await axios.get(`${GATEWAY_HOST}/camps?id=${id}`).then((response) => {
    if (response.status !== 200) throw Error(response.statusText);
    return CampAdapter(response.data as CampDTO);
  });
};

export const createCamp = async (camp: CampDomain) => {
  axios.post(`${GATEWAY_HOST}/camps`, camp).then((response) => {
    if (response.status !== 201) throw Error(response.statusText);
  });
};

export const updateCamp = async (camp: CampDomain) => {
  axios.put(`${GATEWAY_HOST}/camps`, camp).then((response) => {
    if (response.status !== 200) throw Error(response.statusText);
  });
};

export const deleteCamp = async (id: string) => {
  axios.delete(`${GATEWAY_HOST}/camps?id=${id}`).then((response) => {
    if (response.status !== 200) throw Error(response.statusText);
  });
};
