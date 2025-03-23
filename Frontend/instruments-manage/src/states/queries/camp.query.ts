import { CampDomain } from "../../interfaces/camp-domain.interface";
import {
  getAllCamps,
  createCamp,
  updateCamp,
  deleteCamp,
} from "../../services/camp.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";

export const useCampState = () => {
  const campQuery = () => {
    const {
      data: camps = [],
      isLoading,
      isError,
      refetch,
    } = useQuery<CampDomain[]>({
      queryKey: ["camps"],
      queryFn: getAllCamps,
    });
    return { camps, isLoading, isError, refetch };
  };

  const createCampMutation = () => {
    const { mutate, isPending } = useMutation({
      mutationFn: createCamp,
      onSuccess(newCamp) {
        clientQuery.setQueryData(["camps"], (campState: CampDomain[]) => {
          if (campState == null) return [newCamp];
          return [...campState, newCamp];
        });
      },
    });

    return { mutate, isPending };
  };

  const updateCampMutation = () => {
    const { mutate, isPending } = useMutation({
      mutationFn: updateCamp,
      onSuccess(updatedCamp) {
        clientQuery.setQueryData(["camps"], (campState: CampDomain[]) => {
          if (campState == null) return;

          const index = campState.findIndex(({ id }) => id === updatedCamp.id);

          if (index === -1) return;

          campState[index] = updatedCamp;
        });
      },
    });

    return { mutate, isPending };
  };

  const deleteCampMutation = () => {
    const { mutate, isPending } = useMutation({
      mutationFn: deleteCamp,
      onSuccess(_, idDelete) {
        clientQuery.setQueryData(["camps"], (campState: CampDomain[]) => {
          if (campState == null) return;
          return campState.filter(({ id }) => id !== idDelete);
        });
      },
    });

    return { mutate, isPending };
  };

  return {
    campQuery,
    createCampMutation,
    updateCampMutation,
    deleteCampMutation,
  };
};
