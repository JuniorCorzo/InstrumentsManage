import { Field } from "@/interfaces/modal-config.interface";

const TextField = ({ label, placeholder, name }: Field) => {
  return (
    <label className="flex gap-3 items-center justify-between">
      <span>{`${label}:`}</span>
      <input
        className="w-3xs h-[38px] pl-2 py-0.5 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-border-color/75"
        type="text"
        name={name}
        placeholder={placeholder}
      />
    </label>
  );
};

export default TextField;
