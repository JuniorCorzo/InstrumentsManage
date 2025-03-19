import { useParamRoute } from "@/pages/home/hook/useParamRoute";
import { useTableConfig } from "@/pages/home/hook/useTableConfig";
import { flexRender } from "@tanstack/react-table";
import Pagination from "./Pagination";
import { useContext } from "react";
import { TableDataContext } from "@/context/TableContext";

const RenderRows = () => {
  useParamRoute();
  const { tableData } = useContext(TableDataContext);

  const { tableConfig } = useTableConfig();

  return (
    <>
      <div
        className="border-b border-slate-50/50 overflow-auto [&::-webkit-scrollbar]:h-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800"
      >
        <table className="w-full table-auto">
          <thead>
            {tableConfig.getHeaderGroups().map((headerGroup) => (
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
            {tableConfig.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  className="cells"
                  colSpan={tableConfig.getAllColumns().length}
                >
                  {tableData.messageEmpty}
                </td>
              </tr>
            ) : (
              tableConfig.getRowModel().rows.map((rows) => (
                <tr key={rows.id}>
                  {rows.getVisibleCells().map((cell) => (
                    <td className="cells" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination tableConfig={tableConfig} />
    </>
  );
};

export default RenderRows;
