import axios from "axios";

import { unitProcessAdapter } from "@/adapters/unit-process.adapter";
import { GATEWAY_HOST } from "@/config/env.config";
import { RetrieveDataDTO } from "@/interfaces/retrieve-data.interface";
import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";
import { UnitProcessDTO } from "@/models";

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
  return await axios
    .get(`${GATEWAY_HOST}/unit-process?id=${id}`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);

      return unitProcessAdapter(
        (response.data as RetrieveDataDTO).data[0] as UnitProcessDTO
      );
    });
};

export const createUnitProcess = async (unitProcess: UnitProcessDomain) => {
  axios
    .post(`${GATEWAY_HOST}/unit-process/create`, unitProcess)
    .then((response) => {
      if (response.status !== 201) throw Error(response.statusText);
    });
};

export const updateUnitProcess = async (unitProcess: UnitProcessDomain) => {
  axios
    .put(`${GATEWAY_HOST}/unit-process/update`, unitProcess)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
    });
};

export const deleteUnitProcess = async (id: string) => {
  axios
    .delete(`${GATEWAY_HOST}/unit-process/delete?id=${id}`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
    });
};
