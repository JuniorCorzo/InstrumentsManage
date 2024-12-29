/**
 * @fileoverview Custom hook for managing unit process operations using Redux.
 * @module useUnitProcess
 */

import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/redux/stores/general.store";
import { fetchUnitProcess, removeUnitProcess, setUnitProcess, setUpdateUnitProcess } from "@/redux/reducers/unit-process.reducer";
import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";
import { createUnitProcess, updateUnitProcess } from "@/services/unit-process.service";

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
    const dispatch = useDispatch<Dispatch>()
    const unitProcess = useSelector<RootState, UnitProcessDomain[]>(
        (state) => state.unitProcess.data
    )

    /**
     * Fetches all unit processes from the server and stores them in the state.
     * @private
     */
    const fetchAllUnitProcess = () => {
        dispatch(fetchUnitProcess())
    }
    
    if (unitProcess.length === 0) fetchAllUnitProcess()

    /**
     * Adds a new unit process to the system.
     * 
     * @async
     * @param {UnitProcessDomain} unitProcess - Object containing the unit process information to create.
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
    const addUnitProcess = async (unitProcess: UnitProcessDomain) => {
        try {
            await createUnitProcess(unitProcess)
            dispatch(setUnitProcess(unitProcess))
        } catch (error) {
            console.error('Error creating unit process:', error)
            throw error
        }
    }

    /**
     * Updates an existing unit process in the system.
     * 
     * @async
     * @param {UnitProcessDomain} unitProcess - Object containing the updated unit process information.
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
    const update = async (unitProcess: UnitProcessDomain) => {           
        try {
            await updateUnitProcess(unitProcess)
            dispatch(setUpdateUnitProcess(unitProcess))
        } catch (error) {
            console.error('Error updating unit process:', error)
            throw error
        }
    }

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
            await deleteUnitProcess(id)
            dispatch(removeUnitProcess(id))
        } catch (error) {
            console.error('Error deleting unit process:', error)
            throw error
        }
    }
    
    return {
        unitProcess,
        addUnitProcess,
        updateUnitProcess: update,
        deleteUnitProcess
    }
}