import { TableData } from "@/context/TableContext";
import { useMemo } from "react";
import { transformToString } from "@/utils/transform-string.utils";
import { TABLE_METADATA } from "@/const/table-metadata.const";
import { CreateCampDTO, UpdateCampDTO } from "@/models";
import { useCampState } from "@/states/queries/camp.query";

export const useCamps = () => {
  const {
    campQuery,
    createCampMutation,
    updateCampMutation,
    deleteCampMutation,
  } = useCampState();

  const { camps } = campQuery();

  /**
   * Formats camp data into a table structure
   *
   * @returns {TableData} An object containing:
   *   - headers: Array of column definitions with key and display value
   *   - rows: Array of camp data formatted for table display
   *
   * @example
   * const tableData = getFormatTable();
   * // Returns:
   * // {
   * //   headers: [
   * //     { key: "name", value: "Campo" }
   * //   ],
   * //   rows: [
   * //     { name: "Camp Name" },
   * //     ...
   * //   ]
   * // }
   */
  const getFormatTable = useMemo((): TableData => {
    return {
      tableMetadata: TABLE_METADATA.camps,
      columns: [
        {
          accessorKey: "name",
          header: "Campo",
        },
        {
          accessorKey: "location",
          header: "Ubicación",
        },
        {
          accessorKey: "coordinates",
          header: "Coordenadas",
        },
      ],
      data: camps.map(({ name, location }) => {
        const { municipality, department, country, coordinate } = location;
        return {
          name,
          location: transformToString([municipality, department, country]),
          coordinates: transformToString(coordinate),
        };
      }),
      messageEmpty: "No se encontraron campos registrados",
    };
  }, [camps]);

  const createCamp = async (camp: CreateCampDTO) => {
    try {
      const { mutate } = createCampMutation();
      mutate(camp);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCamp = async (camp: UpdateCampDTO) => {
    try {
      const { mutate } = updateCampMutation();
      mutate(camp);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCamp = async (id: string) => {
    try {
      const { mutate } = deleteCampMutation();
      mutate(id);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    campState: campQuery(),
    getFormatTable,
    createCamp,
    updateCamp,
    deleteCamp,
  };
};
