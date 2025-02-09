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

export const useCamps = () => {
  const dispatch = useDispatch<Dispatch>();
  const camp = useSelector<RootState, CampDomain[]>((state) => state.camp.data);

  const fetchAllCamp = () => {
    dispatch(fetchCamps());
  };
  if (camp.length === 0) fetchAllCamp();

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
  const getFormatTable = (): TableData => {
    return {
      headers: [
        {
          key: "name",
          value: "Campo",
        },
      ],
      rows: camp.map(({ name }) => {
        return {
          name,
        };
      }),
    };
  };

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
    camp,
    getFormatTable,
    addCamp,
    updateCamp: update,
    deleteCamp: deleteCampById,
  };
};
