import useUpdateTable from "../useUpdateTable";
import { TableStrategy } from "../../components/table/table-strategy.interface";
import { useInstruments } from "@/hooks/useInstruments";
import { INSTRUMENTS_MODAL_FORM } from "@/const/instruments.const";
import { useBrands } from "@/hooks/useBrands";
import { useUpdateModal } from "../useUpdateModal";

const useInstrumentsStrategy = (): TableStrategy => {
  const { instrumentingState, getFormatTable } = useInstruments();
  const { brandsState } = useBrands();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    instrumentingState.isLoading
  );

  const { setModalForm } = useUpdateModal(
    INSTRUMENTS_MODAL_FORM(brandsState.brands),
    getFormatTable.tableMetadata?.urlParam
  );
  return {
    setTableContext,
    setModalForm,
  };
};

export default useInstrumentsStrategy;
