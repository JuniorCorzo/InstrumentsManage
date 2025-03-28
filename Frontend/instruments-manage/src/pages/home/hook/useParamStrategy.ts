import { useSearchParams } from "react-router";
import useTableStrategy from "./strategies/useTableStrategy";
import useBrandStrategy from "./strategies/useBrandStrategy";
import useInstrumentsStrategy from "./strategies/useInstrumentStrategy";
import { useEffect } from "react";
import { useTagsStrategy } from "./strategies/useTagsStrategy";
import { useUnitProcessStrategy } from "./strategies/useUnitProcessStrategy";
import { useCampStrategy } from "./strategies/useCampStrategy";
import { TABLE_METADATA } from "@/const/table-metadata.const";

export const useParamStrategy = () => {
  const instrumentsStrategy = useInstrumentsStrategy();
  const brandsStrategy = useBrandStrategy();
  const tagsStrategy = useTagsStrategy();
  const unitProcessStrategy = useUnitProcessStrategy();
  const campStrategy = useCampStrategy();
  const { executeStrategy, setStrategy } = useTableStrategy();

  const [searchParams] = useSearchParams();
  const param = searchParams.get("table");
  const { instruments, brands, tags, unitProcess, camps } = TABLE_METADATA;

  useEffect(() => {
    try {
      switch (param) {
        case instruments.urlParam:
          setStrategy(instrumentsStrategy);
          break;
        case brands.urlParam:
          setStrategy(brandsStrategy);
          break;
        case tags.urlParam:
          setStrategy(tagsStrategy);
          break;
        case unitProcess.urlParam:
          setStrategy(unitProcessStrategy);
          break;
        case camps.urlParam:
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
