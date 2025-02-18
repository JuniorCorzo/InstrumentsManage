import { TableData, TableDataContext } from "@/context/TableContext";
import { useContext } from "react";
import { TableStrategy } from "../components/table/table-strategy.interface";
import { useSearchParams } from "react-router";

const useUpdateTable = (
  formattedData: TableData,
  isLoading: boolean
): TableStrategy => {
  const { setData, setLoading } = useContext(TableDataContext);
  const [urlParam] = useSearchParams("table");
  const param = urlParam.get("table");
  const { tableMetadata } = formattedData;

  return {
    setTableContext() {
      if (tableMetadata?.urlParam !== param) {
        console.log("hola");
        return;
      }
      setData(formattedData);
      setLoading(isLoading);
    },
  };
};

export default useUpdateTable;
