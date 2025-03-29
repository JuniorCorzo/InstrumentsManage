import { useUnitProcess } from "@/hooks/useUnitProcess";
import useUpdateTable from "../useUpdateTable";

export const useUnitProcessStrategy = () => {
  const { unitProcessState, getFormatTable } = useUnitProcess();

  const { setTableContext } = useUpdateTable(
    getFormatTable,
    unitProcessState.isLoading
  );

  return { setTableContext };
};
