import { BrandsState } from "@/interfaces/states.interface";
import { BrandDomain } from "@/interfaces/brand-domain.interface";
import { getAllBrands } from "../../services/brands.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BrandsState = {
  data: [],
};

export const fetchBrands = createAsyncThunk("brands/fetch", async () => {
  return await getAllBrands();
});

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<BrandDomain>) => {
      state.data.push(action.payload);
    },
    setUpdateBrand: (state, action: PayloadAction<BrandDomain>) => {
      const indexBrand = state.data.findIndex(
        ({ id }) => id === action.payload.id
      );
      if (indexBrand > -1) {
        state.data[indexBrand] = action.payload;
      }
    },
    removeBrand: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(({ id }) => id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchBrands.fulfilled,
      (state, action: PayloadAction<BrandDomain[]>) => {
        state.data = action.payload;
      }
    );
  },
});

export const { setBrand, setUpdateBrand, removeBrand } = brandsSlice.actions;
export const BrandsReducer = brandsSlice.reducer;
