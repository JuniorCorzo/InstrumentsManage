import { useBrands } from "@/hooks/useBrands";
import { TableStrategy } from "../table-strategy.interface";
import useUpdateTable from "../hook/useUpdateTable";
import { BrandDomain } from "@/interfaces/brand-domain.interface";

const useBrandStrategy = (): TableStrategy => {
  return {
    setTableContext() {
      const { brands, getFormatTable } = useBrands();
      useUpdateTable<BrandDomain>(brands, getFormatTable);
    },
  };
};

export default useBrandStrategy;
