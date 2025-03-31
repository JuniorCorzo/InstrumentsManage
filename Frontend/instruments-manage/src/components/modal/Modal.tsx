import { XMarkIcon } from "@heroicons/react/24/solid";
import TextField from "./TextField";
import SelectField from "./SelectField";
import { useModal } from "@/hooks/useModal";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { useFormModal } from "@/hooks/useFormModal";

interface Props {
  showModal: boolean;
  onClose: () => void;
}

const Modal = ({ showModal, onClose }: Props) => {
  const { modalConfig } = useModal();
  const { sendData } = useFormModal();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new window.FormData(event.currentTarget);

    if (sendData) {
      sendData(formData);
    }
  };

  return (
    <dialog
      id="form_modal"
      className={`${
        showModal ? "flex flex-col m-[0_auto] z-50" : ""
      } max-h-10/12 absolute top-20 bg-background-color px-5 py-3 rounded-lg gap-2 shadow-[2px_2px_10px_0px_#2A3747] overflow-auto scrollbar`}
      open={showModal}
      onClose={() => onClose}
    >
      <div className="flex border-b justify-between">
        <div>
          <span className="text-text-primary font-bold text-lg">
            {modalConfig?.title}
          </span>
        </div>
        <div>
          <button
            className="w-7 aspect-square cursor-pointer"
            type="button"
            onClick={onClose}
          >
            <XMarkIcon className="text-text-primary"></XMarkIcon>
          </button>
        </div>
      </div>
      <div className="">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {modalConfig?.fields.map(({ type, field }, index) => {
            if (type === "text") {
              return <TextField key={index} {...field} />;
            }
            if (type === "checkbox") {
              return <Checkbox key={index} {...field} />;
            }

            return <SelectField key={index} {...field} />;
          })}
          <Button text="Enviar" type="submit" />
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
