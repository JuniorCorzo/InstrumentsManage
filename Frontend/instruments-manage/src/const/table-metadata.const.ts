export interface TableMetadata {
  titleTable: string;
  urlParam: string;
}

export const TABLE_METADATA = Object.freeze({
  instruments: {
    titleTable: "Tabla de Instrumentos",
    urlParam: "instruments",
  },
  brands: {
    titleTable: "Tabla de Marcas",
    urlParam: "brands",
  },
  tags: {
    titleTable: "Tabla de Tags",
    urlParam: "tags",
  },
  unitProcess: {
    titleTable: "Tabla de Unidades de Proceso",
    urlParam: "process-units",
  },
  camps: {
    titleTable: "Tabla de Campos",
    urlParam: "camps",
  },
});
