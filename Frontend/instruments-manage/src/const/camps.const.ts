import { ModalConfig } from "@/interfaces/modal-config.interface";

export const CAMPS_MODAL_FORM = (): ModalConfig => {
  return {
    title: "Añadir un Nuevo Campo",
    fields: [
      {
        type: "text",
        field: {
          name: "name",
          label: "Nombre del Campo",
          placeholder: "Campo Cúcuta",
        },
      },
      {
        type: "text",
        field: {
          name: "ubication",
          label: "Ubicación",
          placeholder: "municipio, departamento",
        },
      },
      {
        type: "text",
        field: {
          name: "coordinate",
          label: "Coordenadas",
          placeholder: "1,0000 1,0000",
        },
      },
    ],
  };
};
