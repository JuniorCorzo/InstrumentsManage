import { useCamps } from "@/hooks/useCamps";
import useUpdateTable from "../useUpdateTable";

export const useCampStrategy = () => {
  const { getFormatTable } = useCamps();
  const { setTableContext } = useUpdateTable(getFormatTable());

  return { setTableContext };
};
