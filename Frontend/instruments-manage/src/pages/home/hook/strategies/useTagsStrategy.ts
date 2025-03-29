import { useTags } from "@/hooks/useTags";
import useUpdateTable from "../useUpdateTable";

export const useTagsStrategy = () => {
  const { tagsState, getFormatTable } = useTags();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    tagsState.isLoading
  );

  return { setTableContext };
};
