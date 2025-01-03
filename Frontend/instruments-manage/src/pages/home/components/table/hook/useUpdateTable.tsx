import { TableData, TableDataContext } from "@/context/TableContext";
import { useContext, useEffect } from "react";

const useUpdateTable = <T,>(data: T[], getFormatData: () => TableData) => {
  const { setData } = useContext(TableDataContext);

  useEffect(() => {
    const formattedData = getFormatData();
    setData(formattedData);
  }, [data]);
};

export default useUpdateTable;
