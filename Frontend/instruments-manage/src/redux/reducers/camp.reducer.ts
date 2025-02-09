import { CampState } from "@/interfaces/states.interface";
import { CampDomain } from "../../interfaces/camp-domain.interface";
import { getAllCamps } from "../../services/camp.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CampState = {
  camps: [],
  loading: false,
};

export const fetchCamps = createAsyncThunk("camps/fetch", async () => {
  return await getAllCamps();
});

const campSlice = createSlice({
  name: "camps",
  initialState,
  reducers: {
    setCamp: (state, action: PayloadAction<CampDomain>) => {
      state.camps.push(action.payload);
    },
    setUpdateCamp: (state, action: PayloadAction<CampDomain>) => {
      const indexCamp = state.camps.findIndex(
        ({ id }) => id === action.payload.id
      );

      if (indexCamp > -1) {
        state.camps[indexCamp] = action.payload;
      }
    },
    removeCamp: (state, action: PayloadAction<string>) => {
      state.camps = state.camps.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCamps.fulfilled,
      (state, action: PayloadAction<CampDomain[]>) => {
        state.camps = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchCamps.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setCamp, setUpdateCamp, removeCamp } = campSlice.actions;
export const CampReducer = campSlice.reducer;
