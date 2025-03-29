import { useBrands } from "@/hooks/useBrands";
import { TableStrategy } from "../../components/table/table-strategy.interface";
import useUpdateTable from "../useUpdateTable";

const useBrandStrategy = (): TableStrategy => {
  const { brandsState, getFormatTable } = useBrands();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    brandsState.isLoading
  );

  return {
    setTableContext,
  };
};

export default useBrandStrategy;
