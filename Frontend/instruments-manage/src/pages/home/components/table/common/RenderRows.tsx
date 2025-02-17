import { TableData, TableDataContext } from "@/context/TableContext";
import { useFilteredRows } from "@/pages/home/hook/useFilteredRows";
import { useCallback, useContext } from "react";
import Pagination from "./Pagination";
import { useParamRoute } from "@/pages/home/hook/useParamRoute";

const RenderRows = () => {
  useParamRoute();
  const { data } = useContext(TableDataContext);
  const { headers, rows, messageEmpty } = data;
  const rowsFiltered = useFilteredRows();

  const renderRows = useCallback(
    (
      { headers }: TableData,
      rowsFiltered: () => { rows: Record<string, string>[] }
    ) => {
      const { rows } = rowsFiltered();
      return (
        <>
          {rows.length !== 0 ? (
            rows.map((row, rowIndex) => {
              return (
                <tr className="table-row" key={rowIndex}>
                  {headers.map(({ key }, cellIndex) => {
                    return (
                      <td className="cells" key={cellIndex}>
                        <span>{row[key]}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="cells" colSpan={headers.length}>
                {messageEmpty}
              </td>
            </tr>
          )}
          <tr>
            <td className="cells" colSpan={headers.length}>
              <ul className="flex mr-4 justify-end gap-2">
                <Pagination />
              </ul>
            </td>
          </tr>
        </>
      );
    },
    [data]
  );

  return (
    <>
      <thead className="table-header-group">
        <tr className="h-14 table-row">
          {headers.map(({ value }, index) => {
            return (
              <th className="cells" key={index}>
                <span>{value}</span>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{renderRows({ headers, rows }, rowsFiltered)}</tbody>
    </>
  );
};

export default RenderRows;
