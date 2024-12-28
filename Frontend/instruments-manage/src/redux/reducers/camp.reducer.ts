import { CampState } from "@/interfaces/states.interface";
import { CampDomain } from "../../interfaces/camp-domain.interface";
import { getAllCamps } from "../../services/camp.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CampState = {
    data: []
}

export const fetchCamps = createAsyncThunk(
    'camps/fetch',
    async () => {
        return await getAllCamps()
    }
)

const campSlice = createSlice({
    name: 'camps',
    initialState,
    reducers: {
        setCamps: (state, action: PayloadAction<CampDomain[]>) => {
            state.data = action.payload
        },
        setOneCamp: (state, action: PayloadAction<CampDomain>) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCamps.fulfilled, (state, action: PayloadAction<CampDomain[]>) => {
            state.data = action.payload
        })
    }
})

export const { setCamps, setOneCamp } = campSlice.actions
export const CampReducer = campSlice.reducer
