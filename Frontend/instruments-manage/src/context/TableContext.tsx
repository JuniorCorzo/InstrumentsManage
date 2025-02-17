import { TableMetadata } from "@/const/table-metadata.const";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface TableData {
  headers: { key: string; value: string }[];
  rows: Record<string, string>[];
  messageEmpty?: string;
  tableMetadata?: TableMetadata;
}

export interface TableContext {
  data: TableData;
  setData: Dispatch<SetStateAction<TableData>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  maxRows: number;
  setMaxRows: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsLength: number;
  setRowLength: Dispatch<SetStateAction<number>>;
}

const initialTableContext: TableContext = {
  data: {
    tableMetadata: {
      titleTable: "",
      urlParam: "",
    },
    headers: [],
    rows: [],
    messageEmpty: "",
  },
  setData: () => {},
  loading: false,
  setLoading: () => {},
  searchValue: "",
  setSearchValue: () => {},
  maxRows: 5,
  setMaxRows: () => {},
  page: 1,
  setPage: () => {},
  rowsLength: 0,
  setRowLength: () => {},
};

export const TableDataContext =
  createContext<TableContext>(initialTableContext);

export const TableContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState(initialTableContext.data);
  const [loading, setLoading] = useState(initialTableContext.loading);
  const [maxRows, setMaxRows] = useState(initialTableContext.maxRows);
  const [searchValue, setSearchValue] = useState(
    initialTableContext.searchValue
  );
  const [page, setPage] = useState(initialTableContext.page);
  const [rowsLength, setRowLength] = useState(initialTableContext.rowsLength);

  return (
    <TableDataContext.Provider
      value={{
        data,
        setData,
        loading,
        setLoading,
        searchValue,
        setSearchValue,
        maxRows,
        setMaxRows,
        page,
        setPage,
        rowsLength,
        setRowLength,
      }}
    >
      {children}
    </TableDataContext.Provider>
  );
};
