import { UnitProcessState } from "@/interfaces/states.interface";
import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";
import { getAllUnitProcesses } from "@/services/unit-process.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UnitProcessState = {
  unitProcess: [],
  loading: false,
};

export const fetchUnitProcess = createAsyncThunk(
  "unitProcess/fetch",
  async () => {
    return await getAllUnitProcesses();
  }
);

const UnitProcessSlice = createSlice({
  name: "unitProcess",
  initialState,
  reducers: {
    setUnitProcess: (state, action: PayloadAction<UnitProcessDomain>) => {
      state.unitProcess.push(action.payload);
    },
    setUpdateUnitProcess: (state, action: PayloadAction<UnitProcessDomain>) => {
      const index = state.unitProcess.findIndex(
        ({ id }) => id === action.payload.id
      );

      if (index !== -1) {
        state.unitProcess[index] = action.payload;
      }
    },
    removeUnitProcess: (state, action: PayloadAction<string>) => {
      state.unitProcess = state.unitProcess.filter(
        ({ id }) => id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUnitProcess.fulfilled,
      (state, action: PayloadAction<UnitProcessDomain[]>) => {
        state.unitProcess = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchUnitProcess.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setUnitProcess, setUpdateUnitProcess, removeUnitProcess } =
  UnitProcessSlice.actions;
export const UnitProcessReducer = UnitProcessSlice.reducer;
