import { useBrands } from "@/hooks/useBrands";
import { TableStrategy } from "../../components/table/table-strategy.interface";
import useUpdateTable from "../useUpdateTable";
import { useUpdateModal } from "../useUpdateModal";
import { BRANDS_MODAL_FORM } from "@/const/brands.const";

const useBrandStrategy = (): TableStrategy => {
  const { brandsState, getFormatTable } = useBrands();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    brandsState.isLoading
  );

  const { setModalForm } = useUpdateModal(
    BRANDS_MODAL_FORM(),
    getFormatTable.tableMetadata?.urlParam
  );
  return {
    setTableContext,
    setModalForm,
  };
};

export default useBrandStrategy;
