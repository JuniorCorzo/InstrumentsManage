import { useParamRoute } from "@/pages/home/hook/useParamRoute";
import { useTableConfig } from "@/pages/home/hook/useTableConfig";
import { flexRender } from "@tanstack/react-table";
import Pagination from "./Pagination";

const RenderRows = () => {
  useParamRoute();
  const { tableConfig } = useTableConfig();
  let fixedSize = 0;

  return (
    <>
      <div className="overflow-auto">
        <table className="table-auto shadow shadow-gray-800">
          <thead>
            {tableConfig.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const prevFixed = fixedSize;
                  fixedSize += header.getSize();
                  return (
                    <th
                      className={`cells bg-slate-950 ${
                        index < 3 ? `sticky left-[${prevFixed}px]` : ""
                      }`}
                      key={header.id}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {tableConfig.getRowModel().rows.map((rows) => {
              fixedSize = 0;

              return (
                <tr key={rows.id}>
                  {rows.getVisibleCells().map((cell, index) => {
                    const prevFixed = fixedSize;
                    fixedSize += cell.column.getSize();
                    return (
                      <td
                        className={`cells bg-zinc-950 ${
                          index < 3 ? `sticky left-[${prevFixed}px]` : ""
                        }`}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination tableConfig={tableConfig} />
    </>
  );
};

export default RenderRows;
