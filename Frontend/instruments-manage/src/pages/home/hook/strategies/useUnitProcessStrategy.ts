import { useUnitProcess } from "@/hooks/useUnitProcess";
import useUpdateTable from "../useUpdateTable";
import { useUpdateModal } from "../useUpdateModal";
import { UNIT_PROCESS_MODAL_FORM } from "@/const/unit-process.const";
import { useCamps } from "@/hooks/useCamps";

export const useUnitProcessStrategy = () => {
  const { unitProcessState, getFormatTable } = useUnitProcess();

  const { setTableContext } = useUpdateTable(
    getFormatTable,
    unitProcessState.isLoading
  );

  const { campState } = useCamps();
  const { setModalForm } = useUpdateModal(
    UNIT_PROCESS_MODAL_FORM(campState.camps),
    getFormatTable.tableMetadata?.urlParam
  );
  return { setTableContext, setModalForm };
};
