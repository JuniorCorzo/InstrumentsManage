import { TagsDomain } from "../../interfaces/tags-domain.interface";
import {
  getAllTags,
  createTags,
  updateTags,
  deleteTags,
} from "../../services/tags.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";
import { useToast } from "@/hooks/useToast";

export const useTagsState = () => {
  const { displayToast } = useToast();
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

      displayToast({
        type: "success",
        message: "El tag se añadió correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo añadir el tag, vuelve a intentarlo mas tarde.",
        type: "error",
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

      displayToast({
        type: "success",
        message: "El tag se actualizó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo actualizar el tag, vuelve a intentarlo mas tarde.",
        type: "error",
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

      displayToast({
        type: "success",
        message: "El tag se eliminó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo eliminar el tag, vuelve a intentarlo mas tarde.",
        type: "error",
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
