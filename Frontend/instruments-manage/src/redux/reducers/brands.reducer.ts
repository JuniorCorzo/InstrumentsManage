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
        setBrand: (state, action: PayloadAction<BrandDomain>) => {
            state.data.push(action.payload)
        },
        updateBrand: (state, action: PayloadAction<BrandDomain>) => {
            const index = state.data.findIndex(({id}) => id === action.payload.id)
            
            if (index !== -1) {
                state.data[index] = action.payload
            }
        },
        deleteBrand: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(({id}) => id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBrands.fulfilled, (state, action: PayloadAction<BrandDomain[]>) => {
            state.data = action.payload
        })
    }
})

export const { 
    setBrand, 
    updateBrand, 
    deleteBrand 
} = brandsSlice.actions
export const BrandsReducer = brandsSlice.reducer
