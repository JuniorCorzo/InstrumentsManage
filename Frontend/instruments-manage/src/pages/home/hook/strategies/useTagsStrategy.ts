import { useTags } from "@/hooks/useTags";
import useUpdateTable from "../useUpdateTable";
import { useEffect } from "react";

export const useTagsStrategy = () => {
  const { tagsState, getFormatTable } = useTags();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    tagsState.isLoading
  );

  useEffect(() => {
    setTableContext();
  }, [tagsState.tags.length > 0]);

  return { setTableContext };
};
