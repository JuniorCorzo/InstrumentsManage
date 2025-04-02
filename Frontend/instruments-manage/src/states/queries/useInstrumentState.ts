import { InstrumentDomain } from "../../interfaces/instrument-domain.interface";
import {
  getAllInstruments,
  createInstruments,
  updateInstruments,
  deleteInstruments,
} from "../../services/instruments.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";
import { useToast } from "@/hooks/useToast";

export const useInstrumentState = () => {
  const { displayToast } = useToast();
  const instrumentQuery = () => {
    const {
      data: instruments = [],
      isLoading,
      isError,
      refetch,
    } = useQuery<InstrumentDomain[]>({
      queryKey: ["instruments"],
      queryFn: getAllInstruments,
      throwOnError: () => {
        clientQuery.setQueryData(["instruments"], () => {
          return [];
        });
        return false;
      },
    });

    return { instruments, isLoading, isError, refetch };
  };

  const createInstrumentMutation = useMutation({
    mutationFn: createInstruments,
    onSuccess(newInstrument) {
      clientQuery.setQueryData(
        ["instruments"],
        (instrumentState: InstrumentDomain[]) => {
          if (instrumentState == null) return [newInstrument];
          return [...instrumentState, newInstrument];
        }
      );

      displayToast({
        type: "success",
        message: "El instrumento se añadió correctamente",
      });
    },
    onError: () => {
      displayToast({
        message:
          "No se pudo añadir el Instrumento, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  const updateInstrumentMutation = useMutation({
    mutationFn: updateInstruments,
    onSuccess(updatedInstrument) {
      clientQuery.setQueryData(
        ["instruments"],
        (instrumentState: InstrumentDomain[]) => {
          if (instrumentState == null) return;

          const index = instrumentState.findIndex(
            ({ id }) => id === updatedInstrument.id
          );

          if (index === -1) return;

          instrumentState[index] = updatedInstrument;
        }
      );

      displayToast({
        type: "success",
        message: "El Instrumento se actualizó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message:
          "No se pudo actualizar el Instrumento, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  const deleteInstrumentMutation = useMutation({
    mutationFn: deleteInstruments,
    onSuccess(_, idDelete) {
      clientQuery.setQueryData(
        ["instruments"],
        (instrumentState: InstrumentDomain[]) => {
          if (instrumentState == null) return;
          return instrumentState.filter(({ id }) => id !== idDelete);
        }
      );

      displayToast({
        type: "success",
        message: "El Instrumento se eliminó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message:
          "No se pudo eliminar el Instrumento, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  return {
    instrumentQuery,
    createInstrumentMutation,
    updateInstrumentMutation,
    deleteInstrumentMutation,
  };
};
