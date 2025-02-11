import { useContext, useEffect } from "react";
import { useParamRoute } from "./useParamRoute";
import { TableDataContext } from "@/context/TableContext";

export const useFilteredRows = (): Record<string, string>[] => {
  useParamRoute();
  const { data, searchValue, maxRows, page, setRowLength } =
    useContext(TableDataContext);
  const { headers, rows } = data;

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

  return rowsFiltered.rows.slice(startIndex, startIndex + maxRows);
};
