import { Dispatch, RootState } from "@/redux/stores/general.store"
import { CampDomain } from "@/interfaces/camp-domain.interface" 
import { useDispatch, useSelector } from "react-redux"
import { fetchCamps, removeCamp, setCamp, setUpdateCamp } from "@/redux/reducers/camp.reducer"   
import { createCamp, deleteCamp, updateCamp } from "@/services/camp.service"

export const useCamp = () => {
    const dispatch = useDispatch<Dispatch>()
    const camp = useSelector<RootState, CampDomain[]>(
        (state) => state.camp.data
    )   

    const fetchAllCamp = () => {
        dispatch(fetchCamps())
    }
    if (camp.length === 0) fetchAllCamp()
    
    const addCamp = async (camp: CampDomain) => {
        try {
            await createCamp(camp)
            dispatch(setCamp(camp))
        } catch (error) {
            console.error(error)
        }
    }

    const update = async (camp: CampDomain) => {
        try {
            await updateCamp(camp)
            dispatch(setUpdateCamp(camp))
        } catch (error) {
            console.error(error)
        }
    }   

    const deleteCampById = async (id: string) => {  
        try {
            await deleteCamp(id)
            dispatch(removeCamp(id))
        } catch (error) {
            console.error(error)
        }
    }   

    return {
        camp,
        addCamp,
        updateCamp: update,
        deleteCamp: deleteCampById
    }   
}