import { InstrumentsState } from "@/interfaces/states.interface";
import { InstrumentDomain } from "../../interfaces/instrument-domain.interface";
import { getAllInstruments } from "../../services/instruments.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InstrumentsState = {
  data: [],
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
      state.data.push(action.payload);
    },
    setUpdateInstrument: (state, action: PayloadAction<InstrumentDomain>) => {
      const index = state.data.findIndex(({ id }) => id === action.payload.id);

      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    removeInstrument: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchInstruments.fulfilled,
      (state, action: PayloadAction<InstrumentDomain[]>) => {
        state.data = action.payload;
      }
    );
  },
});

export const { setInstrument, setUpdateInstrument, removeInstrument } =
  instrumentsSlice.actions;
export default instrumentsSlice.reducer;
