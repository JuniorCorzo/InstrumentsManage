import { InstrumentDomain } from "@/interfaces/instrument-domain.interface";
import { InstrumentDTO } from "@/models";

export const instrumentAdapter = (
  instruments: InstrumentDTO
): InstrumentDomain => {
  const {
    _id,
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
    id: _id,
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
