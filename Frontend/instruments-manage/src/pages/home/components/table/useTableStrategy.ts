import { TableStrategy } from "./table-strategy.interface";

const useTableStrategy = () => {
  let strategy: TableStrategy;
  const setStrategy = (setStrategy: TableStrategy) => {
    strategy = setStrategy;
  };

  const executeStrategy = () => {
    if (strategy) {
      strategy?.setTableContext();
    }
  };

  return {
    setStrategy,
    executeStrategy,
  };
};

export default useTableStrategy;
