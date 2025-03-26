export interface ModalConfig {
  title: string;
  fields: {
    type: "select" | "text";
    field: Field;
  }[];
}

export interface Field {
  label: string;
  placeholder: string;
  name: string;
  options?: { value: string | undefined; label: string }[];
  isMulti?: boolean;
}
