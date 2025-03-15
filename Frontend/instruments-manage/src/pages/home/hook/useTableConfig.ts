import { TableDataContext } from "@/context/TableContext";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext } from "react";

export const useTableConfig = () => {
  const { tableData, maxRows, searchValue, setSearchValue } =
    useContext(TableDataContext);

  const { columns, data } = tableData;
  const tableConfig = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: maxRows,
      },
    },
    state: {
      globalFilter: searchValue,
    },
    onGlobalFilterChange: setSearchValue,
  });

  return { tableConfig };
};
