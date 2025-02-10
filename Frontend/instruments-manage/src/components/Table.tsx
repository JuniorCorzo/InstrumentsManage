import { TableData, TableDataContext } from "@/context/TableContext";
import CardCaption from "@/pages/home/components/table/common/CardCaption";
import Pagination from "@/pages/home/components/table/common/Pagination";
import { useParamRoute } from "@/pages/home/components/table/hook/useParamRoute";
import { useContext, useEffect } from "react";

const Table = () => {
  const { data, searchValue, maxRows, page, setRowLength } =
    useContext(TableDataContext);
  const { headers, rows } = data;
  useParamRoute();

  const filterAndRenderRows = () => {
    const startIndex = (page - 1) * maxRows;

    const rowsFiltered = {
      headers,
      rows: rows.filter((row) =>
        headers.some(({ key }) =>
          row[key]
            .split(" ")
            .some((word) => word.toLowerCase().startsWith(searchValue))
        )
      ),
    };

    useEffect(() => {
      setRowLength(rowsFiltered.rows.length);
    }, [rowsFiltered.rows]);

    return renderTableRows(rowsFiltered).slice(
      startIndex,
      startIndex + maxRows
    );
  };

  const renderTableRows = ({ headers, rows }: TableData) => {
    return rows.map((row, rowIndex) => {
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
    });
  };

  return (
    <table className="table-auto w-full border-separate border-spacing-0 rounded-lg shadow shadow-gray-800">
      <caption className="mb-4">
        <CardCaption />
      </caption>
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
      <tbody>
        {filterAndRenderRows()}
        <tr>
          <td className="cells" colSpan={headers.length}>
            <ul className="flex mr-4 justify-end gap-2">
              <Pagination />
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
