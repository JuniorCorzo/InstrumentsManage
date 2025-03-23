export interface InstrumentDTO {
  id: string;
  model: string;
  brand: string;
  type: string;
  measurementRange: string;
  accuracy: string;
  connectionType: string[];
  processConnection: string;
  protectionClass: string;
  certifications: string[];
}

export interface CreateInstrumentsDTO extends Omit<InstrumentDTO, "id"> {}
export interface UpdateInstrumentsDTO extends InstrumentDTO {}
