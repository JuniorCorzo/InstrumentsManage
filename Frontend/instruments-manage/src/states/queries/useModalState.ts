import { ModalConfig } from "@/interfaces/modal-config.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";

export const useModalState = () => {
  const modalState = useQuery({ queryKey: ["modal"], queryFn: () => null });

  const changeModalState = useMutation({
    mutationFn: async (modalStrategy: ModalConfig) => {
      return modalStrategy;
    },
    onSuccess: (data) => {
      clientQuery.setQueryData(["modal"], () => {
        return data;
      });
    },
  });

  return { modalState, changeModalState };
};
