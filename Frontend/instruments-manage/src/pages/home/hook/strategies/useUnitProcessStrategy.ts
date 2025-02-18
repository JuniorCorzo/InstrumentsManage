import { useUnitProcess } from "@/hooks/useUnitProcess";
import useUpdateTable from "../useUpdateTable";
import { useEffect } from "react";

export const useUnitProcessStrategy = () => {
  const { unitProcessState, getFormatTable } = useUnitProcess();

  const { setTableContext } = useUpdateTable(
    getFormatTable,
    unitProcessState.loading
  );

  useEffect(() => {
    setTableContext();
  }, [unitProcessState.unitProcess]);
  
  return { setTableContext };
};
