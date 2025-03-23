import useUpdateTable from "../useUpdateTable";
import { TableStrategy } from "../../components/table/table-strategy.interface";
import { useInstruments } from "@/hooks/useInstruments";
import { useEffect } from "react";

const useInstrumentsStrategy = (): TableStrategy => {
  const { instrumentingState, getFormatTable } = useInstruments();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    instrumentingState.isLoading
  );

  useEffect(() => {
    setTableContext();
  }, [instrumentingState.instruments.length > 0]);

  return { setTableContext };
};

export default useInstrumentsStrategy;
