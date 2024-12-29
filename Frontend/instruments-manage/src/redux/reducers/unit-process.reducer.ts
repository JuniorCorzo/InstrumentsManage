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
        setUnitProcess: (state, action: PayloadAction<UnitProcessDomain>) => {
            state.data.push(action.payload)
        },
        setUpdateUnitProcess: (state, action: PayloadAction<UnitProcessDomain>) => {
            const index = state.data.findIndex(({id}) => id === action.payload.id)
            
            if (index !== -1) {
                state.data[index] = action.payload
            }
        },
        removeUnitProcess: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(({id}) => id !== action.payload)
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(fetchUnitProcess.fulfilled, (state, action: PayloadAction<UnitProcessDomain[]>) => {
            state.data = action.payload
        })
    }
})

export const {
    setUnitProcess, 
    setUpdateUnitProcess, 
    removeUnitProcess
} = UnitProcessSlice.actions
export const UnitProcessReducer = UnitProcessSlice.reducer