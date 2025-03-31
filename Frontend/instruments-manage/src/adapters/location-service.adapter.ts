import {
  DepartmentServiceDomain,
  MunicipalityServiceDomain,
} from "@/interfaces/location-service.interface";
import {
  DepartmentServiceDTO,
  MunicipalityServiceDTO,
} from "@/models/location-service.model";

export const DepartmentAdapter = (
  departmentDTO: DepartmentServiceDTO
): DepartmentServiceDomain[] => {
  return departmentDTO.resultado.map(
    ({ CODIGO_DEPARTAMENTO, NOMBRE_DEPARTAMENTO }): DepartmentServiceDomain => {
      return {
        departmentCode: CODIGO_DEPARTAMENTO,
        departmentName: NOMBRE_DEPARTAMENTO,
      };
    }
  );
};

export const MunicipalityAdapter = (
  municipalityDTO: MunicipalityServiceDTO
): MunicipalityServiceDomain[] => {
  return municipalityDTO.resultado.map(
    ({ CODIGO_MUNICIPIO, NOMBRE_MUNICIPIO }): MunicipalityServiceDomain => {
      return {
        municipalityCode: CODIGO_MUNICIPIO,
        municipalityName: NOMBRE_MUNICIPIO,
      };
    }
  );
};
