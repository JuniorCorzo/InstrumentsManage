import { TableData, TableDataContext } from "@/context/TableContext";
import { useContext } from "react";
import { TableStrategy } from "../table-strategy.interface";

const useUpdateTable = (formattedData: TableData): TableStrategy => {
  const { setData } = useContext(TableDataContext);

  return {
    setTableContext() {
      setData(formattedData);
    },
  };
};

export default useUpdateTable;
