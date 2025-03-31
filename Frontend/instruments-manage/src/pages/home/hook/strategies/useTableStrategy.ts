import { TableStrategy } from "../../components/table/table-strategy.interface";

const useTableStrategy = () => {
  let strategy: TableStrategy;
  const setStrategy = (setStrategy: TableStrategy) => {
    strategy = setStrategy;
  };

  const executeStrategy = () => {
    if (strategy) {
      strategy?.setTableContext();
      strategy?.setModalForm();
    }
  };

  return {
    setStrategy,
    executeStrategy,
  };
};

export default useTableStrategy;
