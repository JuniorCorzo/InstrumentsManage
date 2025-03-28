import { CampDomain } from "@/interfaces/camp-domain.interface";
import { ModalConfig } from "@/interfaces/modal-config.interface";

export const UNIT_PROCESS_MODAL_FORM = (camps: CampDomain[]): ModalConfig => {
  return {
    title: "Añadir una Nueva Unidad",
    fields: [
      {
        type: "text",
        field: {
          name: "name",
          label: "Unidad de Proceso",
          placeholder: "Unidad de CO2",
        },
      },
      {
        type: "text",
        field: {
          name: "description",
          label: "Descripción",
          placeholder: "Descripción",
        },
      },
      {
        type: "select",
        field: {
          name: "camp",
          label: "Campo",
          placeholder: "Campo Cúcuta",
          options: camps?.map(({ id, name }) => {
            return {
              value: id,
              label: name,
            };
          }),
        },
      },
    ],
  };
};
