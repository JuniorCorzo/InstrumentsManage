import { useParamStrategy } from "@/pages/home/hook/useParamStrategy";
import { useTableConfig } from "@/pages/home/hook/useTableConfig";
import { flexRender } from "@tanstack/react-table";
import Pagination from "./Pagination";
import { useContext } from "react";
import { TableDataContext } from "@/context/TableContext";

const RenderRows = () => {
  useParamStrategy();
  const { tableData } = useContext(TableDataContext);

  const { tableConfig } = useTableConfig();

  return (
    <>
      <div className="border-b border-border-color/75 overflow-auto scrollbar">
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
