import useUpdateTable from "../useUpdateTable";
import { TableStrategy } from "../../components/table/table-strategy.interface";
import { useInstruments } from "@/hooks/useInstruments";

const useInstrumentsStrategy = (): TableStrategy => {
  const { instrumentingState, getFormatTable } = useInstruments();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    instrumentingState.isLoading
  );

  return { setTableContext };
};

export default useInstrumentsStrategy;
