import { ModalConfig } from "@/interfaces/modal-config.interface";
import {
  DepartmentServiceDomain,
  MunicipalityServiceDomain,
} from "@/interfaces/location-service.interface";
import type { onChangeSelect } from "@/interfaces/modal-config.interface";

export const CAMPS_MODAL_FORM = (
  departments: DepartmentServiceDomain[],
  municipalities: MunicipalityServiceDomain[],
  setDepartmentCode: onChangeSelect,
  disable: boolean
): ModalConfig => {
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
        type: "select",
        field: {
          name: "department",
          label: "Departamento",
          placeholder: "Norte de Santander",
          options: departments.map((department) => ({
            label: department.departmentName,
            value: department.departmentName,
          })),
          onChange: setDepartmentCode,
        },
      },
      {
        type: "select",
        field: {
          name: "municipality",
          label: "Municipio",
          placeholder: "Cúcuta",
          options: municipalities.map((municipality) => ({
            label: municipality.municipalityName,
            value: municipality.municipalityName,
          })),
          disable,
        },
      },
      {
        type: "text",
        field: {
          name: "coordinate",
          label: "Coordenadas",
          placeholder: "1,0000, 1,0000",
        },
      },
    ],
  };
};
