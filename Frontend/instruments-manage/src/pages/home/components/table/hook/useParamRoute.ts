import { useSearchParams } from "react-router";
import useTableStrategy from "../useTableStrategy";
import useBrandStrategy from "./strategies/useBrandStrategy";
import useInstrumentsStrategy from "./strategies/useInstrumentStrategy";
import { useEffect } from "react";
import { useTagsStrategy } from "./strategies/useTagsStrategy";
import { useUnitProcessStrategy } from "./strategies/useUnitProcessStrategy";
import { useCampStrategy } from "./strategies/useCampStrategy";

export const useParamRoute = () => {
  const instrumentsStrategy = useInstrumentsStrategy();
  const brandsStrategy = useBrandStrategy();
  const tagsStrategy = useTagsStrategy();
  const unitProcessStrategy = useUnitProcessStrategy();
  const campStrategy = useCampStrategy();
  const { executeStrategy, setStrategy } = useTableStrategy();

  const [searchParams] = useSearchParams();
  const param = searchParams.get("useData");

  useEffect(() => {
    try {
      switch (param) {
        case "instruments":
          setStrategy(instrumentsStrategy);
          break;
        case "brands":
          setStrategy(brandsStrategy);
          break;
        case "tags":
          setStrategy(tagsStrategy);
          break;
        case "process-units":
          setStrategy(unitProcessStrategy);
          break;
        case "camps":
          setStrategy(campStrategy);
          break;
        default:
          setStrategy(instrumentsStrategy);
      }
    } finally {
      executeStrategy();
    }
  }, [param]);
};
