import { ModalConfig } from "@/interfaces/modal-config.interface";
import { useModalState } from "@/states/queries/useModalState";
import { useSearchParams } from "react-router";

export const useUpdateModal = (
  modalStrategy: ModalConfig,
  urlParam: string | undefined
) => {
  const { changeModalState } = useModalState();

  const [search] = useSearchParams("table");
  const param = search.get("table");

  const setModalForm = () => {
    if (urlParam !== param) {
      return;
    }
    const { mutate } = changeModalState;
    mutate(modalStrategy);
  };

  return { setModalForm };
};
