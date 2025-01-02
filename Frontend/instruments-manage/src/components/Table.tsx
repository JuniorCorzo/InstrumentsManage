import { TableData, TableDataContext } from "@/context/TableContext";
import CardCaption from "@/pages/home/components/table/CardCaption";
import { useContext } from "react";

const Table = () => {
  const { data, searchValue } = useContext(TableDataContext);
  const { headers, rows } = data;

  const filterAndRenderRows = () => {
    return renderTableRows({
      headers,
      rows: rows.filter((row) =>
        headers.some(({ key }) =>
          row[key]
            .split(" ")
            .some((word) => word.toLowerCase().startsWith(searchValue))
        )
      ),
    });
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
      <tbody>{filterAndRenderRows()}</tbody>
      <tfoot>{}</tfoot>
    </table>
  );
};

export default Table;
