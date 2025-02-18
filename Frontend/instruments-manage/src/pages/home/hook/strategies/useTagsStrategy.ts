import { useTags } from "@/hooks/useTags";
import useUpdateTable from "../useUpdateTable";
import { useEffect } from "react";

export const useTagsStrategy = () => {
  const { tagsState, getFormatTable } = useTags();
  const { setTableContext } = useUpdateTable(getFormatTable, tagsState.loading);

  useEffect(() => {
    setTableContext();
  }, [tagsState.tags]);

  return { setTableContext };
};
