import { ModalConfig } from "@/interfaces/modal-config.interface";

export const BRANDS_MODAL_FORM = (): ModalConfig => {
  return {
    title: "Añadir una Nueva Marca",
    fields: [
      {
        type: "text",
        field: {
          name: "name",
          label: "Marca",
          placeholder: "Krohne",
        },
      },
      {
        type: "text",
        field: {
          name: "country",
          label: "País",
          placeholder: "Colombia",
        },
      },
      {
        type: "text",
        field: {
          name: "website",
          label: "Pagina de la Marca",
          placeholder: "Pagina de la Marca",
        },
      },
    ],
  };
};
