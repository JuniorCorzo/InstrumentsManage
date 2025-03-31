import { ModalConfig } from "@/interfaces/modal-config.interface";
import { useModalState } from "@/states/queries/useModalState";
import { useEffect, useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { modalState } = useModalState();

  useEffect(() => {});
  return {
    showModal,
    modalConfig: modalState.data as unknown as ModalConfig,
    setShowModal,
  };
};
