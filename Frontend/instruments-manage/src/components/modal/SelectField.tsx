import { Field } from "@/interfaces/modal-config.interface";
import Select from "react-select";

const SelectField = ({
  label,
  placeholder,
  name,
  options,
  isMulti = false,
  onChange,
}: Field) => {
  return (
    <label className="flex gap-3 items-center justify-between">
      <span>{`${label}:`}</span>
      <Select
        isMulti={isMulti}
        className="w-3xs rounded-md"
        onChange={onChange}
        styles={{
          control: (styles, state) => {
            return {
              ...styles,
              cursor: "pointer",
              color: "#fcfcfc",
              backgroundColor: "bg-background-color",
              borderColor: state.isFocused ? "#ffd580" : "#ffd580",
              boxShadow: state.isFocused ? "0 0 0 2px #ffd580" : "none",
              "&:hover": {
                borderColor: "#ffd580",
              },
            };
          },
          singleValue: (styles) => {
            return { ...styles, color: "#fcfcfc" };
          },
          option: (styles, state) => {
            return {
              ...styles,
              background: state.isSelected
                ? "#ed853b"
                : state.isFocused
                ? "#fa8d3e"
                : "#0d1017",
              color: state.isSelected || state.isFocused ? "#0d1017" : "fff",
            };
          },
          multiValue: (styles) => {
            return {
              ...styles,
              backgroundColor: "#ed853b",
            };
          },
          multiValueLabel: (styles) => {
            return { ...styles, color: "#0d1017" };
          },
          multiValueRemove: (styles) => {
            return {
              ...styles,
              color: "#0d1017",
              ":hover": { backgroundColor: "#ffd580" },
            };
          },
          menu: (style) => {
            return { ...style, zIndex: 9999 };
          },
          menuList: (styles) => {
            return {
              ...styles,
              border: "1px solid #ed853b",
              scrollbarWidth: "thin",
              scrollbarColor: "#fa8d3e #0d1017",
              paddingTop: 0,
              paddingBottom: 0,
            };
          },
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
        placeholder={placeholder}
        name={name}
        options={options}
        menuPortalTarget={document.getElementById("form_modal")}
        menuPosition="fixed"
      />
    </label>
  );
};

export default SelectField;
