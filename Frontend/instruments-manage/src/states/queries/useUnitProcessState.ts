import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";
import {
  getAllUnitProcesses,
  createUnitProcess,
  updateUnitProcess,
  deleteUnitProcess,
} from "@/services/unit-process.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";

export const useUnitProcessState = () => {
  const unitProcessQuery = () => {
    const {
      data: unitProcess = [],
      isLoading,
      isError,
      refetch,
    } = useQuery<UnitProcessDomain[]>({
      queryKey: ["unitProcess"],
      queryFn: getAllUnitProcesses,
      throwOnError: () => {
        clientQuery.setQueryData(["unitProcess"], () => {
          return [];
        });
        return false;
      },
    });
    return { unitProcess, isLoading, isError, refetch };
  };

  const createUnitProcessMutation = useMutation({
    mutationFn: createUnitProcess,
    onSuccess(newUnitProcess) {
      clientQuery.setQueryData(
        ["unitProcess"],
        (unitProcessState: UnitProcessDomain[]) => {
          if (unitProcessState == null) return [newUnitProcess];
          return [...unitProcessState, newUnitProcess];
        }
      );
    },
  });

  const updateUnitProcessMutation = useMutation({
    mutationFn: updateUnitProcess,
    onSuccess(updatedUnitProcess) {
      clientQuery.setQueryData(
        ["unitProcess"],
        (unitProcessState: UnitProcessDomain[]) => {
          if (unitProcessState == null) return;

          const index = unitProcessState.findIndex(
            ({ id }) => id === updatedUnitProcess.id
          );

          if (index === -1) return;

          unitProcessState[index] = updatedUnitProcess;
        }
      );
    },
  });

  const deleteUnitProcessMutation = useMutation({
    mutationFn: deleteUnitProcess,
    onSuccess(_, idDelete) {
      clientQuery.setQueryData(
        ["unitProcess"],
        (unitProcessState: UnitProcessDomain[]) => {
          if (unitProcessState == null) return;
          return unitProcessState.filter(({ id }) => id !== idDelete);
        }
      );
    },
  });

  return {
    unitProcessQuery,
    createUnitProcessMutation,
    updateUnitProcessMutation,
    deleteUnitProcessMutation,
  };
};
