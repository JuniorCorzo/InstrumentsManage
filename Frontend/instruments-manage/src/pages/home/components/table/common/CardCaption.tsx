import { TableDataContext } from "@/context/TableContext";
import { useContext } from "react";

const CardCaption = () => {
  const { setSearchValue } = useContext(TableDataContext);

  return (
    <section className="flex w-full h-14 px-4 border rounded-lg justify-between items-center">
      <h2 className="text-xl font-semibold">Lista de Instrumentos</h2>
      <input
        className="w-72 h-8 pl-2 border rounded-md"
        placeholder="Buscar"
        onKeyUp={(evt: React.KeyboardEvent<HTMLInputElement>) => {
          const value = (evt.target as HTMLInputElement).value;
          setSearchValue(value.toLowerCase());
        }}
        type="text"
      />
    </section>
  );
};

export default CardCaption;