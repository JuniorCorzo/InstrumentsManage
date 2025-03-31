export interface LocationServiceDTO {
  estado: string;
}

export interface DepartmentServiceDTO extends LocationServiceDTO {
  resultado: { CODIGO_DEPARTAMENTO: string; NOMBRE_DEPARTAMENTO: string }[];
}

export interface MunicipalityServiceDTO extends LocationServiceDTO {
  resultado: { CODIGO_MUNICIPIO: string; NOMBRE_MUNICIPIO: string }[];
}
