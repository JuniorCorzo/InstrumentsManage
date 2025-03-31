import { TagsDomain } from "../../interfaces/tags-domain.interface";
import {
  getAllTags,
  createTags,
  updateTags,
  deleteTags,
} from "../../services/tags.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";

export const useTagsState = () => {
  const tagQuery = () => {
    const {
      data: tags = [],
      isLoading,
      isError,
      refetch,
    } = useQuery<TagsDomain[]>({
      queryKey: ["tags"],
      queryFn: getAllTags,
      throwOnError: () => {
        clientQuery.setQueryData(["tags"], () => {
          return [];
        });
        return false;
      },
    });
    return { tags, isLoading, isError, refetch };
  };

  const createTagMutation = useMutation({
    mutationFn: createTags,
    onSuccess(newTag) {
      clientQuery.setQueryData(["tags"], (tagState: TagsDomain[]) => {
        if (tagState == null) return [newTag];
        return [...tagState, newTag];
      });
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: updateTags,
    onSuccess(updatedTag) {
      clientQuery.setQueryData(["tags"], (tagState: TagsDomain[]) => {
        if (tagState == null) return;

        const index = tagState.findIndex(({ id }) => id === updatedTag.id);

        if (index === -1) return;

        tagState[index] = updatedTag;
      });
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: deleteTags,
    onSuccess(_, idDelete) {
      clientQuery.setQueryData(["tags"], (tagState: TagsDomain[]) => {
        if (tagState == null) return;
        return tagState.filter(({ id }) => id !== idDelete);
      });
    },
  });

  return {
    tagQuery,
    createTagMutation,
    updateTagMutation,
    deleteTagMutation,
  };
};
