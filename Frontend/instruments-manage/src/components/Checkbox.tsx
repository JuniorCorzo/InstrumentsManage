interface Props {
  name: string;
  label: string;
}

const Checkbox = ({ label, name }: Props) => {
  return (
    <label className="flex gap-3 items-center text-text-primary">
      <span>{`${label}:`}</span>
      <input
        name={name}
        type="checkbox"
        className="w-5 h-5 rounded-sm ring-border-color focus:ring-2 bg-secondary checked:bg-secondary"
      />
    </label>
  );
};

export default Checkbox;
