import { InstrumentDomain } from "@/interfaces/instrument-domain.interface";
import useUpdateTable from "../hook/useUpdateTable";
import { TableStrategy } from "../table-strategy.interface";
import { useInstruments } from "@/hooks/useInstruments";

const useInstrumentsStrategy = (): TableStrategy => {
  return {
    setTableContext() {
      const { instruments, getFormatTable } = useInstruments();
      useUpdateTable<InstrumentDomain>(instruments, getFormatTable);
    },
  };
};

export default useInstrumentsStrategy;
