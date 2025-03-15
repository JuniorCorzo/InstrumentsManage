import { TableDataContext } from "@/context/TableContext";
import { useParamRoute } from "@/pages/home/hook/useParamRoute";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useContext } from "react";
import Pagination from "./Pagination";

const RenderRows = () => {
  useParamRoute();
  const { tableData, maxRows, searchValue, setSearchValue } =
    useContext(TableDataContext);
  const { columns, data, messageEmpty } = tableData;
  const table = useReactTable({
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

  console.log(columns, data);

  return (
    <>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th className="cells" key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((rows) => (
          <tr key={rows.id}>
            {rows.getVisibleCells().map((cell) => (
              <td className="cells" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td className="cells" colSpan={columns.length}>
            <button
              className="pagination-item"
              type="button"
              onClick={table.firstPage}
              disabled={!table.getCanPreviousPage()}
            >
              <span>{"<<"}</span>
            </button>
            <button
              className="mx-2 pagination-item"
              type="button"
              onClick={table.previousPage}
            >
              <span>{"<"}</span>
            </button>
            <button
              className="pagination-item"
              type="button"
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
            >
              <span>{">"}</span>
            </button>
            <button
              className="ml-2 pagination-item"
              type="button"
              onClick={table.lastPage}
            >
              <span>{">>"}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default RenderRows;
