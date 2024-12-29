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
        setTag: (state, action: PayloadAction<TagsDomain>) => {
            state.data.push(action.payload)
        },
        updateTag: (state, action: PayloadAction<TagsDomain>) => {
            const index = state.data.findIndex(({id}) => id === action.payload.id)
            if (index !== -1) {
                state.data[index] = action.payload
            }
        },
        deleteTag: (state, action: PayloadAction<string>) => {
            // TODO:: Add ID format validation
            state.data = state.data.filter(({id}) => id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTags.fulfilled, (state, action: PayloadAction<TagsDomain[]>) => {
            state.data = action.payload
        })
    }
})

export const { setTag, updateTag, deleteTag } = tagsSlice.actions
export const TagsReducer = tagsSlice.reducer