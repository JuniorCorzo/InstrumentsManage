import { CampDomain } from "../../interfaces/camp-domain.interface";
import {
  getAllCamps,
  createCamp,
  updateCamp,
  deleteCamp,
} from "../../services/camp.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";
import { useToast } from "@/hooks/useToast";

export const useCampState = () => {
  const { displayToast } = useToast();
  const campQuery = () => {
    const {
      data: camps = [],
      isLoading,
      isError,
      refetch,
    } = useQuery<CampDomain[]>({
      queryKey: ["camps"],
      queryFn: getAllCamps,
      throwOnError: () => {
        clientQuery.setQueryData(["camps"], () => {
          return [];
        });
        return false;
      },
    });
    return { camps, isLoading, isError, refetch };
  };

  const createCampMutation = useMutation({
    mutationFn: createCamp,
    onSuccess(newCamp) {
      clientQuery.setQueryData(["camps"], (campState: CampDomain[]) => {
        if (campState == null) return [newCamp];
        return [...campState, newCamp];
      });
      displayToast({
        type: "success",
        message: "El campo se añadió correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo añadir el campo, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  const updateCampMutation = useMutation({
    mutationFn: updateCamp,
    onSuccess(updatedCamp) {
      clientQuery.setQueryData(["camps"], (campState: CampDomain[]) => {
        if (campState == null) return;

        const index = campState.findIndex(({ id }) => id === updatedCamp.id);

        if (index === -1) return;

        campState[index] = updatedCamp;
      });

      displayToast({
        type: "success",
        message: "El campo se actualizó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message:
          "No se pudo actualizar el campo, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  const deleteCampMutation = useMutation({
    mutationFn: deleteCamp,
    onSuccess(_, idDelete) {
      clientQuery.setQueryData(["camps"], (campState: CampDomain[]) => {
        if (campState == null) return;
        return campState.filter(({ id }) => id !== idDelete);
      });

      displayToast({
        type: "success",
        message: "El campo se eliminó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo eliminar el campo, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  return {
    campQuery,
    createCampMutation,
    updateCampMutation,
    deleteCampMutation,
  };
};
