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
}

export interface TableContext {
  data: TableData;
  setData: Dispatch<SetStateAction<TableData>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  maxRows: number;
  setMaxRows: Dispatch<SetStateAction<number>>;
}

const initialTableContext: TableContext = {
  data: {
    headers: [],
    rows: [],
  },
  setData: () => {},
  searchValue: "",
  setSearchValue: () => {},
  maxRows: 2,
  setMaxRows: () => {},
};

export const TableDataContext =
  createContext<TableContext>(initialTableContext);

export const TableContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState(initialTableContext.data);
  const [maxRows, setMaxRows] = useState(initialTableContext.maxRows);
  const [searchValue, setSearchValue] = useState(
    initialTableContext.searchValue
  );

  return (
    <TableDataContext.Provider
      value={{
        data,
        setData,
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
