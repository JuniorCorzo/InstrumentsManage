import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";
import {
  getAllUnitProcesses,
  createUnitProcess,
  updateUnitProcess,
  deleteUnitProcess,
} from "@/services/unit-process.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";
import { useToast } from "@/hooks/useToast";

export const useUnitProcessState = () => {
  const { displayToast } = useToast();
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

      displayToast({
        type: "success",
        message: "El proceso se añadió correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo añadir el proceso, vuelve a intentarlo mas tarde.",
        type: "error",
      });
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

      displayToast({
        type: "success",
        message: "El proceso se actualizó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo actualizar el proceso, vuelve a intentarlo mas tarde.",
        type: "error",
      });
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

      displayToast({
        type: "success",
        message: "El proceso se eliminó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo eliminar el proceso, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  return {
    unitProcessQuery,
    createUnitProcessMutation,
    updateUnitProcessMutation,
    deleteUnitProcessMutation,
  };
};
