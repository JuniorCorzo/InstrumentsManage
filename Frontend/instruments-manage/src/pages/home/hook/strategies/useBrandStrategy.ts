import { useBrands } from "@/hooks/useBrands";
import { TableStrategy } from "../../components/table/table-strategy.interface";
import useUpdateTable from "../useUpdateTable";
import { BrandDomain } from "@/interfaces/brand-domain.interface";

const useBrandStrategy = (): TableStrategy => {
  const { getFormatTable } = useBrands();
  const { setTableContext } = useUpdateTable(getFormatTable());

  return {
    setTableContext,
  };
};

export default useBrandStrategy;
