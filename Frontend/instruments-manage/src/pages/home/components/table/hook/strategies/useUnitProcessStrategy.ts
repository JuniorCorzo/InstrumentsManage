import { useUnitProcess } from "@/hooks/useUnitProcess";
import useUpdateTable from "../useUpdateTable";
import { UnitProcessDomain } from "@/interfaces/unit-process-domain.interface";

export const useUnitProcessStrategy = () => {
  const { getFormatTable } = useUnitProcess();
  const { setTableContext } = useUpdateTable(getFormatTable());

  return { setTableContext };
};
