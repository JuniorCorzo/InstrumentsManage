import Table from "@/components/Table";
import { useInstruments } from "@/hooks/useInstruments";
import useUpdateTable from "../hook/useUpdateTable";
import { InstrumentDomain } from "@/interfaces/instrument-domain.interface";

const InstrumentsTable = () => {
  const { instruments, getFormatTable } = useInstruments();
  useUpdateTable<InstrumentDomain>(instruments, getFormatTable);

  return <Table />;
};

export default InstrumentsTable;
