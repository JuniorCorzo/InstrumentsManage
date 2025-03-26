import { useState } from "react";
import Modal from "./Modal";
import { INSTRUMENTS_MODAL_CONFIG } from "@/const/instruments.const";
import { useBrandState } from "@/states/queries/brands.query";

const Button = () => {
  const [showModal, setShowModal] = useState(false);
  const { brandQuery } = useBrandState();
  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button
        className="px-1.5 py-0.5 rounded-md bg-secondary text-background-color/80 cursor-pointer"
        type="button"
        onClick={handleClick}
      >
        <span className="">Añadir Instrumento</span>
      </button>
      <Modal
        showModal={showModal}
        onClose={handleClick}
        modalConfig={INSTRUMENTS_MODAL_CONFIG(brandQuery().brands)}
      />
    </>
  );
};
export default Button;
