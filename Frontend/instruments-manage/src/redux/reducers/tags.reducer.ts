import { TagsState } from "@/interfaces/states.interface";
import { TagsDomain } from "../../interfaces/tags-domain.interface";
import { getAllTags } from "../../services/tags.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TagsState = {
    data: []
}

export const fetchTags = createAsyncThunk(
    'tags/fetch',
    async () => {
        return await getAllTags()
    }
)

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.data = action.payload
        },
        setOneTags: (state, action: PayloadAction<TagsDomain>) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTags.fulfilled, (state, action: PayloadAction<TagsDomain[]>) => {
            state.data = action.payload
        })
    }
})

export const { setTags, setOneTags } = tagsSlice.actions
export const TagsReducer = tagsSlice.reducer