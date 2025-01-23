import { BrandsState } from "@/interfaces/states.interface";
import { BrandDomain } from "@/interfaces/brand-domain.interface";
import { getAllBrands } from "../../services/brands.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BrandsState = {
    data: []
}

export const fetchBrands = createAsyncThunk(
    'brands/fetch',
    async () => {
        return await getAllBrands()
    }
)

const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        setBrands: (state, action: PayloadAction<BrandDomain[]>) => {
            state.data = action.payload
        },
        setOneBrand: (state, action: PayloadAction<BrandDomain>) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBrands.fulfilled, (state, action: PayloadAction<BrandDomain[]>) => {
            state.data = action.payload
        })
    }
})

export const { setBrands, setOneBrand } = brandsSlice.actions
export const BrandsReducer = brandsSlice.reducer
