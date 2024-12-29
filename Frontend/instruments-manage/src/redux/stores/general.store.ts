import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers/instruments.reducer";
import { TagsReducer } from "../reducers/tags.reducer";
import { UnitProcessReducer } from "../reducers/unit-process.reducer";

import { CampReducer } from "../reducers/camp.reducer";
import { BrandsReducer } from "../reducers/brands.reducer";

export const store = configureStore({
    reducer: {
        instruments: reducer,
        brands: BrandsReducer,
        tags: TagsReducer,
        unitProcess: UnitProcessReducer,
        camp: CampReducer
    }
    
});

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch