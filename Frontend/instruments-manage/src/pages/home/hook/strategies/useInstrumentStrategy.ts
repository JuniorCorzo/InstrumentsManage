import useUpdateTable from "../useUpdateTable";
import { TableStrategy } from "../../components/table/table-strategy.interface";
import { useInstruments } from "@/hooks/useInstruments";
import { useEffect } from "react";

const useInstrumentsStrategy = (): TableStrategy => {
  const { instrumentingState, getFormatTable } = useInstruments();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    instrumentingState.loading
  );

  useEffect(() => {
    setTableContext();
  }, [instrumentingState.instruments]);

  return { setTableContext };
};

export default useInstrumentsStrategy;
