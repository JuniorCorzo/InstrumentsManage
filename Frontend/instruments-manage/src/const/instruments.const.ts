import { BrandDomain } from "@/interfaces/brand-domain.interface";
import { ModalConfig } from "@/interfaces/modal-config.interface";

export const INSTRUMENTS_MODAL_FORM = (brands: BrandDomain[]): ModalConfig => {
  return {
    title: "Añadir un Nuevo Instrumento",
    fields: [
      {
        type: "text",
        field: {
          name: "model",
          label: "Modelo",
          placeholder: "Modelo",
        },
      },
      {
        type: "select",
        field: {
          label: "Marca",
          name: "brand",
          placeholder: "Marca",
          options: brands.map(({ name }) => {
            return { value: name, label: name };
          }),
        },
      },
      {
        type: "select",
        field: {
          name: "type",
          label: "Tipo de instrumento",
          placeholder: "Tipo de Instrumento",
          options: INSTRUMENTS_TYPES,
        },
      },
      {
        type: "text",
        field: {
          name: "measurementRange",
          label: "Rango",
          placeholder: "0-100 PSI ...",
        },
      },
      {
        type: "text",
        field: {
          name: "accuracy",
          label: "Precisión",
          placeholder: "0.05 ...",
        },
      },
      {
        type: "select",
        field: {
          name: "connectionType",
          label: "Conexión",
          placeholder: '1/2" NPT, G1/2 ...',
          options: INSTRUMENTS_CONNECTION,
          isMulti: true,
        },
      },
      {
        type: "select",
        field: {
          name: "processConnection",
          label: "Proceso de Conexión",
          placeholder: "Flanged ...",
          options: INSTRUMENTS_CONNECTION_PROCESS,
        },
      },
      {
        type: "select",
        field: {
          name: "protectionClass",
          label: "Protección",
          placeholder: "IP20 ...",
          options: INSTRUMENTS_PROTECTION_TYPE,
        },
      },
      {
        type: "select",
        field: {
          name: "certifications",
          label: "Certificaciones",
          placeholder: "ATEX, CE ...",
          options: INSTRUMENTS_CERTIFICATIONS,
          isMulti: true,
        },
      },
    ],
  };
};

export const INSTRUMENTS_TYPES = [
  { value: "Analizadores de gases", label: "Analizadores de gases" },
  { value: "Analizadores de partículas", label: "Analizadores de partículas" },
  { value: "Analizadores químicos", label: "Analizadores químicos" },
  { value: "Celdas de carga", label: "Celdas de carga" },
  { value: "Interruptores de flujo", label: "Interruptores de flujo" },
  { value: "Medidores de caudal", label: "Medidores de caudal" },
  { value: "Medidores de conductividad", label: "Medidores de conductividad" },
  { value: "Medidores de energía", label: "Medidores de energía" },
  { value: "Medidores de flujo", label: "Medidores de flujo" },
  { value: "Medidores de pH", label: "Medidores de pH" },
  { value: "Medidores de torque", label: "Medidores de torque" },
  { value: "Medidores de turbidez", label: "Medidores de turbidez" },
  { value: "Sensores de CO2", label: "Sensores de CO2" },
  { value: "Sensores de densidad", label: "Sensores de densidad" },
  { value: "Sensores de humedad", label: "Sensores de humedad" },
  { value: "Sensores de nivel", label: "Sensores de nivel" },
  { value: "Sensores de oxígeno", label: "Sensores de oxígeno" },
  {
    value: "Sensores de presión diferencial",
    label: "Sensores de presión diferencial",
  },
  { value: "Sensores de temperatura", label: "Sensores de temperatura" },
  { value: "Sensores de velocidad", label: "Sensores de velocidad" },
  { value: "Sensores de vibración", label: "Sensores de vibración" },
  { value: "Transmisor de nivel", label: "Transmisor de nivel" },
  { value: "Transmisor de presión", label: "Transmisor de presión" },
  { value: "Transmisor de Temperatura", label: "Transmisor de Temperatura" },
  { value: "Termopares", label: "Termopares" },
];

export const INSTRUMENTS_CONNECTION = [
  { value: "1_2_npt", label: '1/2" NPT' },
  { value: "1_4_npt", label: '1/4" NPT' },
  { value: "1_8_npt", label: '1/8" NPT' },
  { value: "ansi_1_2", label: "ANSI 1/2" },
  { value: "ansi_1_4", label: "ANSI 1/4" },
  { value: "ansi_1_8", label: "ANSI 1/8" },
  { value: "ansi_3_8", label: "ANSI 3/8" },
  { value: "bspp", label: "BSPP" },
  { value: "bspt", label: "BSPT" },
  { value: "g1_2", label: "G1/2" },
  { value: "g1_4", label: "G1/4" },
  { value: "g1_8", label: "G1/8" },
];

const INSTRUMENTS_CONNECTION_PROCESS = [
  { value: "Camlock", label: "Camlock" },
  { value: "Clamp", label: "Clamp" },
  { value: "Compression", label: "Compression" },
  { value: "Flanged", label: "Flanged" },
  { value: "Quick Connect", label: "Quick Connect" },
  { value: "Soldered", label: "Soldered" },
  { value: "Threaded", label: "Threaded" },
  { value: "Welded", label: "Welded" },
];

const INSTRUMENTS_PROTECTION_TYPE = [
  { value: "IP20", label: "IP20" },
  { value: "IP44", label: "IP44" },
  { value: "IP54", label: "IP54" },
  { value: "IP55", label: "IP55" },
  { value: "IP65", label: "IP65" },
  { value: "IP66", label: "IP66" },
  { value: "IP67", label: "IP67" },
  { value: "IP68", label: "IP68" },
  { value: "IP69K", label: "IP69K" },
  { value: "NEMA 4", label: "NEMA 4" },
  { value: "NEMA 4X", label: "NEMA 4X" },
];

export const INSTRUMENTS_CERTIFICATIONS = [
  { value: "atex", label: "ATEX" },
  { value: "ce", label: "CE" },
  { value: "csa", label: "CSA" },
  { value: "fm_approvals", label: "FM Approvals" },
  { value: "iecex", label: "IECEx" },
  { value: "ped", label: "PED" },
  { value: "rohs", label: "RoHS" },
  { value: "ul", label: "UL" },
];
