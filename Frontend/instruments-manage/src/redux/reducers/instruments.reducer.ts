import { InstrumentsState } from "@/interfaces/states.interface";
import { InstrumentDomain } from "../../interfaces/instrument-domain.interface";
import { getAllInstruments } from "../../services/instruments.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InstrumentsState = {
  instruments: [],
  loading: false,
};

export const fetchInstruments = createAsyncThunk(
  "instruments/fetch",
  async () => {
    return await getAllInstruments();
  }
);

const instrumentsSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    setInstrument: (state, action: PayloadAction<InstrumentDomain>) => {
      state.instruments.push(action.payload);
    },
    setUpdateInstrument: (state, action: PayloadAction<InstrumentDomain>) => {
      const index = state.instruments.findIndex(
        ({ id }) => id === action.payload.id
      );

      if (index !== -1) {
        state.instruments[index] = action.payload;
      }
    },
    removeInstrument: (state, action: PayloadAction<string>) => {
      state.instruments = state.instruments.filter(
        ({ id }) => id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchInstruments.fulfilled,
      (state, action: PayloadAction<InstrumentDomain[]>) => {
        state.instruments = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchInstruments.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setInstrument, setUpdateInstrument, removeInstrument } =
  instrumentsSlice.actions;
export default instrumentsSlice.reducer;
