import axios from "axios";

import { unitProcessAdapter } from "@/adapters/unit-process.adapter";
import { GATEWAY_HOST } from "@/config/env.config";
import { RetrieveDataDTO } from "@/interfaces/retrieve-data.interface";
import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";
import { CreateUnitProcessDTO, UnitProcessDTO } from "@/models";

export const getAllUnitProcesses = async (): Promise<UnitProcessDomain[]> => {
  const response = await axios
    .get(`${GATEWAY_HOST}/unit-process/all`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);

      return response.data as RetrieveDataDTO;
    });

  return response.data.map((unitProcess) =>
    unitProcessAdapter(unitProcess as UnitProcessDTO)
  );
};

export const getUnitProcessById = async (
  id: string
): Promise<UnitProcessDomain> => {
  const response: RetrieveDataDTO = await axios
    .get(`${GATEWAY_HOST}/unit-process?id=${id}`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);

      return response.data as RetrieveDataDTO;
    });

  return unitProcessAdapter(response.data[0] as UnitProcessDTO);
};

export const createUnitProcess = async (
  unitProcess: CreateUnitProcessDTO
): Promise<UnitProcessDomain> => {
  const response: RetrieveDataDTO = await axios
    .post(`${GATEWAY_HOST}/unit-process/create`, unitProcess)
    .then((response) => {
      if (response.status !== 201) throw Error(response.statusText);

      return response.data as RetrieveDataDTO;
    });

  return unitProcessAdapter(response.data[0] as UnitProcessDTO);
};

export const updateUnitProcess = async (
  unitProcess: CreateUnitProcessDTO
): Promise<UnitProcessDomain> => {
  const response: RetrieveDataDTO = await axios
    .put(`${GATEWAY_HOST}/unit-process/update`, unitProcess)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);

      return response.data as RetrieveDataDTO;
    });

  return unitProcessAdapter(response.data[0] as UnitProcessDTO);
};

export const deleteUnitProcess = async (id: string) => {
  axios
    .delete(`${GATEWAY_HOST}/unit-process/delete?id=${id}`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
    });
};
