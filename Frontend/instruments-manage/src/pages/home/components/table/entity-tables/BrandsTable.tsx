import { useBrands } from "@/hooks/useBrands";
import useUpdateTable from "../hook/useUpdateTable";
import { BrandDomain } from "@/interfaces/brand-domain.interface";
import Table from "@/components/Table";

const BrandsTable = () => {
  const { brands, getFormatTable } = useBrands();
  useUpdateTable<BrandDomain>(brands, getFormatTable);

  return <Table />;
};

export default BrandsTable;
