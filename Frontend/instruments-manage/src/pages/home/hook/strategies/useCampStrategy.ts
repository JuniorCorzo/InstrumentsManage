import { useCamps } from "@/hooks/useCamps";
import useUpdateTable from "../useUpdateTable";
import { useEffect } from "react";

export const useCampStrategy = () => {
  const { campState, getFormatTable } = useCamps();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    campState.isLoading
  );

  useEffect(() => {
    setTableContext();
  }, [campState.isLoading]);

  return { setTableContext };
};
