import {
  INSTRUMENTS_CERTIFICATIONS,
  INSTRUMENTS_CONNECTION,
} from "@/const/instruments.const";
import { InstrumentDomain } from "@/interfaces/instrument-domain.interface";
import { CreateInstrumentsDTO, InstrumentDTO } from "@/models";

export const instrumentAdapter = (
  instruments: InstrumentDTO
): InstrumentDomain => {
  const {
    id,
    model,
    brand,
    type,
    measurementRange,
    accuracy,
    processConnection,
    protectionClass,
    connectionType,
    certifications,
  } = instruments;

  return {
    id,
    model,
    brand,
    type,
    measurementRange,
    accuracy,
    processConnection,
    protectionClass,
    connectionType,
    certifications,
  };
};

export const formToInstrumentsDTO = (
  formData: FormData
): CreateInstrumentsDTO => {
  const {
    model,
    brand,
    type,
    accuracy,
    measurementRange,
    processConnection,
    protectionClass,
  } = Object.fromEntries(formData.entries()) as unknown as InstrumentDTO;

  const connectionType: string[] = formData
    .getAll("connectionType")
    .map(
      (name) =>
        INSTRUMENTS_CONNECTION.find(({ value }) => value === name)?.label
    )
    .filter((label) => label !== undefined);

  const certifications: string[] = formData
    .getAll("certifications")
    .map(
      (name) =>
        INSTRUMENTS_CERTIFICATIONS.find(({ value }) => value === name)?.label
    )
    .filter((label) => label !== undefined);

  return {
    model,
    brand,
    type,
    accuracy: `±${accuracy}%`,
    measurementRange,
    processConnection,
    protectionClass,
    connectionType,
    certifications,
  };
};
