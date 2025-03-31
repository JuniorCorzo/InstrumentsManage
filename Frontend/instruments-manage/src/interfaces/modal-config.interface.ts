import { SingleValue } from "react-select";

export interface ModalConfig {
  title: string;
  fields: {
    type: "select" | "text" | "checkbox";
    field: Field;
  }[];
}

export type onChangeSelect = (
  newValue: SingleValue<{ value: string | undefined; label: string }>
) => void;

export interface Field {
  label: string;
  name: string;
  placeholder?: string;
  options?: { value: string | undefined; label: string }[];
  isMulti?: boolean;
  disable?: boolean;
  onChange?: onChangeSelect;
}
