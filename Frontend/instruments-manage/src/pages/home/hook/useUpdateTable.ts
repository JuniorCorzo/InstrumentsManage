import { TableData, TableDataContext } from "@/context/TableContext";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router";

const useUpdateTable = (formattedData: TableData, isLoading: boolean) => {
  const { setData, setLoading } = useContext(TableDataContext);
  const [urlParam] = useSearchParams("table");
  const param = urlParam.get("table");
  const { tableMetadata } = formattedData;

  useEffect(() => {
    if (tableMetadata?.urlParam !== param) {
      return;
    }
    setData(formattedData);
  }, [formattedData]);

  return {
    setTableContext() {
      if (tableMetadata?.urlParam !== param) {
        return;
      }
      setData(formattedData);
      setLoading(isLoading);
    },
  };
};

export default useUpdateTable;
