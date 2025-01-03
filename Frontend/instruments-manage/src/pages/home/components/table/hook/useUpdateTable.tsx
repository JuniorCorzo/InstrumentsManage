import { TableData, TableDataContext } from "@/context/TableContext";
import { InstrumentDomain } from "@/interfaces/instrument-domain.interface";
import { useContext, useEffect } from "react";

const useUpdateTable = <T,>(data: T[], getFormatData: () => TableData) => {
  const { setData } = useContext(TableDataContext);

  useEffect(() => {
    const formattedData = getFormatData();
    setData(formattedData);
  }, [data]);
};

export default useUpdateTable;
