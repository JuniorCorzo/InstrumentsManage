import { BrandDomain } from "@/interfaces/brand-domain.interface";
import { ModalConfig } from "@/interfaces/modal-config.interface";

export const INSTRUMENTS_MODAL_CONFIG = (
  brands: BrandDomain[]
): ModalConfig => {
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
          name: "marca",
          placeholder: "Marca",
          options: brands.map(({ id, name }) => {
            return { value: id, label: name };
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
          name: "range",
          label: "Rango",
          placeholder: "0-100 PSI ...",
        },
      },
      {
        type: "text",
        field: {
          name: "accuracy",
          label: "Precisión",
          placeholder: "±0.05% ...",
        },
      },
      {
        type: "select",
        field: {
          name: "connection",
          label: "Conexión",
          placeholder: '1/2" NPT, G1/2 ...',
          options: INSTRUMENTS_CONNECTION,
          isMulti: true,
        },
      },
      {
        type: "select",
        field: {
          name: "connection_process",
          label: "Proceso de Conexión",
          placeholder: "Flanged ...",
          options: INSTRUMENTS_CONNECTION_PROCESS,
        },
      },
      {
        type: "select",
        field: {
          name: "protection_type",
          label: "Protección",
          placeholder: "IP20 ...",
          options: INSTRUMENTS_PROTECTION_TYPE,
        },
      },
      {
        type: "select",
        field: {
          name: "certification",
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
  { value: "analizadores_gases", label: "Analizadores de gases" },
  { value: "analizadores_particulas", label: "Analizadores de partículas" },
  { value: "analizadores_quimicos", label: "Analizadores químicos" },
  { value: "celdas_carga", label: "Celdas de carga" },
  { value: "interruptores_flujo", label: "Interruptores de flujo" },
  { value: "medidores_caudal", label: "Medidores de caudal" },
  { value: "medidores_conductividad", label: "Medidores de conductividad" },
  { value: "medidores_energia", label: "Medidores de energía" },
  { value: "medidores_flujo", label: "Medidores de flujo" },
  { value: "medidores_ph", label: "Medidores de pH" },
  { value: "medidores_torque", label: "Medidores de torque" },
  { value: "medidores_turbidez", label: "Medidores de turbidez" },
  { value: "sensores_co2", label: "Sensores de CO2" },
  { value: "sensores_densidad", label: "Sensores de densidad" },
  { value: "sensores_humedad", label: "Sensores de humedad" },
  { value: "sensores_nivel", label: "Sensores de nivel" },
  { value: "sensores_oxigeno", label: "Sensores de oxígeno" },
  {
    value: "sensores_presion_diferencial",
    label: "Sensores de presión diferencial",
  },
  { value: "sensores_temperatura", label: "Sensores de temperatura" },
  { value: "sensores_velocidad", label: "Sensores de velocidad" },
  { value: "sensores_vibracion", label: "Sensores de vibración" },
  { value: "transmisores_nivel", label: "Transmisor de nivel" },
  { value: "transmisores_presion", label: "Transmisor de presión" },
  { value: "transmisores_temperatura", label: "Transmisor de Temperatura" },
  { value: "termopares", label: "Termopares" },
];

const INSTRUMENTS_CONNECTION = [
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
  { value: "camlock", label: "Camlock" },
  { value: "clamp", label: "Clamp" },
  { value: "compression", label: "Compression" },
  { value: "flanged", label: "Flanged" },
  { value: "quick_connect", label: "Quick Connect" },
  { value: "soldered", label: "Soldered" },
  { value: "threaded", label: "Threaded" },
  { value: "welded", label: "Welded" },
];

const INSTRUMENTS_PROTECTION_TYPE = [
  { value: "ip20", label: "IP20" },
  { value: "ip44", label: "IP44" },
  { value: "ip54", label: "IP54" },
  { value: "ip55", label: "IP55" },
  { value: "ip65", label: "IP65" },
  { value: "ip66", label: "IP66" },
  { value: "ip67", label: "IP67" },
  { value: "ip68", label: "IP68" },
  { value: "ip69k", label: "IP69K" },
  { value: "nema_4", label: "NEMA 4" },
  { value: "nema_4x", label: "NEMA 4X" },
];

const INSTRUMENTS_CERTIFICATIONS = [
  { value: "atex", label: "ATEX" },
  { value: "ce", label: "CE" },
  { value: "csa", label: "CSA" },
  { value: "fm_approvals", label: "FM Approvals" },
  { value: "iecex", label: "IECEx" },
  { value: "ped", label: "PED" },
  { value: "rohs", label: "RoHS" },
  { value: "ul", label: "UL" },
];
