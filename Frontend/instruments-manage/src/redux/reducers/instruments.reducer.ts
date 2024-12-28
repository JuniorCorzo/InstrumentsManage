import { InstrumentsState } from "@/interfaces/states.interface";
import { InstrumentDomain } from "../../interfaces/instrument-domain.interface";
import { getAllInstruments } from "../../services/instruments.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InstrumentsState = {
    data: []
}

export const fetchInstruments = createAsyncThunk(
    'instruments/fetch',
    async () => {
        return await getAllInstruments()
    }
)

const instrumentsSlice = createSlice({
    name: 'instruments',
    initialState,
    reducers: {
        setInstruments: (state, action: PayloadAction<InstrumentDomain[]>) => {
            state.data = action.payload
        },
        setOneInstrument: (state, action: PayloadAction<InstrumentDomain>) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInstruments.fulfilled, (state, action: PayloadAction<InstrumentDomain[]>) => {
            state.data = action.payload
        })
    }
})




export const { setInstruments, setOneInstrument } = instrumentsSlice.actions
export default instrumentsSlice.reducer