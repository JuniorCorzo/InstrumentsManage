import axios from "axios";
import {
  DepartmentAdapter,
  MunicipalityAdapter,
} from "@/adapters/location-service.adapter";
import {
  DepartmentServiceDomain,
  MunicipalityServiceDomain,
} from "@/interfaces/location-service.interface";
import {
  DepartmentServiceDTO,
  MunicipalityServiceDTO,
} from "@/models/location-service.model";

/*
 *
 * This service uses the API's DIAN to obtain information on the municipality
 * and department of Colombia.
 *
 * https://geoportal.dane.gov.co/servicios/descarga-y-metadatos/datos-geoestadisticos/?cod=112
 *
 */

export const getDepartments = async (): Promise<DepartmentServiceDomain[]> => {
  const result: DepartmentServiceDTO = await axios
    .get(`/api/location/departamentos.php`)
    .then((result) => {
      if (result.status !== 200) {
        throw Error(result.statusText);
      }

      return result.data as DepartmentServiceDTO;
    });

  return DepartmentAdapter(result);
};

export const getMunicipality = async (
  departmentCode: string
): Promise<MunicipalityServiceDomain[]> => {
  if (!departmentCode || departmentCode === "") {
    return [];
  }

  const result: MunicipalityServiceDTO = await axios
    .get(`/api/location/municipios.php?codigo_departamento=${departmentCode}`)
    .then((result) => {
      if (result.status !== 200) {
        throw Error(result.statusText);
      }

      return result.data as MunicipalityServiceDTO;
    });

  return MunicipalityAdapter(result);
};
