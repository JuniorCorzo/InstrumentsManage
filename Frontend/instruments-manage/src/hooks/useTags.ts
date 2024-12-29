import { TagsDomain } from "@/interfaces/tags-domain.interface";
import { setTag, fetchTags, updateTag, removeTag } from "@/redux/reducers/tags.reducer";
import { Dispatch, RootState } from "@/redux/stores/general.store";
import { createTags, deleteTags, updateTags } from "@/services/tags.service";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

/**
 * Custom hook for managing tags in the application
 * 
 * This hook provides functionality to:
 * - Get the list of tags
 * - Add new tags
 * - Update existing tags
 * - Delete tags
 * 
 * @returns {Object} An object with the following properties:
 *   - tags: Array<TagsDomain> - List of tags
 *   - addTag: (tag: TagsDomain) => Promise<void> - Function to add a tag
 *   - updateTag: (tag: TagsDomain) => Promise<void> - Function to update a tag
 *   - deleteTag: (id: string) => Promise<void> - Function to delete a tag
 */
export const useTags = () => {
    const dispatch = useDispatch<Dispatch>();
    const tags = useSelector((state: RootState) => state.tags.data);

    /**
     * Fetches all tags from the store
     * If there are no tags, makes a request to get them
     */
    const fetchAllTags = () => {
        dispatch(fetchTags())
    }
    if (tags.length === 0) fetchAllTags();

    /**
     * Adds a new tag
     * @param tag - The tag to add
     */
    const addTag = async (tag: TagsDomain) => {
        try {
            await createTags(tag)
            dispatch(setTag(tag))   
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Updates an existing tag
     * @param tag - The tag with updated data
     */
    const update = async (tag: TagsDomain) => {
        try {
            await updateTags(tag)
            dispatch(updateTag(tag))
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Deletes a tag by its ID
     * @param id - The ID of the tag to delete
     */
    const deleteTagById = async (id: string) => {
        try {
            await deleteTags(id)
            dispatch(removeTag(id))
        } catch (error) {
            console.error(error)
        }
    }

    return {
        tags,
        addTag,
        updateTag: update,
        deleteTag: deleteTagById
    }
}