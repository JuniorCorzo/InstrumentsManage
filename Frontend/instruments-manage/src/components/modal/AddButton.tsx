import Button from "../Button";
import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";

const AddButton = () => {
  const { showModal, setShowModal, modalConfig } = useModal();
  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button
        text={`Añadir ${modalConfig?.title.split(" ")[3]}`}
        type="button"
        handleClick={handleClick}
      />
      <Modal showModal={showModal} onClose={handleClick} />
    </>
  );
};
export default AddButton;
