import { TableData, TableDataContext } from "@/context/TableContext";
import { useFilteredRows } from "@/pages/home/hook/useFilteredRows";
import { useContext, useMemo } from "react";
import Pagination from "./Pagination";

const RenderRows = () => {
  const { data } = useContext(TableDataContext);
  const { headers, messageEmpty } = data;
  const rowsFiltered = useFilteredRows();
  const rows = useMemo(() => rowsFiltered, [data]);

  const renderRows = ({ headers, rows }: TableData) => {
    return (
      <>
        {rows.map((row, rowIndex) => {
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
        })}
        <tr>
          <td className="cells" colSpan={headers.length}>
            <ul className="flex mr-4 justify-end gap-2">
              <Pagination />
            </ul>
          </td>
        </tr>
      </>
    );
  };
  return (
    <>
      {rows.length !== 0 ? (
        renderRows({ headers, rows })
      ) : (
        <tr>
          <td className="cells" colSpan={headers.length}>
            {messageEmpty}
          </td>
        </tr>
      )}
    </>
  );
};

export default RenderRows;
