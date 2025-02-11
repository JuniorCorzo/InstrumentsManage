import useUpdateTable from "../useUpdateTable";
import { TableStrategy } from "../../table-strategy.interface";
import { useInstruments } from "@/hooks/useInstruments";

const useInstrumentsStrategy = (): TableStrategy => {
  const { getFormatTable } = useInstruments();
  const { setTableContext } = useUpdateTable(getFormatTable());

  return { setTableContext };
};

export default useInstrumentsStrategy;
