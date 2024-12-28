import { UnitProcessState } from "@/interfaces/states.interface";
import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";
import { getAllUnitProcesses } from "@/services/unit-process.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UnitProcessState = {
    data: []
}

export const fetchUnitProcess = createAsyncThunk(
    'unitProcess/fetch',
    async () => {
        return await getAllUnitProcesses()        
    }
)

const UnitProcessSlice = createSlice({
    name: 'unitProcess',
    initialState,
    reducers: {
        setUnitProcess: (state, action: PayloadAction<UnitProcessDomain[]>) => {
            state.data = action.payload
        },
        setOneUnitProcess: (state, action: PayloadAction<UnitProcessDomain>) => {
            state.data.push(action.payload)
        } 
    }, 
    extraReducers: (builder) => {
        builder.addCase(fetchUnitProcess.fulfilled, (state, action: PayloadAction<UnitProcessDomain[]>) => {
            state.data = action.payload
        })
    }
})

export const {setUnitProcess, setOneUnitProcess} = UnitProcessSlice.actions
export const UnitProcessReducer = UnitProcessSlice.reducer