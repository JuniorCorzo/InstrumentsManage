import { BrandsState } from "@/interfaces/states.interface";
import { BrandDomain } from "@/interfaces/brand-domain.interface";
import { getAllBrands } from "../../services/brands.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BrandsState = {
  brands: [],
  loading: false,
};

export const fetchBrands = createAsyncThunk("brands/fetch", async () => {
  return await getAllBrands();
});

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<BrandDomain>) => {
      state.brands.push(action.payload);
    },
    setUpdateBrand: (state, action: PayloadAction<BrandDomain>) => {
      const indexBrand = state.brands.findIndex(
        ({ id }) => id === action.payload.id
      );
      if (indexBrand > -1) {
        state.brands[indexBrand] = action.payload;
      }
    },
    removeBrand: (state, action: PayloadAction<string>) => {
      state.brands = state.brands.filter(({ id }) => id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchBrands.fulfilled,
      (state, action: PayloadAction<BrandDomain[]>) => {
        state.brands = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchBrands.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setBrand, setUpdateBrand, removeBrand } = brandsSlice.actions;
export const BrandsReducer = brandsSlice.reducer;
