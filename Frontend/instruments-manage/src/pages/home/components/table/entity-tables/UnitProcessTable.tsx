import { TableDataContext } from "@/context/TableContext";
import { useUnitProcess } from "@/hooks/useUnitProcess";
import { useContext } from "react";

const UnitProcessTable = () => {
  const { setData } = useContext(TableDataContext);
  const { getFormatTable } = useUnitProcess();

  setData(getFormatTable);
  return <table />;
};

export default UnitProcessTable;
