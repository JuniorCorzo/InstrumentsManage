import { TableDataContext } from "@/context/TableContext";
import { useContext } from "react";

const CardCaption = () => {
  const { setSearchValue, tableData } = useContext(TableDataContext);

  return (
    <section className="flex w-full h-14 px-4 border border-border-color/75 rounded-lg justify-between items-center">
      <h2 className="text-xl font-semibold">
        {tableData.tableMetadata?.titleTable}
      </h2>
      <input
        className="w-72 h-8 pl-2 border border-border-color/75 focus:outline-none focus:ring-2 focus:ring-border-color/75 rounded-md"
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
