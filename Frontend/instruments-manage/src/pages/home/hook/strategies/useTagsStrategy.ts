import { useTags } from "@/hooks/useTags";
import useUpdateTable from "../useUpdateTable";

export const useTagsStrategy = () => {
  const { getFormatTable } = useTags();
  const { setTableContext } = useUpdateTable(getFormatTable());

  return { setTableContext };
};
