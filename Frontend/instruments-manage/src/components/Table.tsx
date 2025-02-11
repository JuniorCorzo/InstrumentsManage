import { TableDataContext } from "@/context/TableContext";
import CardCaption from "@/pages/home/components/table/common/CardCaption";
import RenderRows from "@/pages/home/components/table/common/RenderRows";
import { useCallback, useContext } from "react";

const Table = () => {
  const { data } = useContext(TableDataContext);
  const { headers } = data;
  const renderRows = useCallback(RenderRows, [data]);


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
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default Table;
