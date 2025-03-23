import { useInstrumentState } from "../states/queries/instruments.query";
import { TableData } from "@/context/TableContext";
import { useMemo } from "react";
import { transformToString } from "@/utils/transform-string.utils";
import { TABLE_METADATA } from "@/const/table-metadata.const";
import { CreateInstrumentsDTO, UpdateInstrumentsDTO } from "@/models";

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
  const {
    instrumentQuery,
    createInstrumentMutation,
    updateInstrumentMutation,
    deleteInstrumentMutation,
  } = useInstrumentState();
  const { instruments } = instrumentQuery();

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
  const getFormatTable = useMemo((): TableData => {
    return {
      tableMetadata: TABLE_METADATA.instruments,
      columns: [
        {
          accessorKey: "model",
          header: "Modelo",
        },
        {
          accessorKey: "brand",
          header: "Marca",
        },
        {
          accessorKey: "type",
          header: "Tipo",
        },
        {
          accessorKey: "measurementRange",
          header: "Rango",
        },
        {
          accessorKey: "accuracy",
          header: "Precisión",
        },
        {
          accessorKey: "connectionType",
          header: "Conexión",
        },
        {
          accessorKey: "processConnection",
          header: "Proceso de Conexión",
        },
        {
          accessorKey: "protectionClass",
          header: "Protección",
        },
        {
          accessorKey: "certifications",
          header: "Certificaciones",
        },
      ],
      data: instruments.map(
        ({
          brand,
          model,
          type,
          measurementRange,
          accuracy,
          connectionType,
          processConnection,
          protectionClass,
          certifications,
        }) => {
          return {
            model,
            brand,
            type,
            measurementRange,
            accuracy,
            connectionType: transformToString(connectionType),
            processConnection,
            protectionClass,
            certifications: transformToString(certifications),
          };
        }
      ),
      messageEmpty: "No se encontraron instrumentos registrados",
    };
  }, [instruments]);

  /**
   * Adds a new instrument
   * @param instrument - The instrument to add
   */
  const createInstrument = async (instrument: CreateInstrumentsDTO) => {
    try {
      const { mutate } = createInstrumentMutation();
      mutate(instrument);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Updates an existing instrument
   * @param instrument - The instrument with updated data
   */
  const updateInstrument = async (instrument: UpdateInstrumentsDTO) => {
    try {
      const { mutate } = updateInstrumentMutation();
      mutate(instrument);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Deletes an instrument by its ID
   * @param id - The ID of the instrument to delete
   */
  const deleteInstrument = async (id: string) => {
    try {
      const { mutate } = deleteInstrumentMutation();
      mutate(id);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    instrumentingState: instrumentQuery(),
    getFormatTable,
    createInstrument,
    updateInstrument,
    deleteInstrument,
  };
};
