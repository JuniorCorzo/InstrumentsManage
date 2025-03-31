/**
 * @fileoverview Custom hook for managing unit process operations using Redux.
 * @module useUnitProcess
 */

import { useMemo } from "react";
import { TableData } from "@/context/TableContext";
import { TABLE_METADATA } from "@/const/table-metadata.const";
import { useUnitProcessState } from "@/states/queries/useUnitProcessState";
import { CreateUnitProcessDTO } from "@/models";

/**
 * Custom hook for managing unit processes in the application.
 *
 * @returns {Object} An object containing the following properties and methods:
 * @property {UnitProcessDomain[]} unitProcess - Array of unit processes stored in the state.
 * @property {Function} addUnitProcess - Function to add a new unit process.
 * @property {Function} updateUnitProcess - Function to update an existing unit process.
 * @property {Function} deleteUnitProcess - Function to delete a unit process.
 *
 * @example
 * ```tsx
 * const { unitProcess, addUnitProcess, updateUnitProcess, deleteUnitProcess } = useUnitProcess();
 *
 * // Add a new unit process
 * const newProcess = { id: '1', name: 'New Process' };
 * await addUnitProcess(newProcess);
 *
 * // Update a unit process
 * const updatedProcess = { id: '1', name: 'Updated Process' };
 * await updateUnitProcess(updatedProcess);
 *
 * // Delete a unit process
 * await deleteUnitProcess('1');
 * ```
 */
export const useUnitProcess = () => {
  const {
    unitProcessQuery,
    createUnitProcessMutation,
    updateUnitProcessMutation,
    deleteUnitProcessMutation,
  } = useUnitProcessState();
  const { unitProcess } = unitProcessQuery();

  /**
   * Generates the table format for displaying unit process data.
   *
   * @returns {TableData} Table structure containing unit process information
   */
  const getFormatTable = useMemo((): TableData => {
    return {
      tableMetadata: TABLE_METADATA.unitProcess,
      columns: [
        {
          accessorKey: "name",
          header: "Unidad de Proceso",
        },
        {
          accessorKey: "description",
          header: "Descripción",
        },
        {
          accessorKey: "camp",
          header: "Campo",
        },
      ],
      data: unitProcess.map(({ name, description, camp }) => ({
        name,
        description,
        camp: camp.name,
      })),
      messageEmpty: "No se encontraron unidades de procesos registradas",
    };
  }, [unitProcess]);
  /**
   * Adds a new unit process to the system.
   *
   * @async
   * @param {CreateUnitProcessDTO} unitProcess - Object containing the unit process information to create.
   * @throws {Error} If there's an error creating the unit process on the server.
   *
   * @example
   * ```typescript
   * await addUnitProcess({
   *   id: '123',
   *   name: 'New Process',
   *   description: 'Process description'
   * });
   * ```
   */
  const createUnitProcess = (unitProcess: CreateUnitProcessDTO) => {
    try {
      const { mutate } = createUnitProcessMutation;
      mutate(unitProcess);
    } catch (error) {
      console.error("Error creating unit process:", error);
      throw error;
    }
  };

  /**
   * Updates an existing unit process in the system.
   *
   * @async
   * @param {CreateUnitProcessDTO} unitProcess - Object containing the updated unit process information.
   * @throws {Error} If there's an error updating the unit process on the server.
   *
   * @example
   * ```typescript
   * await updateUnitProcess({
   *   id: '123',
   *   name: 'Updated Process',
   *   description: 'New description'
   * });
   * ```
   */
  const updateUnitProcess = async (unitProcess: CreateUnitProcessDTO) => {
    try {
      const { mutate } = updateUnitProcessMutation;
      mutate(unitProcess);
    } catch (error) {
      console.error("Error updating unit process:", error);
      throw error;
    }
  };

  /**
   * Deletes a unit process from the system.
   *
   * @async
   * @param {string} id - Unique identifier of the unit process to delete.
   * @throws {Error} If there's an error deleting the unit process from the server.
   *
   * @example
   * ```typescript
   * await deleteUnitProcess('123');
   * ```
   */
  const deleteUnitProcess = async (id: string) => {
    try {
      const { mutate } = deleteUnitProcessMutation;
      mutate(id);
    } catch (error) {
      console.error("Error deleting unit process:", error);
      throw error;
    }
  };

  return {
    unitProcessState: unitProcessQuery(),
    getFormatTable,
    createUnitProcess,
    updateUnitProcess,
    deleteUnitProcess,
  };
};
