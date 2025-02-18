import { useBrands } from "@/hooks/useBrands";
import { TableStrategy } from "../../components/table/table-strategy.interface";
import useUpdateTable from "../useUpdateTable";
import { useEffect } from "react";

const useBrandStrategy = (): TableStrategy => {
  const { brandsState, getFormatTable } = useBrands();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    brandsState.loading
  );

  useEffect(() => {
    setTableContext();
  }, [brandsState.brands]);

  return {
    setTableContext,
  };
};

export default useBrandStrategy;
