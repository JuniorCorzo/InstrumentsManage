import { XMarkIcon } from "@heroicons/react/24/solid";
import TextField from "./TextField";
import SelectField from "./SelectField";
import { ModalConfig } from "@/interfaces/modal-config.interface";

interface Props {
  showModal: boolean;
  onClose: () => void;
  modalConfig: ModalConfig;
}

const Modal = ({ showModal, onClose, modalConfig }: Props) => {
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
            {modalConfig.title}
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
        <form className="flex flex-col gap-3">
          {modalConfig.fields.map(({ type, field }) => {
            if (type === "text") {
              return <TextField {...field} />;
            }

            return <SelectField {...field} />;
          })}
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
