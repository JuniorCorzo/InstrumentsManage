import { TagsState } from "@/interfaces/states.interface";
import { TagsDomain } from "../../interfaces/tags-domain.interface";
import { getAllTags } from "../../services/tags.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TagsState = {
  tags: [],
  loading: false,
};

export const fetchTags = createAsyncThunk("tags/fetch", async () => {
  return await getAllTags();
});

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTag: (state, action: PayloadAction<TagsDomain>) => {
      state.tags.push(action.payload);
    },
    updateTag: (state, action: PayloadAction<TagsDomain>) => {
      const index = state.tags.findIndex(({ id }) => id === action.payload.id);
      if (index !== -1) {
        state.tags[index] = action.payload;
      }
    },
    removeTag: (state, action: PayloadAction<string>) => {
      // TODO:: Add ID format validation
      state.tags = state.tags.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTags.fulfilled,
      (state, action: PayloadAction<TagsDomain[]>) => {
        state.tags = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchTags.pending, (state) => {
      state.loading = false;
    });
  },
});

export const { setTag, updateTag, removeTag } = tagsSlice.actions;
export const TagsReducer = tagsSlice.reducer;
