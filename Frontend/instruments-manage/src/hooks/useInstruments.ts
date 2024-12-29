import { InstrumentDomain } from "../interfaces/instrument-domain.interface"
import { Dispatch, RootState } from "../redux/stores/general.store"
import { fetchInstruments, removeInstrument, setInstrument, updateInstrument } from "../redux/reducers/instruments.reducer"
import { createInstruments, deleteInstruments, updateInstruments } from "../services/instruments.service"
import { useDispatch, useSelector } from "react-redux"

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
    const dispatch = useDispatch<Dispatch>()
    const instruments = useSelector<RootState, InstrumentDomain[]>(
        (state) => state.instruments.data
    )

    /**
     * Fetches all instruments from the store
     * If there are no instruments, makes a request to get them
     */
    const fetchAllInstruments = () => {
        dispatch(fetchInstruments())
    }
    if (instruments.length === 0) fetchAllInstruments()
   

    /**
     * Adds a new instrument
     * @param instrument - The instrument to add
     */
    const addInstrument = async (instrument: InstrumentDomain) => {
        try {
            await createInstruments(instrument)
            dispatch(setInstrument(instrument))
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Updates an existing instrument
     * @param instrument - The instrument with updated data
     */
    const update = async (instrument: InstrumentDomain) => {
        try {
            await updateInstruments(instrument)
            dispatch(updateInstrument(instrument))
        } catch (err) {
            console.error(err)
        }
    }
    
    /**
     * Deletes an instrument by its ID
     * @param id - The ID of the instrument to delete
     */
    const deleteInstrumentById = async (id: string) => {
        try {
            await deleteInstruments(id)
            dispatch(removeInstrument(id))
        } catch (err) {
            console.error(err)
        }
    }

    return {
        instruments,
        addInstrument,
        updateInstrument: update,
        deleteInstrument: deleteInstrumentById
    }
}


