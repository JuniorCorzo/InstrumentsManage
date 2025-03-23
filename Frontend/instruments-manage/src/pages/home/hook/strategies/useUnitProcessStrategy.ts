import { useUnitProcess } from "@/hooks/useUnitProcess";
import useUpdateTable from "../useUpdateTable";
import { useEffect } from "react";

export const useUnitProcessStrategy = () => {
  const { unitProcessState, getFormatTable } = useUnitProcess();

  const { setTableContext } = useUpdateTable(
    getFormatTable,
    unitProcessState.isLoading
  );
  useEffect(() => {
    setTableContext();
  }, [unitProcessState.unitProcess.length > 0]);

  return { setTableContext };
};
