import { InstrumentDomain } from "../../interfaces/instrument-domain.interface";
import {
  getAllInstruments,
  createInstruments,
  updateInstruments,
  deleteInstruments,
} from "../../services/instruments.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";

export const useInstrumentState = () => {
  const instrumentQuery = () => {
    const {
      data: instruments = [],
      isLoading,
      isError,
      refetch,
    } = useQuery<InstrumentDomain[]>({
      queryKey: ["instruments"],
      queryFn: getAllInstruments,
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
    },
  });

  return {
    instrumentQuery,
    createInstrumentMutation,
    updateInstrumentMutation,
    deleteInstrumentMutation,
  };
};
