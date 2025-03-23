import { InstrumentDomain } from "@/interfaces/instrument-domain.interface";
import { InstrumentDTO } from "@/models";

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
