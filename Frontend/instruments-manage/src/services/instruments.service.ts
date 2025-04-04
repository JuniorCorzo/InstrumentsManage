import axios from "axios";

import { instrumentAdapter } from "../adapters/instruments.adapter";
import { InstrumentDomain } from "../interfaces/instrument-domain.interface";
import { RetrieveDataDTO } from "../interfaces/retrieve-data.interface";
import {
  CreateInstrumentsDTO,
  InstrumentDTO,
  UpdateInstrumentsDTO,
} from "../models";
import { GATEWAY_HOST } from "../config/env.config";

export const getAllInstruments = async (): Promise<InstrumentDomain[]> => {
  const response: RetrieveDataDTO = await axios
    .get(`${GATEWAY_HOST}/instruments/all`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);

      return response.data as RetrieveDataDTO;
    });

  return response.data.map((instrument) =>
    instrumentAdapter(instrument as InstrumentDTO)
  );
};

export const getInstrumentById = async (
  id: string
): Promise<InstrumentDomain> => {
  const response: RetrieveDataDTO = await axios
    .get(`${GATEWAY_HOST}/instruments?id=${id}`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);

      return response.data as RetrieveDataDTO;
    });

  return instrumentAdapter(response.data[0] as InstrumentDTO);
};

export const createInstruments = async (
  instrument: CreateInstrumentsDTO
): Promise<InstrumentDomain> => {
  const response: RetrieveDataDTO = await axios
    .post(`${GATEWAY_HOST}/instruments/create`, instrument)
    .then((response) => {
      if (response.status !== 201) throw Error(response.statusText);

      return response.data as RetrieveDataDTO;
    });

  return instrumentAdapter(response.data[0] as InstrumentDTO);
};

export const updateInstruments = async (
  instrument: UpdateInstrumentsDTO
): Promise<InstrumentDomain> => {
  const response: RetrieveDataDTO = await axios
    .put(`${GATEWAY_HOST}/instruments/update`, instrument)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
      return response.data as RetrieveDataDTO;
    });

  return instrumentAdapter(response.data[0] as InstrumentDTO);
};

export const deleteInstruments = async (id: string) => {
  axios
    .delete(`${GATEWAY_HOST}/instruments/delete?id=${id}`)
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
      return response.data;
    });
};
