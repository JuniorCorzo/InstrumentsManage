import Button from "../Button";
import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";

const AddButton = () => {
  const { showModal, setShowModal } = useModal();
  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button
        text="Añadir Instrumento"
        type="button"
        handleClick={handleClick}
      />
      <Modal showModal={showModal} onClose={handleClick} />
    </>
  );
};
export default AddButton;
