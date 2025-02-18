import { useContext, useEffect } from "react";
import { useParamRoute } from "./useParamRoute";
import { TableDataContext } from "@/context/TableContext";

export const useFilteredRows = () => {
  useParamRoute();
  const { data, searchValue, maxRows, page, setRowLength } =
    useContext(TableDataContext);
  const { headers, rows } = data;

  const startIndex = (page - 1) * maxRows;

  const rowsFiltered = (): { rows: Record<string, string>[] } => {
    return {
      rows: rows
        .filter((row) =>
          headers.some(({ key }) =>
            row[key]
              .split(" ")
              .some((word) => word.toLowerCase().startsWith(searchValue))
          )
        )
        .splice(startIndex, startIndex + maxRows),
    };
  };

  useEffect(() => {
    setRowLength(rows.length);
  }, [data]);

  return rowsFiltered;
};
