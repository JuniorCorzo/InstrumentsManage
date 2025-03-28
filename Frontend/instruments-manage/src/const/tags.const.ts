import { InstrumentDomain } from "@/interfaces/instrument-domain.interface";
import { ModalConfig } from "@/interfaces/modal-config.interface";
import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";

export const TAGS_MODAL_FORM = (
  instruments: InstrumentDomain[],
  unitProcess: UnitProcessDomain[]
): ModalConfig => {
  return {
    title: "Añadir una Nueva Tag",
    fields: [
      {
        type: "text",
        field: {
          name: "tag",
          label: "Tag",
          placeholder: "PIT-001",
        },
      },
      {
        type: "text",
        field: {
          name: "description",
          label: "Descripción",
          placeholder: "descripción",
        },
      },
      {
        type: "select",
        field: {
          name: "id_instrument",
          label: "Instrumento",
          placeholder: "Instrumento",
          options: instruments?.map(({ id, model }) => {
            return { value: id, label: model };
          }),
        },
      },
      {
        type: "select",
        field: {
          name: "id_unit_process",
          label: "Unidad de Proceso",
          placeholder: "Unidad de Proceso",
          options: unitProcess?.map(({ id, name }) => {
            return { value: id, label: name };
          }),
        },
      },

      {
        type: "select",
        field: {
          name: "type_unit",
          label: "Unidad de Medición",
          placeholder: "PSI",
          options: TAGS_TYPE_UNIT,
        },
      },
      {
        type: "text",
        field: {
          name: "hh",
          label: "Alarma HH",
          placeholder: "150",
        },
      },
      {
        type: "text",
        field: {
          name: "h",
          label: "Alarma H",
          placeholder: "125",
        },
      },
      {
        type: "text",
        field: {
          name: "l",
          label: "Alarma L",
          placeholder: "100",
        },
      },
      {
        type: "text",
        field: {
          name: "ll",
          label: "Alarma LL",
          placeholder: "85",
        },
      },
      {
        type: "checkbox",
        field: {
          name: "is_shutdown",
          label: "Shutdown",
        },
      },
    ],
  };
};

const TAGS_TYPE_UNIT = [
  { value: "amp", label: "Amperio (A)" },
  { value: "bar", label: "Bar" },
  { value: "celsius", label: "Celsius (°C)" },
  { value: "cm", label: "Centímetro (cm)" },
  { value: "fahrenheit", label: "Fahrenheit (°F)" },
  { value: "g", label: "Gramo (g)" },
  { value: "hertz", label: "Hertz (Hz)" },
  { value: "kelvin", label: "Kelvin (K)" },
  { value: "kg", label: "Kilogramo (kg)" },
  { value: "kpa", label: "Kilopascal (kPa)" },
  { value: "l", label: "Litro (L)" },
  { value: "m", label: "Metro (m)" },
  { value: "m3", label: "Metro cúbico (m³)" },
  { value: "mm", label: "Milímetro (mm)" },
  { value: "ft", label: "Pie (ft)" },
  { value: "in", label: "Pulgada (in)" },
  { value: "rpm", label: "Revoluciones por minuto (rpm)" },
  { value: "w", label: "Vatio (W)" },
  { value: "v", label: "Voltio (V)" },
];
