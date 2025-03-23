import { TableMetadata } from "@/const/table-metadata.const";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface TableData {
  columns: { header: string; accessorKey: string }[];
  data: Record<string, string>[];
  messageEmpty?: string;
  tableMetadata?: TableMetadata;
}

export interface TableContext {
  tableData: TableData;
  setData: Dispatch<SetStateAction<TableData>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  maxRows: number;
  setMaxRows: Dispatch<SetStateAction<number>>;
}

const initialTableContext: TableContext = {
  tableData: {
    tableMetadata: {
      titleTable: "",
      urlParam: "",
    },
    columns: [],
    data: [],
    messageEmpty: "",
  },
  setData: () => {},
  loading: false,
  setLoading: () => {},
  searchValue: "",
  setSearchValue: () => {},
  maxRows: 5,
  setMaxRows: () => {},
};

export const TableDataContext =
  createContext<TableContext>(initialTableContext);

export const TableContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState(initialTableContext.tableData);
  const [loading, setLoading] = useState(initialTableContext.loading);
  const [maxRows, setMaxRows] = useState(initialTableContext.maxRows);
  const [searchValue, setSearchValue] = useState(
    initialTableContext.searchValue
  );

  return (
    <TableDataContext.Provider
      value={{
        tableData: data,
        setData,
        loading,
        setLoading,
        searchValue,
        setSearchValue,
        maxRows,
        setMaxRows,
      }}
    >
      {children}
    </TableDataContext.Provider>
  );
};
