import { InstrumentDomain } from "../interfaces/instrument-domain.interface";
import { Dispatch, RootState } from "../redux/stores/general.store";
import {
  fetchInstruments,
  removeInstrument,
  setInstrument,
  updateInstrument,
} from "../redux/reducers/instruments.reducer";
import {
  createInstruments,
  deleteInstruments,
  updateInstruments,
} from "../services/instruments.service";
import { useDispatch, useSelector } from "react-redux";
import { TableData } from "@/context/TableContext";

/**
 * Custom hook for managing instruments in the application
 *
 * This hook provides functionality to:
 * - Get the list of instruments
 * - Add new instruments
 * - Update existing instruments
 * - Delete instruments
 *
 * @returns {Object} An object with the following properties:
 *   - instruments: Array<InstrumentDomain> - List of instruments
 *   - addInstrument: (instrument: InstrumentDomain) => Promise<void> - Function to add an instrument
 *   - updateInstrument: (instrument: InstrumentDomain) => Promise<void> - Function to update an instrument
 *   - removeInstrument: (id: string) => Promise<void> - Function to delete an instrument
 */
export const useInstruments = () => {
  const dispatch = useDispatch<Dispatch>();
  const instruments = useSelector<RootState, InstrumentDomain[]>(
    (state) => state.instruments.data
  );

  /**
   * Fetches all instruments from the store
   * If there are no instruments, makes a request to get them
   */
  const fetchAllInstruments = () => {
    dispatch(fetchInstruments());
  };
  if (instruments.length === 0) fetchAllInstruments();

  /**
   ** Formats instrument data into a table structure
   *
   * @returns {TableData} An object containing:
   *   - headers: Array of column definitions with key and display value
   *   - rows: Array of instrument data formatted for table display
   *
   * @example
   * const tableData = getFormatTable();
   * // Returns:
   * // {
   * //   headers: [
   * //     { key: "model", value: "Modelo" },
   * //     { key: "brand", value: "Marca" },
   * //     { key: "type", value: "Tipo de Instrumento" }
   * //   ],
   * //   rows: [
   * //     { model: "ABC123", brand: "BrandName", type: "Guitar" },
   * //     ...
   * //   ]
   * // }
   */
  const getFormatTable = (): TableData => {
    return {
      headers: [
        {
          key: "model",
          value: "Modelo",
        },
        {
          key: "brand",
          value: "Marca",
        },
        {
          key: "type",
          value: "Tipo de Instrumento",
        },
      ],
      rows: instruments.map(({ brand, model, type }) => {
        return {
          model,
          type,
          brand: brand.name,
        };
      }),
    };
  };

  /**
   * Adds a new instrument
   * @param instrument - The instrument to add
   */
  const addInstrument = async (instrument: InstrumentDomain) => {
    try {
      await createInstruments(instrument);
      dispatch(setInstrument(instrument));
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Updates an existing instrument
   * @param instrument - The instrument with updated data
   */
  const update = async (instrument: InstrumentDomain) => {
    try {
      await updateInstruments(instrument);
      dispatch(updateInstrument(instrument));
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Deletes an instrument by its ID
   * @param id - The ID of the instrument to delete
   */
  const deleteInstrumentById = async (id: string) => {
    try {
      await deleteInstruments(id);
      dispatch(removeInstrument(id));
    } catch (err) {
      console.error(err);
    }
  };

  return {
		instruments,
    getFormatTable,
    addInstrument,
    updateInstrument: update,
    deleteInstrument: deleteInstrumentById,
  };
};
