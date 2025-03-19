import { Dispatch, RootState } from "@/redux/stores/general.store";
import { CampDomain } from "@/interfaces/camp-domain.interface";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCamps,
  removeCamp,
  setCamp,
  setUpdateCamp,
} from "@/redux/reducers/camp.reducer";
import { createCamp, deleteCamp, updateCamp } from "@/services/camp.service";
import { TableData } from "@/context/TableContext";
import { useEffect, useMemo } from "react";
import { CampState } from "@/interfaces/states.interface";
import { transformToString } from "@/utils/transform-string.utils";
import { TABLE_METADATA } from "@/const/table-metadata.const";

export const useCamps = () => {
  const dispatch = useDispatch<Dispatch>();
  const campState = useSelector<RootState, CampState>((state) => state.camp);
  const { camps } = campState;

  const refreshCampsState = () => {
    useEffect(() => {
      dispatch(fetchCamps());
    }, []);
  };
  refreshCampsState();

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

  const addCamp = async (camp: CampDomain) => {
    try {
      await createCamp(camp);
      dispatch(setCamp(camp));
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (camp: CampDomain) => {
    try {
      await updateCamp(camp);
      dispatch(setUpdateCamp(camp));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCampById = async (id: string) => {
    try {
      await deleteCamp(id);
      dispatch(removeCamp(id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    campState,
    refreshCampsState,
    getFormatTable,
    addCamp,
    updateCamp: update,
    deleteCamp: deleteCampById,
  };
};
